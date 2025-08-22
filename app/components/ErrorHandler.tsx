import React, { ReactNode, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNetworkState } from '../utils/networkUtils';

interface ErrorHandlerProps {
  children: ReactNode;
  error?: Error | null;
  onRetry?: () => void;
  showErrorUI?: boolean;
}

interface ErrorState {
  hasError: boolean;
  error: Error | null;
  isNetworkError: boolean;
  isApiError: boolean;
  isCacheError: boolean;
}

export default function ErrorHandler({
  children,
  error,
  onRetry,
  showErrorUI = true,
}: ErrorHandlerProps) {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    isNetworkError: false,
    isApiError: false,
    isCacheError: false,
  });

  const { isConnected, isInternetReachable } = useNetworkState();

  useEffect(() => {
    if (error) {
      const isNetworkError = error.message.includes('Network') || 
                            error.message.includes('fetch') ||
                            error.message.includes('timeout');
      const isApiError = error.message.includes('API') || 
                        error.message.includes('status');
      const isCacheError = error.message.includes('cache') || 
                          error.message.includes('storage');

      setErrorState({
        hasError: true,
        error,
        isNetworkError,
        isApiError,
        isCacheError,
      });
    } else {
      setErrorState({
        hasError: false,
        error: null,
        isNetworkError: false,
        isApiError: false,
        isCacheError: false,
      });
    }
  }, [error]);

  const handleRetry = () => {
    setErrorState(prev => ({ ...prev, hasError: false }));
    if (onRetry) {
      onRetry();
    }
  };

  const getErrorMessage = () => {
    if (!errorState.error) return 'An unexpected error occurred';

    if (errorState.isNetworkError) {
      if (!isConnected) {
        return 'No internet connection. Please check your network settings.';
      }
      if (!isInternetReachable) {
        return 'Limited connectivity. Please try again when connection improves.';
      }
      return 'Network error. Please check your connection and try again.';
    }

    if (errorState.isApiError) {
      return 'Service temporarily unavailable. Please try again later.';
    }

    if (errorState.isCacheError) {
      return 'Data loading error. Please refresh to try again.';
    }

    return errorState.error.message || 'Something went wrong. Please try again.';
  };

  const getErrorIcon = () => {
    if (errorState.isNetworkError) return '📶';
    if (errorState.isApiError) return '🔧';
    if (errorState.isCacheError) return '💾';
    return '⚠️';
  };

  if (!errorState.hasError || !showErrorUI) {
    return <>{children}</>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.errorCard}>
        <Text style={styles.errorIcon}>{getErrorIcon()}</Text>
        <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
        <Text style={styles.errorMessage}>{getErrorMessage()}</Text>
        
        <View style={styles.buttonContainer}>
          {onRetry && (
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.reportButton} 
            onPress={() => {
              Alert.alert(
                'Report Error',
                'Would you like to report this error to our support team?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Report', onPress: () => {
                    // Here you would typically send the error to your error reporting service
                    console.log('Error reported:', errorState.error);
                  }}
                ]
              );
            }}
          >
            <Text style={styles.reportButtonText}>Report Issue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  errorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    maxWidth: 320,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'DMSans-Bold',
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
    fontFamily: 'DMSans-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  retryButton: {
    backgroundColor: '#6232FF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 100,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'DMSans-Bold',
  },
  reportButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6232FF',
  },
  reportButtonText: {
    color: '#6232FF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'DMSans-Bold',
  },
}); 