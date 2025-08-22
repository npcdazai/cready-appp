import CrashlyticsService from '../services/crashlytics';

/**
 * Utility class for consistent error logging throughout the app
 */
class ErrorLogger {
  /**
   * Log an error with context
   */
  static logError(error: Error, context?: Record<string, string>) {
    console.error('Error logged:', error);
    CrashlyticsService.logError(error, context);
  }

  /**
   * Log an error from a try-catch block
   */
  static logCaughtError(error: unknown, context?: Record<string, string>) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    this.logError(errorObj, context);
  }

  /**
   * Log API errors
   */
  static logApiError(error: any, endpoint?: string, requestData?: any) {
    const context: Record<string, string> = {
      error_type: 'api_error',
      ...(endpoint && { endpoint }),
      ...(requestData && { request_data: JSON.stringify(requestData) }),
    };

    this.logError(error, context);
  }

  /**
   * Log navigation errors
   */
  static logNavigationError(error: Error, screen?: string) {
    const context: Record<string, string> = {
      error_type: 'navigation_error',
      ...(screen && { screen }),
    };

    this.logError(error, context);
  }

  /**
   * Log user action errors
   */
  static logUserActionError(error: Error, action?: string, screen?: string) {
    const context: Record<string, string> = {
      error_type: 'user_action_error',
      ...(action && { action }),
      ...(screen && { screen }),
    };

    this.logError(error, context);
  }

  /**
   * Log component errors
   */
  static logComponentError(error: Error, componentName?: string, props?: any) {
    const context: Record<string, string> = {
      error_type: 'component_error',
      ...(componentName && { component: componentName }),
      ...(props && { props: JSON.stringify(props) }),
    };

    this.logError(error, context);
  }

  /**
   * Log a warning (non-fatal)
   */
  static logWarning(message: string, context?: Record<string, string>) {
    console.warn('Warning:', message);
    CrashlyticsService.log(`[WARNING] ${message}`);
    
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        CrashlyticsService.setAttribute(key, value);
      });
    }
  }

  /**
   * Log user journey breadcrumb
   */
  static logUserJourney(action: string, screen?: string, details?: string) {
    const breadcrumb = `[USER_JOURNEY] ${action}${screen ? ` on ${screen}` : ''}${details ? ` - ${details}` : ''}`;
    CrashlyticsService.logBreadcrumb(breadcrumb, 'USER_JOURNEY');
  }

  /**
   * Set user context for error reporting
   */
  static setUserContext(userId: string, userType?: string, additionalInfo?: Record<string, string>) {
    CrashlyticsService.setUserId(userId);
    
    if (userType) {
      CrashlyticsService.setAttribute('user_type', userType);
    }
    
    if (additionalInfo) {
      Object.entries(additionalInfo).forEach(([key, value]) => {
        CrashlyticsService.setAttribute(key, value);
      });
    }
  }
}

export default ErrorLogger; 