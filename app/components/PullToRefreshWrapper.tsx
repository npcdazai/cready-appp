import React, { ReactNode, useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { useNetworkState } from '../utils/networkUtils';

interface PullToRefreshWrapperProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  refreshing?: boolean;
  style?: any;
  contentContainerStyle?: any;
  showsVerticalScrollIndicator?: boolean;
  bounces?: boolean;
}

export default function PullToRefreshWrapper({
  children,
  onRefresh,
  refreshing: externalRefreshing,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  bounces = true,
}: PullToRefreshWrapperProps) {
  const [internalRefreshing, setInternalRefreshing] = useState(false);
  const { isConnected, isInternetReachable } = useNetworkState();
  
  const refreshing = externalRefreshing !== undefined ? externalRefreshing : internalRefreshing;

  const handleRefresh = useCallback(async () => {
    if (!isConnected || !isInternetReachable) {
      // Don't refresh if offline
      return;
    }

    setInternalRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Pull to refresh failed:', error);
    } finally {
      setInternalRefreshing(false);
    }
  }, [onRefresh, isConnected, isInternetReachable]);

  return (
    <ScrollView
      style={[styles.container, style]}
      contentContainerStyle={contentContainerStyle}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#6232FF']} // Primary app color
          tintColor="#6232FF"
          title="Pull to refresh"
          titleColor="#6232FF"
        />
      }
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      bounces={bounces}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 