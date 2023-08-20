const defaultHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*',
  };
  
  const createResponse = (statusCode, data = {}) => {
    return {
      headers: defaultHeaders,
      statusCode: statusCode,
      body: JSON.stringify(data),
    };
  };
  
  const API_RESPONSES = {
    _200: (data = {}) => createResponse(200, data),
    _201: (data = {}) => createResponse(201, data),
    _400: (data = {}) => createResponse(400, data),
    _404: (data = {}) => createResponse(404, data),
    _500: (data = {}) => createResponse(500, data),
  };
  
  module.exports = API_RESPONSES;
  