import MultiSlider from "@react-native-oh-tpl/react-native-multi-slider";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SidebarModal from "../components/SidebarModal";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EmiCalculator() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  // Loan calculator state
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(5);
  const [tenure, setTenure] = useState(5);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  // EMI Calculation (simple formula)
  const principal = loanAmount;
  const rate = interestRate / 100 / 12;
  const n = tenure;
  const emi =
    rate === 0
      ? principal / n
      : Math.round(
          (principal * rate * Math.pow(1 + rate, n)) /
            (Math.pow(1 + rate, n) - 1)
        );

  const enableScroll = () => setScrollEnabled(true);
  const disableScroll = () => setScrollEnabled(false);

  return (
    <SafeAreaView style={styles.container}>
      <SidebarModal
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity
              style={styles.menuIcon}
              onPress={() => setSidebarVisible(true)}
            >
              <Image source={require("../../assets/images/menuIcon.png")} />
            </TouchableOpacity>
            <View>
              <Image source={require("../../assets/images/headerText.png")} />
              <Text style={styles.welcomeText}>Get credit. Get going.</Text>
            </View>
          </View>
        </View>
        <Image source={require("../../assets/images/EMICalculatorheader.png")} />
        <View
          style={{
            backgroundColor: "rgba(234, 236, 240, 1)",
            height: 1,
            width: "100%",
          }}
        />
        <View style={{ backgroundColor: "white" }}>
          {/* Loan Calculator Card */}
          <View style={styles.calculatorCard}>
            {/* Loan Amount */}
            <View style={styles.calculatorSection}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.calculatorLabel}>Loan amount</Text>
                <View style={styles.calculatorValueRow}>
                  <Text style={styles.calculatorValue}>
                    ₹ {loanAmount.toLocaleString()}
                  </Text>
                </View>
              </View>
              <MultiSlider
                values={[loanAmount]}
                min={50000}
                max={5000000}
                step={1000}
                onValuesChangeStart={disableScroll}
                onValuesChangeFinish={enableScroll}
                onValuesChange={(values) => setLoanAmount(values[0])}
                sliderLength={250}
                selectedStyle={{
                  backgroundColor: "#6232FF",
                }}
                unselectedStyle={{
                  backgroundColor: "#E0D7FF",
                }}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: "#E0D7FF",
                }}
                markerStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: "#8E6CFD",
                  borderRadius: 12,
                }}
              />
              <View style={styles.calculatorRangeRow}>
                <Text style={styles.calculatorRange}>₹ 50,000</Text>
                <Text style={styles.calculatorRange}>₹ 50,00,000</Text>
              </View>
            </View>
            {/* Interest Rate */}
            <View style={styles.calculatorSection}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.calculatorLabel}>Interest rate</Text>
                <View style={styles.calculatorValueRow}>
                  <Text style={styles.calculatorValue}>
                    {Number(interestRate).toFixed(1)} %
                  </Text>
                </View>
              </View>
              <MultiSlider
                values={[interestRate]}
                min={0}
                max={50}
                step={0.1}
                onValuesChangeStart={disableScroll}
                onValuesChangeFinish={enableScroll}
                onValuesChange={(values) => setInterestRate(values[0])}
                sliderLength={250}
                selectedStyle={{
                  backgroundColor: "#6232FF",
                }}
                unselectedStyle={{
                  backgroundColor: "#E0D7FF",
                }}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: "#E0D7FF",
                }}
                markerStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: "#8E6CFD",
                  borderRadius: 12,
                }}
              />
              <View style={styles.calculatorRangeRow}>
                <Text style={styles.calculatorRange}>0 %</Text>
                <Text style={styles.calculatorRange}>50 %</Text>
              </View>
            </View>
            {/* Tenure */}
            <View style={styles.calculatorSection}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.calculatorLabel}>
                  Tenure <Text style={{ fontSize: 12 }}>(in months)</Text>
                </Text>
                <View style={styles.calculatorValueRow}>
                  <Text style={styles.calculatorValue}>{tenure}</Text>
                </View>
              </View>
              <MultiSlider
                values={[tenure]}
                min={1}
                max={12}
                step={1}
                onValuesChangeStart={disableScroll}
                onValuesChangeFinish={enableScroll}
                onValuesChange={(values) => setTenure(values[0])}
                sliderLength={250}
                selectedStyle={{
                  backgroundColor: "#6232FF",
                }}
                unselectedStyle={{
                  backgroundColor: "#E0D7FF",
                }}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: "#E0D7FF",
                }}
                markerStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: "#8E6CFD",
                  borderRadius: 12,
                }}
              />
              <View style={styles.calculatorRangeRow}>
                <Text style={styles.calculatorRange}>1 month</Text>
                <Text style={styles.calculatorRange}>12 months</Text>
              </View>
            </View>
            {/* EMI Result */}
            <View style={styles.emiResultBox}>
              <Text style={styles.emiResultLabel}>Monthly emi</Text>
              <Text style={styles.emiResultValue}>
                ₹ {emi.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollContent: {
    paddingBottom: 150,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal:4

  },
  menuIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "DMSans-Regular",
  },
  offersTitle: {
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 12,
    marginLeft: 30,
    fontFamily: "DMSans-bold",
  },
  offerCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(234, 236, 240, 1)",
  },
  offerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  offerAmount: {
    color: "rgba(56, 163, 17, 1)",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 4,
    fontFamily: "DMSans-bold",
  },
  offerDetails: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 14,
    marginBottom: 12,
    fontFamily: "DMSans-bold",
    fontWeight: "500",
  },
  offerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quickApprovalBtn: {
    backgroundColor: "rgba(98, 50, 255, 0.02)",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 199, 255, 0.2)",
  },
  quickApprovalText: {
    color: "rgba(98, 50, 255, 1)",
    fontWeight: "500",
    fontSize: 13,
    fontFamily: "DMSans-regular",
  },
  applyNowBtn: {
    backgroundColor: "rgba(98, 50, 255, 1)",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 28,
  },
  applyNowText: {
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "DMSans-bold",
  },
  calculatorCard: {
    backgroundColor: "#fff",
    padding: 13,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    marginHorizontal: 20,
    marginTop: 15,
   
  },
  calculatorSection: {
    marginBottom: 20,
    backgroundColor: "rgba(253, 252, 255, 1)",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1.5,
    borderColor: "rgba(212, 199, 255, 1)",
  },
  calculatorLabel: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 20,
    fontFamily: "DMSans-medium",
    marginBottom: 8,
    fontWeight: "500",
  },
  calculatorValueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(89, 57, 190, 0.05)",
    borderColor: "rgba(212, 199, 255, 1)",
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 2,
  },
  calculatorValue: {
    color: "rgba(89, 57, 190, 1)",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "DMSans-medium",
  },
  calculatorRangeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calculatorRange: {
    color: "rgba(95, 95, 95, 1)",
    fontSize: 14,
    fontFamily: "DMSans-medium",
    fontWeight: "500",
  },
  emiResultBox: {
    backgroundColor: "rgba(242, 235, 255, 1)",
    borderRadius: 8,
    padding: 12,
    borderColor: "rgba(212, 199, 255, 1)",
    borderWidth: 1,
  },
  emiResultLabel: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 14,
    fontFamily: "DMSans-medium",
    marginBottom: 8,
    fontWeight: "500",
  },
  emiResultValue: {
    color: "rgba(98, 50, 255, 1)",
    fontWeight: "700",
    fontSize: 20,
    fontFamily: "DMSans-medium",
  },
});
