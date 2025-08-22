// API Configuration
export const API_CONFIG = {
  // Change this to your actual API URL
  BASE_URL: 'https://cready.in',
  
  // API Endpoints
  ENDPOINTS: {
    // User endpoints
    SEND_OTP: '/api/users/send-otp',
    VERIFY_OTP: '/api/users/verify-otp',
    USER_PROFILE: '/api/users/profile',
    
    // Partner endpoints
    PARTNERS: '/api/partners',
    
    // FAQ endpoints
    FAQS: '/api/faqs',
    FAQ_CATEGORIES: '/api/faq-categories',
    
    // Footer endpoint
    FOOTER: '/api/footer',
  },
  
  // Request timeout (in milliseconds)
  TIMEOUT: 10000,
  
  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000,
  },
};

// Environment-specific configurations
export const getApiConfig = () => {
  // You can add environment-specific logic here
  // For example, different URLs for development, staging, and production
  
  if (__DEV__) {
    // Development environment
    return {
      ...API_CONFIG,
      BASE_URL: API_CONFIG?.BASE_URL
    };
  } else {
    // Production environment
    return {
      ...API_CONFIG,
      BASE_URL: API_CONFIG?.BASE_URL
    };
  }
}; 