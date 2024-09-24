import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import logger from './loggerManager'; 

const handleConsoleError = (err: AxiosError): void => {
  if (err.response) {
    switch (err.response.status) {
      case 400: // Bad request
        logger.error('400! Bad request', { statusCode: 400, data: err.response.data });
        break;
      case 401: // Unauthorized
        logger.error('401! Unauthorized', { statusCode: 401, data: err.response.data });
        break;
      case 404: // Not found
        logger.error('404! Not found', { statusCode: 404, data: err.response.data });
        break;
      case 408: // Timeout
        logger.warn('408! Timeout', { statusCode: 408, data: err.response.data });
        break;
      case 500: // Internal Server Error
        logger.warn('500! Internal Server Error', { statusCode: 500, data: err.response.data });
        break;
      default:
        logger.error(`Error ${err.response.status}`, { statusCode: err.response.status, data: err.response.data });
    }
  } else if (err.request) {
    // The client never received a response, or the request never left
    logger.error('Error! No response received', { request: err.request });
  } else {
    // An error occurred while setting up the request
    logger.error('Error! Something went wrong. Please try again', { message: err.message });
  }
};

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',  // Example API
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    logger.info(`[Axios Request] ${config.method?.toUpperCase()} - ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    handleConsoleError(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    logger.info(`[Axios Response] Status: ${response.status} - URL: ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    handleConsoleError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
