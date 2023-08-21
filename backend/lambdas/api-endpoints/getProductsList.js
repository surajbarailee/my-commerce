const AWS = require("aws-sdk");
const API_RESPONSES = require("../utilities/responses");
const Dynamo = require("../utilities/connection");
const AmazonS3URI = require("amazon-s3-uri");
const s3 = new AWS.S3();

exports.handler = async (event, context) => {
  try {
    const response = await Dynamo.getAllProducts();

    if (response && response.data) {
      for (const singleItem of response.data) {
        if (singleItem && singleItem.thumbnail) {
          const { region, bucket, key } = AmazonS3URI(singleItem.thumbnail);
          singleItem.thumbnail = await s3.getSignedUrlPromise("getObject", {
            Bucket: bucket,
            Key: key,
            Expires: 60,
          });
        }
      }
      return API_RESPONSES._200(response);
    } else {
      return API_RESPONSES._404({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return API_RESPONSES._500({ message: "Internal server error" });
  }
};
