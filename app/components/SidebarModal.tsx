import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
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
import { useFooter } from "../context/FooterContex"; // Keep original import path

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
    Image: (
      <Image source={require("../../assets/images/LendingPartners.png")} />
    ),
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
        console.error('Error sharing:', error);
      }
    },
  },
  {
    Image: <Image source={require("../../assets/images/RateusIcon.png")} />,
    label: "Rate us",
    onPress: async () => {
      try {
        const url = Platform.OS === "ios"
          ? "https://apps.apple.com/us/app/creedy-cash-loan/id6744444444"
          : "https://play.google.com/store/apps/details?id=com.creedy.app";
        
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
          await Linking.openURL(url);
        }
      } catch (error) {
        console.error('Error opening store link:', error);
      }
    },
  },
  {
    Image: (
      <Image source={require("../../assets/images/PrivacypolicyIcon.png")} />
    ),
    label: "Privacy policy",
    onPress: () => router.push("/privacypolicy"),
  },
  {
    Image: (
      <Image source={require("../../assets/images/PrivacypolicyIcon.png")} />
    ),
    label: "Terms & Conditions",
    onPress: () => router.push("/termsconditions"),
  },
  {
    Image: <Image source={require("../../assets/images/ContactusIcon.png")} />,
    label: "Contact us",
    onPress: () => router.push("/contactus"),
  },
];

// Social platform to icon mapping
const getSocialIcon = (platform: string): React.ReactElement | null => {
  const platformLower = platform.toLowerCase();
  
  switch (platformLower) {
    case 'facebook':
      return <Image source={require("../../assets/images/fbIcon.png")} style={styles.socialIcon} />;
    case 'x':
    case 'twitter':
      return <Image source={require("../../assets/images/xIcon.png")} style={styles.socialIcon} />;
    case 'instagram':
      return <Image source={require("../../assets/images/insta.png")} style={styles.socialIcon} />;
    case 'youtube':
      return <Image source={require("../../assets/images/ytIcon.png")} style={styles.socialIcon} />;
    case 'linkedin':
      return <Image source={require("../../assets/images/linkdeenIcon.png")} style={styles.socialIcon} />;
    case 'whatsapp':
      return <Image source={require("../../assets/images/whatsapp.png")} style={styles.socialIcon} />;
    default:
      return null;
  }
};

const SidebarModal: React.FC<SidebarModalProps> = ({ visible, onClose }) => {
  const { footerData, loading } = useFooter();

  const handleSocialLinkPress = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening social link:', error);
    }
  };

  const handleMenuItemPress = async (item: MenuItem) => {
    onClose();
    if (item.onPress) {
      await item.onPress();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          style={styles.sidebarContainer}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <LinearGradient
            colors={[
              "rgba(98, 50, 255, 0.2)",
              "rgba(255, 255, 255, 1)",
              "rgba(255, 255, 255, 1)",
            ]}
            start={{ x: 0.4, y: 1 }}
            end={{ x: 0.5, y: 0.2 }}
            style={styles.sidebar}
          >
            <View style={styles.logoContainer}>
              <Image 
                source={require("../../assets/images/drawerlogo.png")} 
                style={styles.logo}
              />
            </View>
            
            <View style={styles.menuList}>
              {menuItems.map((item: MenuItem, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.menuItem}
                  onPress={() => handleMenuItemPress(item)}
                >
                  <View style={styles.menuIcon}>
                    {item.Image}
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.socialSection}>
              <Text style={styles.appVersion}>App version 1.0.1</Text>
              <View style={styles.separator} />
              
              {!loading && footerData?.socialLinks && footerData.socialLinks.length > 0 && (
                <View style={styles.socialIconsRow}>
                  {footerData.socialLinks.map((socialLink: any, index: number) => {
                    const icon = getSocialIcon(socialLink.platform);
                    if (!icon) return null;
                    
                    return (
                      <TouchableOpacity 
                        key={socialLink._id || index}
                        style={styles.socialIconCircle}
                        onPress={() => handleSocialLinkPress(socialLink.url)}
                      >
                        {icon}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    flexDirection: "row",
  },
  sidebarContainer: {
    backgroundColor: "white",
  },
  sidebar: {
    width: 335,
    height: "100%",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: "flex-start",
  },
  logoContainer: {
    alignItems: "flex-start",
    marginBottom: 10,
    marginTop: 50,
    marginHorizontal: 20,
  },
  logo: {
    // Add specific dimensions if needed
    resizeMode: 'contain',
  },
  menuList: {
    flex: 1,
    paddingHorizontal: 18,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 2,
  },
  menuIcon: {
    // Container for menu icons to ensure consistent sizing
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "DMSans-medium",
  },
  socialSection: {
    marginBottom: 18,
    paddingHorizontal: 18,
  },
  appVersion: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 12,
    marginBottom: 10,
    fontWeight: "500",
    fontFamily: "DMSans-medium",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 20,
  },
  socialIconsRow: {
    flexDirection: "row",
    gap: 16,
    flexWrap: 'wrap',
  },
  socialIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});