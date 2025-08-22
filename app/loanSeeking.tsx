import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch } from "react-redux";
import { updateUser } from "./store/slices/authSlice";
import apiClient from "./utils/apiClient";

function numberToWords(num: number): string {
  // Only for up to 99,99,999 (for demo)
  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const scales = ["", "Thousand", "Lakh", "Crore"];

  if (num === 0) return "Zero";
  if (num < 0) return "Minus " + numberToWords(Math.abs(num));

  let words = "";
  let scaleIdx = 0;
  let n = num;

  const getBelowThousand = (n: number) => {
    let str = "";
    if (n > 99) {
      str += units[Math.floor(n / 100)] + " Hundred ";
      n = n % 100;
    }
    if (n > 19) {
      str += tens[Math.floor(n / 10)] + " ";
      n = n % 10;
    }
    if (n > 0) {
      str += units[n] + " ";
    }
    return str.trim();
  };

  const parts = [];
  parts.push(n % 1000); // units
  n = Math.floor(n / 1000);
  parts.push(n % 100); // thousands
  n = Math.floor(n / 100);
  parts.push(n % 100); // lakhs
  n = Math.floor(n / 100);
  parts.push(n); // crores

  for (let i = parts.length - 1; i >= 0; i--) {
    if (parts[i]) {
      words +=
        getBelowThousand(parts[i]) + (scales[i] ? " " + scales[i] + " " : " ");
    }
  }
  return words.trim();
}

function formatINR(num: number) {
  return num.toLocaleString("en-IN");
}

const MINIMUM_LOAN_AMOUNT = 5000;

// Validate loan amount meets minimum requirement
const isLoanAmountValid = (amount: number): boolean => {
  return amount >= MINIMUM_LOAN_AMOUNT;
};

export default function LoanSeeking() {
  const [amount, setAmount] = useState(200000);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  const handleAmountChange = (text: string) => {
    // Remove non-digits
    const digits = text.replace(/[^0-9]/g, "");
    setAmount(Number(digits) || 0);
  };

  // Loan amount validation
  const isLoanAmountValidValue = isLoanAmountValid(amount);

  const handleNext = async () => {
    if (amount <= 0) {
      Alert.alert("Error", "Please enter a valid loan amount");
      return;
    }

    if (!isLoanAmountValidValue) {
      Alert.alert("Error", `Minimum loan amount must be at least ₹${formatINR(MINIMUM_LOAN_AMOUNT)}`);
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.updateUserProfile({ loanAmount: amount });
      if (response.data) {
        dispatch(updateUser(response.data));
        router.dismissTo("/personalDetails");
      } else {
        Alert.alert("Error", response.message || "Failed to save loan amount");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["rgba(166, 255, 0, 0.8)", "rgba(247, 255, 230, 0.5)", "rgba(247, 255, 230, 0.5)"]}
      start={{ x: 0.4, y: 1 }}
      end={{ x: 0.5, y: 0.3 }}
      style={styles.container}
    >
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
      <View style={styles.progressBar} />

      </View>
      <View style={styles.content}>
        <Text style={styles.title}>How much loan are you seeking?</Text>
        <Text style={styles.label}>Loan Amount</Text>
        <View style={[styles.inputWrapper, !isLoanAmountValidValue && amount > 0 && styles.inputError]}>
          <Text style={styles.rupeeSymbol}>₹</Text>
          <TextInput
            style={styles.amountInput}
            keyboardType="number-pad"
            value={formatINR(amount)}
            onChangeText={handleAmountChange}
            placeholder="0"
            placeholderTextColor="#bdbdbd"
            maxLength={9}
          />
        </View>
        {amount > 0 && !isLoanAmountValidValue && (
          <Text style={styles.errorText}>
            Minimum loan amount must be at least ₹{formatINR(MINIMUM_LOAN_AMOUNT)}
          </Text>
        )}
        <Text style={styles.amountInWords}>
          {amount > 0 ? `Rupees ${numberToWords(amount)}` : ""}
        </Text>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={handleNext}
          disabled={loading}
        >
          <Text style={styles.nextBtnText}>Next</Text>
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
    width: "40%",
    height: "100%",
    backgroundColor: "rgba(98, 50, 255, 1)",
    borderRadius: 4,
  },
  progressBarActive: {
    width: "43%",
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
  label: {
    fontSize: 13,
    color: "#222",
    marginBottom: 6,
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    height: 60,
    marginBottom: 5,
    borderWidth: 1,
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
  amountInWords: {
    color: "#888",
    fontSize: 12,
    marginBottom: 20,
    marginTop: 5,
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
  },
  nextBtn: {
    backgroundColor: "rgba(98, 50, 255, 1)",
    borderRadius: 5,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
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
    fontWeight: "800",
  },
});
