const AWS = require("aws-sdk");
const Dynamo = require("./connection");
const axios = require("axios");
const jimp = require("jimp/dist/index");
const fileType = require('file-type');

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
  const image = Buffer.from(imageResponse.data, "binary");
  // const image = await jimp.read(imageUrl)
  // image.resize = image.resize(HEIGHT,WIDTH)

  const type = await fileType.fromBuffer(image);


  const supportedFormats = {
    bmp: jimp.MIME_BMP,
    jpg: jimp.MIME_JPEG,
    png: jimp.MIME_PNG,
  };

  if (!type || !Object.keys(supportedFormats).includes(type.ext)) {
    throw new Error('Image format not supported');
  }


  const resizedImage = image;

  const s3Key = `thumbnails/${id}.${type.ext}`;
  await s3
    .putObject({
      Bucket: thumbnailBucket,
      Key: s3Key,
      Body: resizedImage,
      ContentType: type.mime,
    })
    .promise();

  const s3ImageUrl = `https://${thumbnailBucket}.s3.amazonaws.com/${s3Key}`;

  await Dynamo.updateThumbnail(id, s3ImageUrl);

  console.log(`Thumbnail uploaded Successfully in ${id}`);
};
