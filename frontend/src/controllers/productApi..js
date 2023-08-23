
import axios from 'axios';


export const axiosRequest = axios.create({
  baseURL: 'https://jjubyofqml.execute-api.us-east-1.amazonaws.com/dev/',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': 'eAlK6KX7C59rXbjrhHxvr1enlfA9diHb6bj1o68c'
  }
});

export const getProducts = async (page = 1, limit = 10) => {
    const response = await axiosRequest.get(`products`);
    return response.data;
  };

export const createProduct = async (product) => {
  const response = await axiosRequest.post('products', product);
  return response.data;
};

export const deleteProduct = async (productId) => {
  return axiosRequest.delete(`products/${productId}`);
};


