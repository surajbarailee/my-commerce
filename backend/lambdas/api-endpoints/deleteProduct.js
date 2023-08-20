const API_RESPONSES = require("../utilities/responses");
const Dynamo = require("../utilities/connection");

exports.handler = async (event) => {
  if (!event?.pathParameters?.id) {
    return Responses._400({
      message: "Id missing in the parameter",
    });
  }

  let id = event.pathParameters.id;

  try {
    await Dynamo.deleteProduct(id);
    return API_RESPONSES._200({
      message: `Product deleted with id : ${id}`,
    });
  } catch (error) {
    return API_RESPONSES._500({
      message: `Unable to delete the product with id : ${id} : ${error}`,
    });
  }
};
