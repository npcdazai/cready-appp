import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorLogger from './errorLogger';

export interface CacheItem<T = any> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

export interface CacheConfig {
  ttl: number; // Default TTL in milliseconds
  maxSize?: number; // Maximum cache size in MB
}

class CacheManager {
  private static instance: CacheManager;
  private config: CacheConfig = {
    ttl: 5 * 60 * 1000, // 5 minutes default
    maxSize: 50, // 50MB default
  };

  private constructor() {}

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  setConfig(config: Partial<CacheConfig>) {
    this.config = { ...this.config, ...config };
  }

  private getCacheKey(key: string): string {
    return `cache_${key}`;
  }

  private getMetaKey(key: string): string {
    return `cache_meta_${key}`;
  }

  async set<T>(key: string, data: T, ttl?: number): Promise<void> {
    try {
      const cacheKey = this.getCacheKey(key);
      const metaKey = this.getMetaKey(key);
      const timestamp = Date.now();
      const itemTTL = ttl || this.config.ttl;

      const cacheItem: CacheItem<T> = {
        data,
        timestamp,
        ttl: itemTTL,
      };

      await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheItem));
      await AsyncStorage.setItem(metaKey, JSON.stringify({ timestamp, ttl: itemTTL }));

      // Clean up expired items
      await this.cleanup();
    } catch (error) {
      ErrorLogger.logError(error as Error, { context: 'CacheManager.set', key });
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const cacheKey = this.getCacheKey(key);
      const cachedData = await AsyncStorage.getItem(cacheKey);

      if (!cachedData) {
        return null;
      }

      const cacheItem: CacheItem<T> = JSON.parse(cachedData);
      const now = Date.now();

      // Check if item is expired
      if (now - cacheItem.timestamp > cacheItem.ttl) {
        await this.remove(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      ErrorLogger.logError(error as Error, { context: 'CacheManager.get', key });
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      const cacheKey = this.getCacheKey(key);
      const metaKey = this.getMetaKey(key);
      
      await AsyncStorage.removeItem(cacheKey);
      await AsyncStorage.removeItem(metaKey);
    } catch (error) {
      ErrorLogger.logError(error as Error, { context: 'CacheManager.remove', key });
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith('cache_'));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      ErrorLogger.logError(error as Error, { context: 'CacheManager.clear' });
    }
  }

  async cleanup(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const metaKeys = keys.filter(key => key.startsWith('cache_meta_'));
      
      const now = Date.now();
      const expiredKeys: string[] = [];

      for (const metaKey of metaKeys) {
        try {
          const metaData = await AsyncStorage.getItem(metaKey);
          if (metaData) {
            const meta = JSON.parse(metaData);
            if (now - meta.timestamp > meta.ttl) {
              const key = metaKey.replace('cache_meta_', '');
              expiredKeys.push(key);
            }
          }
        } catch (error) {
          // Skip invalid meta entries
        }
      }

      // Remove expired items
      for (const key of expiredKeys) {
        await this.remove(key);
      }
    } catch (error) {
      ErrorLogger.logError(error as Error, { context: 'CacheManager.cleanup' });
    }
  }

  async getCacheSize(): Promise<number> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith('cache_'));
      
      let totalSize = 0;
      for (const key of cacheKeys) {
        const data = await AsyncStorage.getItem(key);
        if (data) {
          totalSize += new Blob([data]).size;
        }
      }
      
      return totalSize / (1024 * 1024); // Return size in MB
    } catch (error) {
      ErrorLogger.logError(error as Error, { context: 'CacheManager.getCacheSize' });
      return 0;
    }
  }

  async isExpired(key: string): Promise<boolean> {
    try {
      const metaKey = this.getMetaKey(key);
      const metaData = await AsyncStorage.getItem(metaKey);
      
      if (!metaData) {
        return true;
      }

      const meta = JSON.parse(metaData);
      const now = Date.now();
      
      return now - meta.timestamp > meta.ttl;
    } catch (error) {
      ErrorLogger.logError(error as Error, { context: 'CacheManager.isExpired', key });
      return true;
    }
  }
}

export default CacheManager; 