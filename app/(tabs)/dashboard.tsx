import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import PullToRefreshWrapper from "../components/PullToRefreshWrapper";
import SidebarModal from "../components/SidebarModal";
import { API_CONFIG } from "../config/api";
import { useLoanList } from "../context/LoanListContext";

export default function Dashboard() {
  const { user } = useSelector((state: any) => state.auth);
  const { loanList, refreshLoanList } = useLoanList();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SidebarModal
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />

      {/* 🔹 Animated Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
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
      </Animated.View>

      <PullToRefreshWrapper
        onRefresh={refreshLoanList}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={{ backgroundColor: "white" }}>
          {/* 🔹 Welcome Animation */}
          <Animated.Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              fontFamily: "DMSans-bold",
              color: "black",
              marginVertical: 10,
              marginHorizontal: 20,
              opacity: fadeAnim,
              transform: [{ translateY }],
            }}
          >
            Welcome{" "}
            <Text style={{ color: "rgba(98, 50, 255, 1)" }}>
              {user?.firstName}
            </Text>
            !
          </Animated.Text>

          {/* 🔹 Promo Banner Animation */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ scale: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
              }) }],
              ...styles.promoBanner,
            }}
          >
            <Image
              source={require("../../assets/images/QuickPersonalLoan.png")}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </Animated.View>

          {/* 🔹 Loan Offer Cards Animation */}
          <View style={styles.loanCardsRow}>
            {[ 
              {
                image: require("../../assets/images/InstantLoanOffers.png"),
                path: "/offers?type=offers",
              },
              {
                image: require("../../assets/images/Personalloan.png"),
                path: "/offers?type=loan",
              },
            ].map((card, index) => {
              const anim = useRef(new Animated.Value(0)).current;

              useEffect(() => {
                Animated.timing(anim, {
                  toValue: 1,
                  duration: 600,
                  delay: 300 * index,
                  easing: Easing.out(Easing.ease),
                  useNativeDriver: true,
                }).start();
              }, []);

              return (
                <Animated.View
                  key={index}
                  style={{
                    flex: 1,
                    marginHorizontal: 4,
                    opacity: anim,
                    transform: [
                      {
                        translateY: anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <TouchableOpacity
                    onPress={() => router.push(card.path)}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={card.image}
                      style={{ height: 130, width: "100%", borderRadius: 10 }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          {/* 🔹 Offers Section */}
          <Text style={styles.offersTitle}>Best Offers for you</Text>
          <View style={{ paddingBottom: 50 }}>
            {loanList.map((item: any, index: number) => {
              const anim = useRef(new Animated.Value(0)).current;

              useEffect(() => {
                Animated.timing(anim, {
                  toValue: 1,
                  duration: 600,
                  delay: 300 * index,
                  easing: Easing.out(Easing.ease),
                  useNativeDriver: true,
                }).start();
              }, []);

              let url =
                API_CONFIG.BASE_URL + item?.image ||
                API_CONFIG.BASE_URL + item?.partner?.logoUrl;

              return (
                <Animated.View
                  key={item.id || index}
                  style={{
                    opacity: anim,
                    transform: [
                      {
                        translateY: anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <View style={styles.offerCard}>
                    <View style={styles.offerHeader}>
                      <Image
                        source={{ uri: url }}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 5,
                        }}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.offerAmount}>{item.price}</Text>
                    <Text style={styles.offerDetails}>{item?.description}</Text>
                    <View style={styles.offerActions}>
                      {JSON.parse(item.tags).map((tag: any, idx: any) => (
                        <View key={idx} style={styles.quickApprovalBtn}>
                          <Text style={styles.quickApprovalText}>{tag}</Text>
                        </View>
                      ))}
                    </View>

                    {/* 🔹 Button Press Animation */}
                    <TouchableOpacity
                      onPress={() => {
                        const url =
                          Platform.OS === "ios"
                            ? item?.appstore || item?.utm
                            : item?.playstore || item?.utm;
                        Linking.openURL(url);
                      }}
                      activeOpacity={0.7}
                      style={styles.applyNowBtn}
                    >
                      <Text style={styles.applyNowText}>Apply Now</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
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
