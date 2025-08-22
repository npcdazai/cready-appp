import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useNetworkState } from '../utils/networkUtils';

interface NetworkStatusIndicatorProps {
  showOfflineMessage?: boolean;
}

export default function NetworkStatusIndicator({ showOfflineMessage = true }: NetworkStatusIndicatorProps) {
  const { isConnected, isInternetReachable } = useNetworkState();
  const [slideAnim] = useState(new Animated.Value(-50));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isOnline = isConnected && isInternetReachable;
    
    if (!isOnline && showOfflineMessage) {
      // Slide down to show offline message
      setIsVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (isOnline && isVisible) {
      // Slide up to hide message
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
      });
    }
  }, [isConnected, isInternetReachable, showOfflineMessage, slideAnim, isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📶</Text>
        </View>
        <Text style={styles.message}>
          {!isConnected
            ? 'No internet connection'
            : !isInternetReachable
            ? 'Limited connectivity'
            : 'Offline mode'}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FF6B6B',
    zIndex: 1000,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
  },
  message: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'DMSans-Bold',
  },
  subMessage: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    opacity: 0.8,
  },
}); 