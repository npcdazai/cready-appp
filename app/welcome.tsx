import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Welcome() {
  const router = useRouter();
  return (
    <LinearGradient
      colors={[
        "rgba(196, 181, 253, 1)",
        "rgba(226, 230, 243, 1)",
        "rgba(209, 247, 1, 1)",
      ]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.phoneMockupContainer}>
          <Image
            source={require("../assets/images/phone-mockup.png")}
            resizeMode="contain"
            style={{ height: 420, width: 230 }}
          />
        </View>
        {/* Large C logo */}
        <View style={{flex:1,justifyContent:"flex-end"}}>
          <View style={styles.logoContainer}>
            <Image source={require("../assets/images/cIcon.png")} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.headline}>
              <Text style={styles.boldText}>Cready</Text> is here,{"\n"}
              with personal loans that actually feel personal.
            </Text>
            <Text style={styles.subtext}>
              Made for your life. Built around your moments.
            </Text>
          </View>
          {/* Continue to Apply button */}
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.applyButtonText}>Continue to Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  phoneMockupContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "100%",
  },
  logoContainer: {
    marginHorizontal: 20,
    bottom: 50,
  },
  logoText: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  textContainer: {
    marginHorizontal: 20,
    bottom: 30,
  },
  headline: {
    fontSize: 24,
    textAlign: "left",
    fontWeight: "400",
    color: "#222",
    width: "100%",
    fontFamily: "DMSans-Medium",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
    fontFamily: "DMSans-Bold",
  },
  subtext: {
    fontSize: 20,
    color: "rgba(0, 0, 0, 1)",
    width: "100%",
    fontFamily: "DMSans-Regular",
    fontWeight: "300",
  },
  applyButton: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: "center",
    marginHorizontal: 20,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  applyButtonText: {
    color: "rgba(98, 50, 255, 1)",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "DMSans-Medium",
  },
});
