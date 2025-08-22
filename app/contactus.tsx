import { router } from "expo-router";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ContactUs() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.menuIcon}>
          <Image source={require("../assets/images/backIocn.png")} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact us</Text>
      </View>
      {/* Divider */}
      <View style={styles.divider}>
        <Image
          source={require("../assets/images/contactUs.png")}
          style={styles.backgroundImage}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.descriptionText}>
            If you have any questions or feedback, feel free to reach out to us
            at
          </Text>
          <Text
            style={styles.emailText}
            onPress={() => {
              Linking.openURL("mailto:support@cready.in");
            }}
          >
            support@cready.in
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "rgba(249, 249, 249, 1)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(234, 236, 240, 1)",
    zIndex:9999
  },
  menuIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  headerTitle: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "DMSans-Bold",
    marginLeft: 10,
  },
  divider: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    position: "absolute",
    top: -75,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "DMSans-Regular",
    width: "80%",
    textAlign: "center",
  },
  emailText: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(98, 50, 255, 1)",
    fontFamily: "DMSans-Medium",
    textAlign: "center",
  },
});
