import crashlytics from '@react-native-firebase/crashlytics';

class CrashlyticsService {
  /**
   * Initialize crashlytics
   */
  static initialize() {
    // Enable crashlytics collection while doing development
    crashlytics().setCrashlyticsCollectionEnabled(true);
    console.log('Crashlytics initialized');
  }

  /**
   * Log a non-fatal error
   */
  static logError(error: Error, context?: Record<string, string>) {
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        crashlytics().setAttribute(key, value);
      });
    }
    
    crashlytics().recordError(error);
  }

  /**
   * Log a custom message
   */
  static log(message: string) {
    crashlytics().log(message);
  }

  /**
   * Set user identifier
   */
  static setUserId(userId: string) {
    crashlytics().setUserId(userId);
  }

  /**
   * Set custom attributes
   */
  static setAttribute(key: string, value: string) {
    crashlytics().setAttribute(key, value);
  }

  /**
   * Force a test crash
   */
  static testCrash() {
    crashlytics().log('Testing crash reporting');
    crashlytics().setAttribute('test_crash', 'true');
    
    // Force a crash
    throw new Error('Test crash from Crashlytics service');
  }

  /**
   * Log breadcrumb for user actions
   */
  static logBreadcrumb(message: string, category?: string) {
    crashlytics().log(`[${category || 'USER_ACTION'}] ${message}`);
  }
}

export default CrashlyticsService; 