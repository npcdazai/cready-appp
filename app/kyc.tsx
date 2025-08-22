import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";
import { updateUser } from "./store/slices/authSlice";
import apiClient from "./utils/apiClient";

function formatINR(num: number) {
  return num.toLocaleString("en-IN");
}

const JOB_TYPES = ["Salaried", "Self-Employed", "Business Owner", "Other"];
const MINIMUM_SALARY = 20000;
const MINIMUM_AGE = 18;

// Calculate age from date of birth
const calculateAge = (dob: string): number => {
  if (!dob) return 0;
  
  const parts = dob.split(" / ");
  if (parts.length !== 3) return 0;
  
  const [day, month, year] = parts;
  const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Validate salary meets minimum requirement
const isSalaryValid = (salary: string): boolean => {
  const salaryNumber = Number(salary.replace(/[^0-9]/g, ""));
  return salaryNumber >= MINIMUM_SALARY;
};

export default function KYC() {
  const [pan, setPan] = useState("");
  const [dob, setDob] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [showJobDropdown, setShowJobDropdown] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // PAN validation: 5 letters, 4 digits, 1 letter
  const isPanValid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan.toUpperCase());

  // Age validation
  const age = calculateAge(dob);
  const isAgeValid = age >= MINIMUM_AGE;

  // Salary validation
  const isSalaryValidValue = isSalaryValid(salary);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    const formattedDate = date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, " / ");
    setDob(formattedDate);
    hideDatePicker();
  };

  // Convert display date format to ISO date string for API
  const formatDateForAPI = (displayDate: string) => {
    if (!displayDate) return "";
    const parts = displayDate.split(" / ");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
    return displayDate;
  };

  const handleNext = async () => {
    if (!pan.trim() || !dob || !jobType || !salary.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!isPanValid) {
      Alert.alert("Error", "Please enter a valid PAN number");
      return;
    }

    if (!isAgeValid) {
      Alert.alert("Error", `You must be at least ${MINIMUM_AGE} years old to apply for a loan`);
      return;
    }

    if (!isSalaryValidValue) {
      Alert.alert("Error", `Minimum monthly salary must be at least ₹${formatINR(MINIMUM_SALARY)}`);
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.updateUserProfile({
        panNumber: pan.trim().toUpperCase(),
        dateOfBirth: formatDateForAPI(dob),
        jobType,
        monthlySalary: Number(salary.replace(/[^0-9]/g, "")),
        isProfileComplete:true
      });
      if (response.data) {
        dispatch(updateUser(response.data));
        router.dismissTo("/dashboard");
      } else {
        Alert.alert("Error", response.message || "Failed to save KYC details");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[
        "rgba(196, 181, 253, 1)",
        "rgba(241, 238, 255, 0.5)",
        "rgba(241, 238, 255, 0.5)",
      ]}
      start={{ x: 0.4, y: 1 }}
      end={{ x: 0.5, y: 0.2 }}
      style={styles.container}
    >
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Awesome, you are 1 step away!</Text>
        <Text style={styles.subtitle}>
          Complete your KYC to get loan offers
        </Text>
        {/* PAN Field */}
        <Text style={styles.label}>Enter PAN</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={pan}
            onChangeText={(text) => setPan(text.toUpperCase())}
            placeholder="ADGPH8824M"
            placeholderTextColor="#bdbdbd"
            autoCapitalize="characters"
            maxLength={10}
          />
          {isPanValid && (
            <Ionicons
              name="checkmark-circle"
              size={28}
              color="#6232FF"
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
        {/* DOB Field */}
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            style={[styles.input, !isAgeValid && dob && styles.inputError]}
            value={dob}
            editable={false}
            placeholder="DD / MM / YYYY"
            placeholderTextColor="#bdbdbd"
          />
        </TouchableOpacity>
        {dob && !isAgeValid && (
          <Text style={styles.errorText}>
            You must be at least {MINIMUM_AGE} years old (Current age: {age})
          </Text>
        )}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date(new Date().getFullYear() - MINIMUM_AGE, new Date().getMonth(), new Date().getDate())}
        />
        {/* Job Type Dropdown */}
        <Text style={styles.label}>Job Type</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowJobDropdown(!showJobDropdown)}
          activeOpacity={0.8}
        >
          <Text
            style={{
              color: jobType ? "#222" : "#bdbdbd",
              fontSize: 16,
              fontFamily: "DMSans-Regular",
              fontWeight: "500",
            }}
          >
            {jobType || "Select"}
          </Text>
        </TouchableOpacity>
        {showJobDropdown && (
          <View style={styles.dropdown}>
            {JOB_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.dropdownItem}
                onPress={() => {
                  setJobType(type);
                  setShowJobDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {/* Salary Field */}
        <Text style={styles.label}>Monthly In-hand Salary</Text>
        <View style={[styles.inputWrapper, !isSalaryValidValue && salary && styles.inputError]}>
          <Text style={styles.rupeeSymbol}>₹</Text>
          <TextInput
            style={styles.amountInput}
            value={
              salary ? formatINR(Number(salary.replace(/[^0-9]/g, ""))) : ""
            }
            onChangeText={(text) => setSalary(text.replace(/[^0-9]/g, ""))}
            placeholder="45,000"
            placeholderTextColor="#bdbdbd"
            keyboardType="number-pad"
            maxLength={9}
          />
        </View>
        {salary && !isSalaryValidValue && (
          <Text style={styles.errorText}>
            Minimum salary must be at least ₹{formatINR(MINIMUM_SALARY)}
          </Text>
        )}
        {/* Button */}
        <TouchableOpacity
          style={[styles.getLoanBtn, loading && styles.getLoanBtnDisabled]}
          onPress={handleNext}
          disabled={loading}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.getLoanBtnText}>Processing...</Text>
            </View>
          ) : (
            <Text style={styles.getLoanBtnText}>Next</Text>
          )}
        </TouchableOpacity>
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
    width: "100%",
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
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    fontFamily: "DMSans-Regular",
    marginBottom: 5,
    marginTop: -2,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 2,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownItemText: {
    color: "#222",
    fontSize: 16,
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    height: 50,
    marginBottom: 5,
  },
  rupeeSymbol: {
    fontSize: 16,
    color: "#222",
    marginRight: 10,
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    color: "#222",
    backgroundColor: "transparent",
    padding: 0,
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
  },
  getLoanBtn: {
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
  getLoanBtnDisabled: {
    backgroundColor: "#9e9e9e",
    shadowOpacity: 0.1,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  getLoanBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "DMSans-SemiBold",
    fontWeight: "700",
    marginLeft: 8,
  },
});
