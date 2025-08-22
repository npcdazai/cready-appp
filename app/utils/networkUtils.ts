import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

export interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean;
  type: string;
}

class NetworkUtils {
  private static instance: NetworkUtils;
  private listeners: Set<(state: NetworkState) => void> = new Set();

  private constructor() {
    this.initializeNetworkListener();
  }

  static getInstance(): NetworkUtils {
    if (!NetworkUtils.instance) {
      NetworkUtils.instance = new NetworkUtils();
    }
    return NetworkUtils.instance;
  }

  private async initializeNetworkListener() {
    // Get initial state
    const state = await NetInfo.fetch();
    this.notifyListeners(this.mapNetInfoToNetworkState(state));

    // Listen for network changes
    NetInfo.addEventListener(state => {
      this.notifyListeners(this.mapNetInfoToNetworkState(state));
    });
  }

  private mapNetInfoToNetworkState(netInfo: any): NetworkState {
    return {
      isConnected: netInfo.isConnected ?? false,
      isInternetReachable: netInfo.isInternetReachable ?? false,
      type: netInfo.type ?? 'unknown',
    };
  }

  private notifyListeners(state: NetworkState) {
    this.listeners.forEach(listener => listener(state));
  }

  addListener(listener: (state: NetworkState) => void) {
    this.listeners.add(listener);
  }

  removeListener(listener: (state: NetworkState) => void) {
    this.listeners.delete(listener);
  }

  async getCurrentNetworkState(): Promise<NetworkState> {
    const state = await NetInfo.fetch();
    return this.mapNetInfoToNetworkState(state);
  }

  async isConnected(): Promise<boolean> {
    const state = await NetInfo.fetch();
    return state.isConnected ?? false;
  }

  async isInternetReachable(): Promise<boolean> {
    const state = await NetInfo.fetch();
    return state.isInternetReachable ?? false;
  }
}

// React Hook for network state
export const useNetworkState = () => {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: true,
    isInternetReachable: true,
    type: 'unknown',
  });

  useEffect(() => {
    const networkUtils = NetworkUtils.getInstance();
    
    // Get initial state
    networkUtils.getCurrentNetworkState().then(setNetworkState);
    
    // Add listener
    networkUtils.addListener(setNetworkState);
    
    return () => {
      networkUtils.removeListener(setNetworkState);
    };
  }, []);

  return networkState;
};

export default NetworkUtils; 