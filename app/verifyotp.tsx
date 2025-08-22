import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import Svg, { Circle } from "react-native-svg";
import { useDispatch } from "react-redux";
import { useAuth } from "./context/AuthContext";
import { setCredentials } from "./store/slices/authSlice";
import apiClient from "./utils/apiClient";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(154);
  const [loading, setLoading] = useState(false);
  const totalTime = 154; // Total time in seconds
  const { phone, setUser, setIsAuthenticated } = useAuth();
  const dispatch = useDispatch();

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Calculate progress for the circle
  const progress = (timer / totalTime) * 100;
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Format timer as mm:ss
  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const handleVerifyOTP = async () => {
    const otpString = otp.replace(/\s/g, ''); // Remove any spaces
    if (otpString.length !== 4) {
      Alert.alert("Error", "Please enter a valid 4-digit OTP");
      return;
    }

    if (!phone) {
      Alert.alert("Error", "Phone number not found. Please login again.");
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.verifyOTP(phone, otpString);
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        dispatch(
          setCredentials({
            token: response.data.token,
            user: response.data.user,
          })
        );
          router.dismissAll();

        if (!response?.data?.user?.loanAmount) {
          router.dismissTo("/loanSeeking");
        } else if (!response?.data?.user?.firstName) {
          router.dismissTo("/personalDetails");
        } else if (!response?.data?.user?.dateOfBirth) {
          router.dismissTo("/kyc");
        } else {
          router.dismissTo("/dashboard");
        }
      } else {
        Alert.alert("Error", response.message || "Invalid OTP");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!phone) {
      Alert.alert("Error", "Phone number not found. Please login again.");
      router.push("/login");
      return;
    }

    try {
      const response = await apiClient.sendOTP(phone);
      if (response.success) {
        Alert.alert("Success", "OTP resent successfully");
        setTimer(154); // Reset timer
      } else {
        Alert.alert("Error", response.message || "Failed to resend OTP");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    }
  };

  return (
    <LinearGradient
      colors={[
        "rgba(31, 225, 233, 0.8)",
        "rgba(239, 252, 255, 0.5)",
        "rgba(239, 252, 255, 0.5)",
      ]}
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
        <Text style={styles.title}>Please verify your number</Text>
        <Text style={styles.subtitle}>Enter OTP</Text>
        {/* OTP Input */}
        <View style={styles.otpContainer}>
          <OTPTextInput
            defaultValue={otp}
            inputCount={4}
            tintColor="white"
            offTintColor="white"
            containerStyle={styles.otpInputsContainer}
            textInputStyle={styles.otpInput}
            handleTextChange={(text) => {
              setOtp(text);
            }}
          />
        </View>
        {/* Verify Button */}
        <TouchableOpacity
          style={styles.verifyBtn}
          onPress={handleVerifyOTP}
          disabled={loading}
        >
          {loading ? (
            <Text style={styles.verifyBtnText}>Verifying...</Text>
          ) : (
            <Text style={styles.verifyBtnText}>Verify OTP</Text>
          )}
        </TouchableOpacity>
        {/* Resend OTP */}
        <TouchableOpacity onPress={handleResendOTP} disabled={loading}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
      {/* Timer Circle */}
      <View style={styles.timerCircle}>
        <Svg width={60} height={60}>
          {/* Background Circle */}
          <Circle
            cx={30}
            cy={30}
            r={radius}
            stroke="rgba(207, 248, 252, 1)"
            strokeWidth={3}
            fill="transparent"
          />
          {/* Progress Circle */}
          <Circle
            cx={30}
            cy={30}
            r={radius}
            stroke="rgba(34, 225, 233, 1)"
            strokeWidth={3}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90, 30, 30)`}
          />
        </Svg>
        <Text style={styles.timerText}>{formatTime(timer)}</Text>
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
    width: "20%",
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
  otpContainer: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  otpInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  otpInput: {
    width: "18%",
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 24,
    color: "#222",
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
    textAlign: "center",
  },
  verifyBtn: {
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
  verifyBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "DMSans-SemiBold",
    fontWeight: "600",
  },
  resendText: {
    color: "rgba(98, 50, 255, 1)",
    fontSize: 16,
    fontFamily: "DMSans-Medium",
    fontWeight: "500",
    marginTop: 10,
  },
  timerCircle: {
    top: "5%",
    alignSelf: "center",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    position: "absolute",
    color: "#222",
    fontSize: 12,
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
  },
});
