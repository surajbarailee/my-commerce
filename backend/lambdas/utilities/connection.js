const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

const TABLENAME = "products";

const Dynamo = {
  async getAllProducts(page = 1, limit = 1000) {
    try {
      if (page && page > 1) {
        const lastEvaluatedKey = data.LastEvaluatedKey.primary_key;
        params.ExclusiveStartKey = { primary_key: lastEvaluatedKey };
      }

      const params = {
        TableName: TABLENAME,
        Limit: limit,
      };

      const data = await documentClient.scan(params).promise();

      if (!data || !data.Items) {
        throw new Error(`No data found in the table`);
      }

      return {
        data: data.Items,
        lastEvaluatedKey: data.LastEvaluatedKey,
      };
    } catch (err) {
      console.error(
        `Error in fetching data from ${TABLENAME} in getAllProducts(). Error : `,
        err
      );
      throw err;
    }
  },

  async addProduct(data) {
    const params = {
      TableName: TABLENAME,
      Item: data,
    };

    const response = await documentClient.put(params).promise();
    if (!response) {
      throw new Error(
        `Error doing insertion in ${TABLENAME} with data ${data}. Error was ${error}`
      );
    }
    return data;
  },
  async deleteProduct(id) {
    try {
      const params = {
        TableName: TABLENAME,
        Key: {
          id: id,
        },
      };
      await documentClient.delete(params).promise();
    } catch (err) {
      console.error(`Error deleting data from ${TABLENAME} for ID ${id}`, err);
      throw err;
    }
  },

  async updateThumbnail(id, s3ImageUrl) {
    try {
      await documentClient
        .update({
          TableName: TABLENAME,
          Key: { id: id },
          UpdateExpression: "SET thumbnail = :thumbnail",
          ExpressionAttributeValues: {
            ":thumbnail": s3ImageUrl,
          },
        })
        .promise();
    } catch (error) {
      throw new Error(`Unable to update image Url ${s3ImageUrl} for id ${id}. ${error}`);
    }
  },
};

module.exports = Dynamo;
