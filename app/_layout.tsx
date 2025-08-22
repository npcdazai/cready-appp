import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { StatusBar, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundary from "./components/ErrorBoundary";
import NetworkStatusIndicator from "./components/NetworkStatusIndicator";
import { AuthProvider } from "./context/AuthContext";
import { FooterProvider } from "./context/FooterContex";
import { LoanListProvider } from "./context/LoanListContext";
import CrashlyticsService from "./services/crashlytics";
import { persistor, store } from "./store/store";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "DMSans-Regular": require("../assets/fonts/DMSans-Regular.ttf"),
    "DMSans-Medium": require("../assets/fonts/DMSans-Medium.ttf"),
    "DMSans-Bold": require("../assets/fonts/DMSans-Bold.ttf"),
    "DMSans-SemiBold": require("../assets/fonts/DMSans-SemiBold.ttf"),
    "DMSans-Light": require("../assets/fonts/DMSans-Light.ttf"),
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Initialize Crashlytics
  useEffect(() => {
    try {
      CrashlyticsService.initialize();
    } catch (error) {
      console.error('Failed to initialize Crashlytics:', error);
    }
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <LoanListProvider>
              <FooterProvider>
                <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                  <StatusBar backgroundColor="rgba(255, 255, 255, 1)" barStyle="dark-content" />
                  <NetworkStatusIndicator />
                  <Stack screenOptions={{ headerShown: false }} />
                </View>
              </FooterProvider>
            </LoanListProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
