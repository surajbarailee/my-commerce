const API_RESPONSES = require('../utilities/responses');
const Dynamo = require('../utilities/connection');

exports.handler = async (event,context) => {
  try {
    const response = await Dynamo.getAllProducts();

    if (response && response.data) {
      return API_RESPONSES._200(response);
    } else {
      return API_RESPONSES._404({ message: 'No products found' });
    }
  } catch (error) {
    console.error('Error:', error);
    return API_RESPONSES._500({ message: 'Internal server error' });
  }
};
