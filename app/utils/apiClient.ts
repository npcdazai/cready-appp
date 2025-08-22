import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiConfig } from '../config/api';
import CacheManager from './cacheManager';
import ErrorLogger from './errorLogger';
import NetworkUtils from './networkUtils';

// API Configuration
const API_BASE_URL = getApiConfig().BASE_URL;

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  fromCache?: boolean;
}

export interface User {
  id: string;
  phone?: string;
  mobileNumber?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  gender?: string;
  pincode?: string;
  panNumber?: string;
  dateOfBirth?: string;
  jobType?: string;
  monthlySalary?: number;
  loanAmount?: number;
  profileImage?: string;
  isProfileComplete?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  description?: string;
  interestRate?: number;
  processingFee?: number;
  minAmount?: number;
  maxAmount?: number;
  minTenure?: number;
  maxTenure?: number;
  type?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FAQCategory {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
  category?: FAQCategory;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Footer {
  id: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  whatsapp?: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Loan {
  id: string;
  title: string;
  amount: number;
  interestRate: number;
  tenure: number;
  bankName: string;
  description: string;
  eligibility: string[];
  documents: string[];
  processingFee: number;
  prepaymentCharges: number;
  partnerId?: string;
  partner?: Partner;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Client Class
class ApiClient {
  private baseURL: string;
  private token: string | null = null;
  private cacheManager: CacheManager;
  private networkUtils: NetworkUtils;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.cacheManager = CacheManager.getInstance();
    this.networkUtils = NetworkUtils.getInstance();
  }

  // Initialize token from storage
  async initialize() {
    try {
      this.token = await AsyncStorage.getItem('authToken');
    } catch (error) {
      ErrorLogger.logError(error as Error, { context: 'ApiClient.initialize' });
    }
  }

  // Set auth token
  async setToken(token: string) {
    this.token = token;
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      ErrorLogger.logError(error as Error, { context: 'ApiClient.setToken' });
    }
  }

  // Clear auth token
  async clearToken() {
    this.token = null;
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      ErrorLogger.logError(error as Error, { context: 'ApiClient.clearToken' });
    }
  }

  // Generate cache key from endpoint and options
  private generateCacheKey(endpoint: string, options: RequestInit = {}): string {
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : '';
    return `${method}_${endpoint}_${body}`;
  }

  // Generic request method with offline support and caching
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    cacheConfig?: { ttl?: number; useCache?: boolean }
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const cacheKey = this.generateCacheKey(endpoint, options);
    const useCache = cacheConfig?.useCache !== false;
    const isGetRequest = !options.method || options.method === 'GET';
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Add authorization header if token exists
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      // Check network connectivity
      const isConnected = await this.networkUtils.isConnected();
      const isInternetReachable = await this.networkUtils.isInternetReachable();

      // If offline and it's a GET request, try to get from cache
      if ((!isConnected || !isInternetReachable) && isGetRequest && useCache) {
        const cachedData = await this.cacheManager.get<T>(cacheKey);
        if (cachedData) {
          ErrorLogger.logUserJourney('API_CACHE_HIT', endpoint, 'Offline cache used');
          return {
            success: true,
            message: 'Data retrieved from cache (offline)',
            data: cachedData,
            fromCache: true,
          };
        } else {
          return {
            success: false,
            message: 'No internet connection and no cached data available',
            error: 'NETWORK_ERROR',
          };
        }
      }



      // Make the actual API request
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        // Log error to Crashlytics
        ErrorLogger.logError(new Error(`API Error: ${response.status} - ${data.message || 'Unknown error'}`), {
          context: 'ApiClient.request',
          endpoint,
          status: response.status.toString(),
        });

        return {
          success: false,
          message: data.message || 'Request failed',
          error: data.error || 'Unknown error',
        };
      }

      const result: ApiResponse<T> = {
        success: true,
        message: data.message || 'Success',
        data: data.data || data,
      };

      // Cache successful GET requests
      if (isGetRequest && useCache && isConnected) {
        const ttl = cacheConfig?.ttl || 5 * 60 * 1000; // 5 minutes default
        await this.cacheManager.set(cacheKey, result.data, ttl);
        ErrorLogger.logUserJourney('API_CACHE_SET', endpoint, 'Data cached');
      }

      return result;
    } catch (error) {
      // If network error and it's a GET request, try cache
      if (isGetRequest && useCache) {
        const cachedData = await this.cacheManager.get<T>(cacheKey);
        if (cachedData) {
          ErrorLogger.logUserJourney('API_CACHE_FALLBACK', endpoint, 'Network error, using cache');
          return {
            success: true,
            message: 'Data retrieved from cache (network error)',
            data: cachedData,
            fromCache: true,
          };
        }
      }

      // Log error to Crashlytics
      ErrorLogger.logError(error as Error, {
        context: 'ApiClient.request',
        endpoint,
        errorType: 'NETWORK_ERROR',
      });

      return {
        success: false,
        message: 'Network error',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // User APIs
  async sendOTP(phone: string): Promise<ApiResponse<{ message: string }>> {
    return this.request('/api/users/send-otp', {
      method: 'POST',
      body: JSON.stringify({ mobileNumber: phone }),
    }, { useCache: false }); // Don't cache OTP requests
  }

  async verifyOTP(phone: string, otp: string): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await this.request<{ token: string; user: User }>('/api/users/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ mobileNumber: phone, otp }),
    }, { useCache: false }); // Don't cache auth requests

    if (response.success && response.data?.token) {
      await this.setToken(response.data.token);
    }

    return response;
  }

  async getUserProfile(): Promise<ApiResponse<User>> {
    return this.request('/api/users/profile', {}, { ttl: 10 * 60 * 1000 }); // 10 minutes cache
  }

  async updateUserProfile(updates: Partial<User>): Promise<ApiResponse<User>> {
    const response = await this.request<User>('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    }, { useCache: false });
    // Clear user profile cache after update
    if (response.success) {
      await this.cacheManager.remove(this.generateCacheKey('/api/users/profile'));
    }

    return response;
  }

  async updateProfileImage(imageUri: string): Promise<ApiResponse<User>> {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'profile-image.jpg',
    } as any);

    const response = await this.request<User>('/api/users/profile/image', {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }, { useCache: false });

    // Clear user profile cache after image update
    if (response.success) {
      await this.cacheManager.remove(this.generateCacheKey('/api/users/profile'));
    }

    return response;
  }

  // Partner APIs
  async getAllPartners(): Promise<ApiResponse<Partner[]>> {
    return this.request('/api/partners?active=true&page=1&limit=100', {}, { ttl: 30 * 60 * 1000 }); // 30 minutes cache
  }

  async getPartnerById(id: string): Promise<ApiResponse<Partner>> {
    return this.request(`/api/partners/${id}`, {}, { ttl: 30 * 60 * 1000 });
  }

  // FAQ APIs
  async getAllFAQs(): Promise<ApiResponse<FAQ[]>> {
    return this.request('/api/faqs', {}, { ttl: 60 * 60 * 1000 }); // 1 hour cache
  }

  async getFAQById(id: string): Promise<ApiResponse<FAQ>> {
    return this.request(`/api/faqs/${id}`, {}, { ttl: 60 * 60 * 1000 });
  }

  async getFAQCategories(): Promise<ApiResponse<FAQCategory[]>> {
    return this.request('/api/faq-categories', {}, { ttl: 60 * 60 * 1000 });
  }

  async getFAQCategoryById(id: string): Promise<ApiResponse<FAQCategory>> {
    return this.request(`/api/faq-categories/${id}`, {}, { ttl: 60 * 60 * 1000 });
  }

  // Footer API
  async getFooter(): Promise<ApiResponse<Footer>> {
    return this.request('/api/footer', {}, { ttl: 24 * 60 * 60 * 1000 }); // 24 hours cache
  }

  // Loan APIs
  async getLoans(): Promise<ApiResponse<Loan[]>> {
    return this.request('/api/submit', {
      method: 'POST',
      body: JSON.stringify({}),
    }, { ttl: 15 * 60 * 1000 }); // 15 minutes cache
  }

  async getLoanById(id: string): Promise<ApiResponse<Loan>> {
    return this.request(`/api/loans/${id}`, {}, { ttl: 15 * 60 * 1000 });
  }

  // Logout
  async logout(): Promise<void> {
    await this.clearToken();
    // Clear all cached data on logout
    await this.cacheManager.clear();
  }

  // Generic API request method (public)
  async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    cacheConfig?: { ttl?: number; useCache?: boolean }
  ): Promise<ApiResponse<T>> {
    return this.request(endpoint, options, cacheConfig);
  }

  // Clear cache for specific endpoint
  async clearCache(endpoint: string, options: RequestInit = {}): Promise<void> {
    const cacheKey = this.generateCacheKey(endpoint, options);
    await this.cacheManager.remove(cacheKey);
  }

  // Get cache info
  async getCacheInfo(): Promise<{ size: number; keys: string[] }> {
    const size = await this.cacheManager.getCacheSize();
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter(key => key.startsWith('cache_'));
    
    return {
      size,
      keys: cacheKeys,
    };
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Initialize the client
apiClient.initialize();

export default apiClient; 