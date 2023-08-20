const AWS = require("aws-sdk");
const Dynamo = require("./connection");
const sharp = require("sharp");
const axios = require("axios");

const s3 = new AWS.S3();
const HEIGHT = 200;
const WIDTH = 200;

exports.handler = async (event, context) => {
  // Batch size is 1 for now
  const record = event.Records[0];

  // Keeping filter inside lambda so we can reuse this for other requests
  if (record && record.eventName !== "INSERT") {
    console.log("returning as the event is not insert");
    return;
  }

  const newProduct = record.dynamodb.NewImage;

  // Better approach is appreciated
  const id = newProduct["id"]["S"];
  const imageUrl = newProduct["imageUrl"]["S"];

  const thumbnailBucket = process.env.THUMBNAIL_BUCKET;

  const imageResponse = await axios({
    url: imageUrl,
    responseType: "arraybuffer",
  });
  const buffer = Buffer.from(imageResponse.data, "binary");
  const resizedImage = await sharp(buffer).resize(WIDTH, HEIGHT).toBuffer();

  const metadata = await sharp(buffer.Body).metadata();
  const mimeType = `image/${metadata.format}`;

  const s3Key = `thumbnails/${id}.${metadata.format}`;
  await s3
    .putObject({
      Bucket: thumbnailBucket,
      Key: s3Key,
      Body: resizedImage,
      ContentType: mimeType,
    })
    .promise();

  const s3ImageUrl = `https://${thumbnailBucket}.s3.amazonaws.com/${s3Key}`;

  await Dynamo.updateThumbnail(id, s3ImageUrl);

  console.log(`Thumbnail uploaded Successfully in ${id}`);
};
