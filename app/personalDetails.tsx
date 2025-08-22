import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { useDispatch } from "react-redux";
import { updateUser } from "./store/slices/authSlice";
import apiClient from "./utils/apiClient";

export default function PersonalDetails() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const dispatch = useDispatch();

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Name validation function - only letters, spaces, and common name characters
  const isValidName = (name: string) => {
    const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
    return nameRegex.test(name);
  };

  // Validation function
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // First Name validation
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!isValidName(firstName.trim())) {
      newErrors.firstName = "First name should only contain letters";
    } else if (firstName.trim().length < 2) {
      newErrors.firstName = "First name should be at least 2 characters";
    }

    // Last Name validation
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!isValidName(lastName.trim())) {
      newErrors.lastName = "Last name should only contain letters";
    } else if (lastName.trim().length < 2) {
      newErrors.lastName = "Last name should be at least 2 characters";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // Gender validation
    if (!gender) {
      newErrors.gender = "Please select your gender";
    }

    // Pincode validation
    if (!pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (pincode.length !== 6) {
      newErrors.pincode = "Pincode should be 6 digits";
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = "Pincode should contain only numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.updateUserProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        gender: gender!,
        pincode: pincode.trim(),
      });
      if (response.data) {
        dispatch(updateUser(response.data));
        router.dismissTo("/kyc");
      } else {
        Alert.alert("Error", response.message || "Failed to save personal details");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFirstNameChange = (text: string) => {
    setFirstName(text);
    if (errors.firstName) {
      setErrors(prev => ({ ...prev, firstName: "" }));
    }
  };

  const handleLastNameChange = (text: string) => {
    setLastName(text);
    if (errors.lastName) {
      setErrors(prev => ({ ...prev, lastName: "" }));
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: "" }));
    }
  };

  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender);
    if (errors.gender) {
      setErrors(prev => ({ ...prev, gender: "" }));
    }
  };

  const handlePincodeChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setPincode(numericText);
    if (errors.pincode) {
      setErrors(prev => ({ ...prev, pincode: "" }));
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient
          colors={["rgba(196, 181, 253, 1)", "rgba(241, 238, 255, 0.5)", "rgba(241, 238, 255, 0.5)"]}
          start={{ x: 0.4, y: 1 }}
          end={{ x: 0.5, y: 0.2 }}
          style={styles.container}
        >
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar} />
          </View>
          
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              <Text style={styles.title}>A few personal details</Text>
              <Text style={styles.subtitle}>Helps us know you better</Text>
              
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={[styles.input, errors.firstName && styles.inputError]}
                value={firstName}
                onChangeText={handleFirstNameChange}
                placeholder="First Name"
                placeholderTextColor="#bdbdbd"
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
              
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={[styles.input, errors.lastName && styles.inputError]}
                value={lastName}
                onChangeText={handleLastNameChange}
                placeholder="Last Name"
                placeholderTextColor="#bdbdbd"
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
              
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Email"
                placeholderTextColor="#bdbdbd"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              
              <Text style={styles.label}>Gender</Text>
              <View style={styles.genderRow}>
                <TouchableOpacity
                  style={[
                    styles.genderBtn,
                    gender === "Male" && styles.genderBtnActive,
                    errors.gender && styles.inputError
                  ]}
                  onPress={() => handleGenderChange("Male")}
                >
                  <Text
                    style={[
                      styles.genderBtnText,
                      gender === "Male" && styles.genderBtnTextActive,
                    ]}
                  >
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderBtn,
                    gender === "Female" && styles.genderBtnActive,
                    errors.gender && styles.inputError
                  ]}
                  onPress={() => handleGenderChange("Female")}
                >
                  <Text
                    style={[
                      styles.genderBtnText,
                      gender === "Female" && styles.genderBtnTextActive,
                    ]}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
              
              <Text style={styles.label}>Pincode</Text>
              <TextInput
                style={[styles.input, errors.pincode && styles.inputError]}
                value={pincode}
                onChangeText={handlePincodeChange}
                placeholder="Pincode"
                placeholderTextColor="#bdbdbd"
                keyboardType="number-pad"
                maxLength={6}
              />
              {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
              
              <TouchableOpacity
                style={styles.nextBtn}
                onPress={handleNext}
                disabled={loading}
              >
                <Text style={styles.nextBtnText}>
                  {loading ? "Saving..." : "Next"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
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
    width: "68%",
    height: "100%",
    backgroundColor: "#6232FF",
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
    marginTop: 10,
  },
  input: {
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
    marginBottom: 5,
  },
  inputError: {
    borderColor: "#ff4444",
    borderWidth: 1,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    fontFamily: "DMSans-Regular",
    marginBottom: 8,
    marginTop: -2,
  },
  genderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 16,
  },
  genderBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#fff",
    marginRight: 10,
  },
  genderBtnActive: {
    borderColor: "#6232FF",
    backgroundColor: "#F3F0FF",
  },
  genderBtnText: {
    color: "#222",
    fontSize: 16,
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
    letterSpacing: 2,
  },
  genderBtnTextActive: {
    color: "#6232FF",
    fontFamily: "DMSans-SemiBold",
    fontWeight: "700",
  },
  nextBtn: {
    backgroundColor: "#6232FF",
    borderRadius: 5,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
    shadowColor: "#7c4dff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  nextBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "DMSans-SemiBold",
    fontWeight: "700",
  },
});
