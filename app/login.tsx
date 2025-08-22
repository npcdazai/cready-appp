import messaging from '@react-native-firebase/messaging';
import * as Device from 'expo-device';
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from 'expo-notifications';
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useAuth } from "./context/AuthContext";
import apiClient from "./utils/apiClient";

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    
    await messaging().registerDeviceForRemoteMessages();
    token = await messaging().getToken();
    console.log("FCM Token:", token);

  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default function Login() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { setPhone: setAuthPhone } = useAuth();
  const [fcmToken, setFcmToken] = useState<string | undefined>('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setFcmToken(token));
  }, []);

  const handleLogin = async () => {
    if (!phone || phone.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.sendOTP(phone);
      if (response.success) {
        // Store phone number in auth context for OTP verification
        setAuthPhone(phone);
        router.push("/verifyotp");
      } else {
        Alert.alert("Error", response.message || "Failed to send OTP");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
    colors={["rgba(31, 225, 233, 0.8)", "rgba(239, 252, 255, 0.5)", "rgba(239, 252, 255, 0.5)"]}
    start={{ x: 0.4, y: 1 }}
    end={{ x: 0.5, y: 0.3 }}
      style={styles.container}
    >
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Cready</Text>
        <Text style={styles.subtitle}>Let&apos;s get you Started.</Text>
        {/* Phone Input */}
        <Text style={styles.label}>Phone number</Text>
        <View style={styles.phoneRow}>
          <View style={styles.countryBox}>
            <Image
              source={require("../assets/images/india-flag.png")}
              style={styles.flag}
            />
            <Text style={styles.countryCode}>+ 91</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="1234567890"
            placeholderTextColor="#bdbdbd"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={10}
          />
        </View>
        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <Text style={styles.loginBtnText}>Sending...</Text>
          ) : (
            <Text style={styles.loginBtnText}>Login</Text>
          )}
        </TouchableOpacity>
        {/* <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.divider} />
        </View>
        <TouchableOpacity style={styles.googleBtn}>
          <Image
            source={require("../assets/images/google-logo.png")}
            style={styles.googleLogo}
          />
          <Text style={styles.googleBtnText}>Login with google</Text>
        </TouchableOpacity> */}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  progressBarContainer: {
    width: "90%",
    height: 5,
    backgroundColor: "#bdbdbd40",
    borderRadius: 4,
    marginTop: 20,
    alignSelf: "center",
    overflow: "hidden",
  },
  progressBar: {
    width: "15%",
    height: "100%",
    backgroundColor: "rgba(98, 50, 255, 1)",
    borderRadius: 4,
  },
  content: {
    width: "90%",
    backgroundColor: "transparent",
    marginTop: 40,
    alignSelf: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: "DMSans-SemiBold",
    color: "#222",
    marginBottom: 4,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 15,
    color: "#888",
    marginBottom: 24,
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
  },
  label: {
    fontSize: 13,
    color: "#222",
    marginBottom: 6,
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  countryBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginRight: 10,
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: 6,
    resizeMode: "contain",
  },
  countryCode: {
    fontSize: 16,
    color: "#222",
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
  },
  input: {
    flex: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#222",
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  loginBtn: {
    backgroundColor: "rgba(98, 50, 255, 1)",
    borderRadius: 5,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#7c4dff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "DMSans-SemiBold",
    fontWeight: "600",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    alignSelf: "center",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#bdbdbd",
    opacity: 0.3,
  },
  orText: {
    color: "#888",
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    fontWeight: "600",
  },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 16,
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: "contain",
  },
  googleBtnText: {
    color: "#222",
    fontSize: 16,
    fontFamily: "DMSans-SemiBold",
    fontWeight: "600",
  },
});
