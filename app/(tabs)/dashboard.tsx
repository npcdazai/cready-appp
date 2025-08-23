import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import PullToRefreshWrapper from "../components/PullToRefreshWrapper";
import SidebarModal from "../components/SidebarModal";
import { API_CONFIG } from "../config/api";
import { useLoanList } from "../context/LoanListContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const { user } = useSelector((state: any) => state.auth);

  const { loanList, refreshLoanList } = useLoanList();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{[key: string]: {width: number, height: number}}>({});

  return (
    <SafeAreaView style={styles.container}>
      <SidebarModal
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
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
      <PullToRefreshWrapper
        onRefresh={refreshLoanList}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}

        <View
          style={{
            backgroundColor: "rgba(234, 236, 240, 1)",
            height: 1,
            width: "100%",
          }}
        />
        <View style={{ backgroundColor: "white" }}>
          {/* Status Card */}
          {/* <View style={styles.statusCard}>
            <Text style={styles.statusText}>Your information is pending</Text>
            <TouchableOpacity style={styles.statusButton}>
              <Text style={styles.statusButtonText}>Complete profile</Text>
            </TouchableOpacity>
          </View> */}

          {/* Promo Banner */}

          <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                fontFamily: "DMSans-bold",
                color: "black",
              }}
            >
              Welcome{" "}
              <Text style={{ color: "rgba(98, 50, 255, 1)" }}>
                {user?.firstName}
              </Text>
              !
            </Text>
          </View>
          <View style={styles.promoBanner}>
            <Image
              source={require("../../assets/images/QuickPersonalLoan.png")}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </View>

          {/* Loan Offer Cards */}
          <View style={styles.loanCardsRow}>
            <TouchableOpacity
              style={styles.loanCard}
              onPress={() => router.push("/offers?type=offers")}
            >
              <Image
                source={require("../../assets/images/InstantLoanOffers.png")}
                style={{ height: 130, width: "100%", borderRadius: 10 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loanCard}
              onPress={() => router.push("/offers?type=loan")}
            >
              <Image
                source={require("../../assets/images/Personalloan.png")}
                style={{ height: 130, width: "100%", borderRadius: 10 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          {/* Offers Section */}
          <Text style={styles.offersTitle}>Best Offers for you</Text>
          <View style={{ paddingBottom: 50 }}>
            {loanList.map((item: any) => {
              let url =
                API_CONFIG.BASE_URL + item?.image ||
                API_CONFIG.BASE_URL + item?.partner?.logoUrl;

              if (!imageDimensions[url]) {
                Image.getSize(
                  url,
                  (width, height) => {
                    setImageDimensions(prev => ({
                      ...prev,
                      [url]: { width, height }
                    }));
                  },
                  (error) => {
                    console.error("Failed to get image size:", error);
                    setImageDimensions(prev => ({
                      ...prev,
                      [url]: { width: 100, height: 100 }
                    }));
                  }
                );
              }

              const dimensions = imageDimensions[url] || { width: 100, height: 100 };
              
              return (
                <View key={item.id || Math.random()} style={styles.offerCard}>
                  <View style={styles.offerHeader}>
                    <Image
                      source={{
                        uri: url,
                      }}
                      style={{ width: dimensions.width, height: dimensions.height, borderRadius: 5 }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.offerAmount}>{item.price}</Text>
                  <Text style={styles.offerDetails}>{item?.description}</Text>
                  <View style={styles.offerActions}>
                    {JSON.parse(item.tags).map((tag: any, index: any) => (
                      <View key={index} style={styles.quickApprovalBtn}>
                        <Text style={styles.quickApprovalText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      const url =
                        Platform.OS === "ios"
                          ? item?.appstore || item?.utm
                          : item?.playstore || item?.utm;
                      Linking.openURL(url);
                    }}
                    style={styles.applyNowBtn}
                  >
                    <Text style={styles.applyNowText}>Apply Now</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </PullToRefreshWrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  menuIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  bellIcon: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 22,
    color: "#fff",
  },
  logoText: {
    flex: 1,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },
  welcomeText: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "DMSans-Regular",
  },
  statusCard: {
    backgroundColor: "rgba(98, 50, 255, 0.05)",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(98, 50, 255, 0.1)",
    marginHorizontal: 20,
    marginTop: 10,
  },
  statusText: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "DMSans-regular",
    flex: 1,
  },
  statusButton: {
    backgroundColor: "rgba(98, 50, 255, 1)",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: "rgba(142, 108, 253, 1)",
  },
  statusButtonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 12,
    fontFamily: "DMSans-bold",
  },
  promoBanner: {
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
  },
  bannerImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
  },
  promoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  promoButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  promoButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  promoImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
  },
  loanCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  loanCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  loanCardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  loanCardTitle: {
    color: "#fff",
    fontSize: 16,
    marginTop: 4,
    fontFamily: "DMSans-medium",
    fontWeight: "600",
  },
  loanCardSubtitle: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "DMSans-bold",
    fontWeight: "600",
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
    marginBottom: 12,
  },
  bankLogo: {
    width: 32,
    height: 32,
    marginRight: 8,
    resizeMode: "contain",
  },
  bankName: {
    color: "#A020F0",
    fontWeight: "bold",
    fontSize: 16,
  },
  offerAmount: {
    color: "rgba(56, 163, 17, 1)",
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 4,
    fontFamily: "DMSans-regular",
  },
  offerDetails: {
    color: "rgba(112, 112, 112, 1)",
    fontSize: 14,
    marginBottom: 12,
    fontFamily: "DMSans-bold",
    fontWeight: "500",
    marginTop: 2,
  },
  offerActions: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  quickApprovalBtn: {
    backgroundColor: "rgba(89, 57, 190, 0.05)",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 199, 255, 1)",
    marginBottom: 4,
    maxWidth: "100%",
  },
  quickApprovalText: {
    color: "rgba(98, 50, 255, 1)",
    fontWeight: "500",
    fontSize: 13,
    fontFamily: "DMSans-regular",
    flexShrink: 1,
  },
  applyNowBtn: {
    backgroundColor: "rgba(89, 57, 190, 1)",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: "rgba(142, 108, 253, 1)",
    alignItems: "center",
  },
  applyNowText: {
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "DMSans-bold",
  },
});
