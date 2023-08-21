const API_RESPONSES = require('../utilities/responses');
const Dynamo = require('../utilities/connection');
import { v4 as uuidv4 } from 'uuid';


function validateProduct(product) {
    const errors = [];
  
    if (!product) {
      errors.push('Data is missing');
    } else {
      if (typeof product.name !== 'string') {
        errors.push('Name should be a string');
      }
      if (typeof product.description !== 'string') {
        errors.push('Description should be a string');
      }
      if (typeof product.price !== 'number') {
        errors.push('Price should be a number');
      }
      if (typeof product.imageUrl !== 'string') {
        errors.push('ImageUrl should be a string');
      }
    }
  
    return errors;
  }

exports.handler = async (event,context) => {
  try {
    console.log(event)
    const product = JSON.parse(event.body);
    console.log(product)
    const validationErrors = validateProduct(product);

    if (validationErrors.length > 0) {
      return API_RESPONSES._400({
        message: 'Bad Request Exception. Invalid product data',
        errors: validationErrors,
      });
    }

    product.id = uuidv4();
    const addedProduct = await Dynamo.addProduct(product)

    if (addedProduct) {
      return API_RESPONSES._201({addedProduct});
    } else {
      return API_RESPONSES._400({ message: 'Could not write to the database.' });
    }
  } catch (error) {
    console.error('Error while writing data to dynamo using addProduct function ',event, error);
    return API_RESPONSES._500({ message: 'Internal server error' });
  }
};
