import axios from 'axios';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
  
});



// Response interceptor for handling common errors
axiosInstance.interceptors.response.use(
    response => {
        
        return response;
    },
    error => {
        // Create a more detailed error object
        const enhancedError = {
            message: 'An error occurred with the API request',
            originalError: error.message,
            status: error.response?.status || 'Network Error',
            data: error.response?.data || {},
            config: error.config
        };

        // Log different types of errors
        if (error.response) {
            // Server responded with non-2xx status
            console.error(
                `[API Error] ${error.response.status} ${error.config.method.toUpperCase()} ${error.config.url}`,
                error.response.data
            );
            enhancedError.message = `Server error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`;
        } else if (error.request) {
            // Request made but no response received
            console.error(
                `[API No Response] ${error.config.method.toUpperCase()} ${error.config.url}`,
                error.request
            );
            enhancedError.message = 'No response received from server. Please check your connection.';
        } else {
            // Error in setting up the request
            console.error('[API Setup Error]', error.message);
            enhancedError.message = `Request setup error: ${error.message}`;
        }

        // You can handle specific status codes here
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    enhancedError.message = 'Unauthorized: Please log in again';
                    // You could trigger a logout or redirect to login here
                    break;
                case 403:
                    enhancedError.message = 'Forbidden: You do not have permission to access this resource';
                    break;
                case 404:
                    enhancedError.message = 'Resource not found';
                    break;
                case 500:
                    enhancedError.message = 'Server error: Please try again later';
                    break;
                default:
                    // Use the default message set above
                    break;
            }
        }

        // Add the enhanced error info to the original error
        error.enhancedError = enhancedError;

        return Promise.reject(error);
    }
);

// Helper function to use in components for cleaner error handling
export const apiRequest = async (requestFn) => {
    try {
        const response = await requestFn();
        return { 
            success: true, 
            data: response.data, 
            status: response.status 
        };
    } catch (error) {
        return {
            success: false,
            error: error.enhancedError || {
                message: error.message,
                status: error.response?.status || 'Unknown'
            },
            originalError: error
        };
    }
};

export default axiosInstance;
