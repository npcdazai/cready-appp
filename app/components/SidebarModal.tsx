import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  Linking,
  Modal,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFooter } from "../context/FooterContex";
import { LinearGradient } from "expo-linear-gradient";

const router = useRouter();

interface SidebarModalProps {
  visible: boolean;
  onClose: () => void;
}

interface MenuItem {
  Image: React.ReactElement;
  label: string;
  onPress: () => void;
}

const menuItems: MenuItem[] = [
  {
    Image: <Image source={require("../../assets/images/MyprofileIcon.png")} />,
    label: "My profile",
    onPress: () => router.push("/profile"),
  },
  {
    Image: <Image source={require("../../assets/images/FAQsIcon.png")} />,
    label: "FAQs",
    onPress: () => router.push("/faq"),
  },
  {
    Image: <Image source={require("../../assets/images/LendingPartners.png")} />,
    label: "Lending Partners",
    onPress: () => router.push("/lending-partners"),
  },
  {
    Image: <Image source={require("../../assets/images/ShareappIcon.png")} />,
    label: "Share app",
    onPress: async () => {
      try {
        await Share.share({
          message: "Download Cready app and get instant cash loans",
          url:
            Platform.OS === "ios"
              ? "https://apps.apple.com/us/app/creedy-cash-loan/id6744444444"
              : "https://play.google.com/store/apps/details?id=com.creedy.app",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    },
  },
  {
    Image: <Image source={require("../../assets/images/RateusIcon.png")} />,
    label: "Rate us",
    onPress: async () => {
      try {
        const url =
          Platform.OS === "ios"
            ? "https://apps.apple.com/us/app/creedy-cash-loan/id6744444444"
            : "https://play.google.com/store/apps/details?id=com.creedy.app";

        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
          await Linking.openURL(url);
        }
      } catch (error) {
        console.error("Error opening store link:", error);
      }
    },
  },
  {
    Image: <Image source={require("../../assets/images/PrivacypolicyIcon.png")} />,
    label: "Privacy policy",
    onPress: () => router.push("/privacypolicy"),
  },
  {
    Image: <Image source={require("../../assets/images/PrivacypolicyIcon.png")} />,
    label: "Terms & Conditions",
    onPress: () => router.push("/termsconditions"),
  },
  {
    Image: <Image source={require("../../assets/images/ContactusIcon.png")} />,
    label: "Contact us",
    onPress: () => router.push("/contactus"),
  },
];

// Map social platform → icon
const getSocialIcon = (platform: string): React.ReactElement | null => {
  switch (platform.toLowerCase()) {
    case "facebook":
      return <Image source={require("../../assets/images/fbIcon.png")} style={styles.socialIcon} />;
    case "x":
    case "twitter":
      return <Image source={require("../../assets/images/xIcon.png")} style={styles.socialIcon} />;
    case "instagram":
      return <Image source={require("../../assets/images/insta.png")} style={styles.socialIcon} />;
    case "youtube":
      return <Image source={require("../../assets/images/ytIcon.png")} style={styles.socialIcon} />;
    case "linkedin":
      return <Image source={require("../../assets/images/linkdeenIcon.png")} style={styles.socialIcon} />;
    case "whatsapp":
      return <Image source={require("../../assets/images/whatsapp.png")} style={styles.socialIcon} />;
    default:
      return null;
  }
};

const SidebarModal: React.FC<SidebarModalProps> = ({ visible, onClose }) => {
  const { footerData, loading } = useFooter();
  const slideAnim = useRef(new Animated.Value(-335)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Menu animations
  const itemAnimations = useRef(menuItems.map(() => new Animated.Value(0))).current;

  // Social icon scale animation (single effect for all icons)
  const socialScaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();

      // stagger menu items
      Animated.stagger(
        80,
        itemAnimations.map(anim =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 350,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          })
        )
      ).start();

      // animate social icons
      Animated.spring(socialScaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: -335, duration: 250, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start();

      itemAnimations.forEach(anim => anim.setValue(0));
      socialScaleAnim.setValue(0.8);
    }
  }, [visible]);

  const handleMenuItemPress = (item: MenuItem) => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: -335, duration: 250, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => {
      onClose();
      item.onPress();
    });
  };

  const handleOverlayPress = () => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: -335, duration: 250, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => onClose());
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleOverlayPress}>
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        <TouchableOpacity style={styles.overlayTouchable} activeOpacity={1} onPress={handleOverlayPress} />
        <Animated.View style={[styles.sidebarContainer, { transform: [{ translateX: slideAnim }] }]}>
          <LinearGradient
            colors={["rgba(98, 50, 255, 0.2)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"]}
            start={{ x: 0.4, y: 1 }}
            end={{ x: 0.5, y: 0.2 }}
            style={styles.sidebar}
          >
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image source={require("../../assets/images/drawerlogo.png")} style={styles.logo} />
            </View>

            {/* Menu Items */}
            <View style={styles.menuList}>
              {menuItems.map((item, idx) => (
                <Animated.View
                  key={idx}
                  style={{
                    opacity: itemAnimations[idx],
                    transform: [
                      {
                        translateY: itemAnimations[idx].interpolate({
                          inputRange: [0, 1],
                          outputRange: [18, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <TouchableOpacity
                    style={styles.menuItem}
                    activeOpacity={0.7}
                    onPress={() => handleMenuItemPress(item)}
                  >
                    <View style={styles.menuIcon}>{item.Image}</View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>

            {/* Social Section */}
            <View style={styles.socialSection}>
              <Text style={styles.appVersion}>App version 1.0.1</Text>
              <View style={styles.separator} />

              {!loading && footerData?.socialLinks && footerData.socialLinks.length > 0 && (
                <View style={styles.socialIconsRow}>
                  {footerData.socialLinks.map((socialLink: any, index: number) => {
                    const icon = getSocialIcon(socialLink.platform);
                    if (!icon) return null;
                    return (
                      <Animated.View
                        key={socialLink._id || index}
                        style={{ transform: [{ scale: socialScaleAnim }] }}
                      >
                        <TouchableOpacity
                          style={styles.socialIconCircle}
                          onPress={() => Linking.openURL(socialLink.url)}
                        >
                          {icon}
                        </TouchableOpacity>
                      </Animated.View>
                    );
                  })}
                </View>
              )}
            </View>
          </LinearGradient>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    flexDirection: "row",
  },
  overlayTouchable: { flex: 1 },
  sidebarContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 335,
    backgroundColor: "white",
  },
  sidebar: {
    width: 335,
    height: "100%",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: "flex-start",
  },
  logoContainer: { marginTop: 20, marginHorizontal: 20, marginBottom: 10 },
  logo: { resizeMode: "contain" },
  menuList: { flex: 1, paddingHorizontal: 18 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 14,
    borderRadius: 8,
  },
  menuIcon: { width: 24, height: 24, justifyContent: "center", alignItems: "center" },
  menuLabel: {
    color: "rgba(0,0,0,1)",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "DMSans-medium",
  },
  socialSection: { marginBottom: 18, paddingHorizontal: 18 },
  appVersion: {
    fontSize: 12,
    color: "rgba(0,0,0,1)",
    fontWeight: "500",
    marginBottom: 10,
    fontFamily: "DMSans-medium",
  },
  separator: { height: 1, backgroundColor: "rgba(0,0,0,0.1)", marginBottom: 20 },
  socialIconsRow: { flexDirection: "row", gap: 16, flexWrap: "wrap" },
  socialIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: { width: 20, height: 20, resizeMode: "contain" },
});

export default SidebarModal;
