import { useLocalSearchParams } from "expo-router";
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
import PullToRefreshWrapper from "../components/PullToRefreshWrapper";
import SidebarModal from "../components/SidebarModal";
import { API_CONFIG } from "../config/api";
import { useLoanList } from "../context/LoanListContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Offers() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{
    [key: string]: { width: number; height: number };
  }>({});
  const { type } = useLocalSearchParams();
  const { loanList, refreshLoanList } = useLoanList();
  const { user } = useSelector((state: any) => state.auth);

  const sortedLoanList = [...loanList].sort((a: any, b: any) => {
    const aIsAvailable =
      user?.availablePartner?.includes(a?.partner?.name) || false;
    const bIsAvailable =
      user?.availablePartner?.includes(b?.partner?.name) || false;

    if (aIsAvailable && !bIsAvailable) return -1;
    if (!aIsAvailable && bIsAvailable) return 1;
    return 0;
  });

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
      {type === "offers" ? (
        <Image source={require("../../assets/images/LoanOffersHeader.png")} />
      ) : type === "loan" ? (
        <Image source={require("../../assets/images/loanHeader.png")} />
      ) : null}

      <PullToRefreshWrapper
        onRefresh={refreshLoanList}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={{
            backgroundColor: "rgba(234, 236, 240, 1)",
            height: 1,
            width: "100%",
          }}
        />
        <View style={{ backgroundColor: "white" }}>
          <View style={{ paddingBottom: 90, marginTop: 20 }}>
            {sortedLoanList.map((item: any, index: number) => {
              let url =
                API_CONFIG.BASE_URL + item?.image ||
                API_CONFIG.BASE_URL + item?.partner?.logoUrl;

              if (!imageDimensions[url]) {
                Image.getSize(
                  url,
                  (width, height) => {
                    setImageDimensions((prev) => ({
                      ...prev,
                      [url]: { width, height },
                    }));
                  },
                  (error) => {
                    console.error("Failed to get image size:", error);
                    setImageDimensions((prev) => ({
                      ...prev,
                      [url]: { width: 100, height: 100 },
                    }));
                  }
                );
              }

              const dimensions =
                imageDimensions[url] || { width: 100, height: 100 };

              // Animations
              const fadeAnim = useRef(new Animated.Value(0)).current;
              const translateY = useRef(new Animated.Value(20)).current;
              const scaleAnim = useRef(new Animated.Value(1)).current;

              useEffect(() => {
                Animated.parallel([
                  Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 400,
                    delay: index * 150, // stagger
                    useNativeDriver: true,
                  }),
                  Animated.timing(translateY, {
                    toValue: 0,
                    duration: 400,
                    delay: index * 150,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                  }),
                ]).start();
              }, []);

              const handlePressIn = () => {
                Animated.spring(scaleAnim, {
                  toValue: 0.95,
                  useNativeDriver: true,
                }).start();
              };

              const handlePressOut = () => {
                Animated.spring(scaleAnim, {
                  toValue: 1,
                  friction: 3,
                  tension: 40,
                  useNativeDriver: true,
                }).start();
              };

              return (
                <Animated.View
                  key={item.id || index}
                  style={{
                    opacity: fadeAnim,
                    transform: [{ translateY }],
                  }}
                >
                  <View style={styles.offerCard}>
                    <View style={styles.offerHeader}>
                      <Image
                        source={{ uri: url }}
                        style={{
                          width: dimensions.width,
                          height: dimensions.height,
                          borderRadius: 5,
                        }}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.offerAmount}>{item.price}</Text>
                    <Text style={styles.offerDetails}>{item?.description}</Text>
                    <View style={styles.offerActions}>
                      {JSON.parse(item.tags).map(
                        (tag: any, tagIndex: any) => (
                          <View key={tagIndex} style={styles.quickApprovalBtn}>
                            <Text style={styles.quickApprovalText}>{tag}</Text>
                          </View>
                        )
                      )}
                    </View>

                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                      <TouchableOpacity
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
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
                    </Animated.View>
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
  welcomeText: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "DMSans-Regular",
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
  offerAmount: {
    color: "rgba(56, 163, 17, 1)",
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 4,
    fontFamily: "DMSans-regular",
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
  availableBadge: {
    backgroundColor: "rgba(56, 163, 17, 0.1)",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "rgba(56, 163, 17, 0.3)",
  },
  availableBadgeText: {
    color: "rgba(56, 163, 17, 1)",
    fontSize: 10,
    fontWeight: "600",
    fontFamily: "DMSans-bold",
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "rgba(98, 50, 255, 0.05)",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "DMSans-bold",
    color: "rgba(98, 50, 255, 1)",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontFamily: "DMSans-regular",
    color: "rgba(112, 112, 112, 1)",
  },
});
