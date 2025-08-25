import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import React, { useRef, useEffect } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { API_CONFIG } from "../config/api";

interface CustomTabProps extends BottomTabBarProps {}

const CustomTabBar: React.FC<CustomTabProps> = ({ state, navigation }) => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <View style={styles.tabWrapper}>
      <ImageBackground
        source={require("../../assets/images/customTabBg.png")}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.48,
          shadowRadius: 11.95,
          elevation: 18,
          height: 155,
        }}
      >
        <View style={styles.container}>
          <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
              const isFocused = state.index === index;
              const scaleAnim = useRef(
                new Animated.Value(isFocused ? 1.1 : 1)
              ).current;
              const opacityAnim = useRef(
                new Animated.Value(isFocused ? 1 : 0.5)
              ).current;

              useEffect(() => {
                Animated.parallel([
                  Animated.spring(scaleAnim, {
                    toValue: isFocused ? 1.15 : 1,
                    friction: 5,
                    useNativeDriver: true,
                  }),
                  Animated.timing(opacityAnim, {
                    toValue: isFocused ? 1 : 0.5,
                    duration: 250,
                    useNativeDriver: true,
                  }),
                ]).start();
              }, [isFocused]);

              const icon = (() => {
                switch (route.name) {
                  case "dashboard":
                    return require("../../assets/images/DashboardIcon.png");
                  case "offers":
                    return require("../../assets/images/OffersIcon.png");
                  case "emiCalculator":
                    return require("../../assets/images/EMICalculator.png");
                  case "notification":
                    return require("../../assets/images/notifciation.png");
                  case "profile":
                    return user?.profileImage
                      ? { uri: API_CONFIG.BASE_URL + user?.profileImage }
                      : require("../../assets/images/ProfileIcon.png");
                  default:
                    return require("../../assets/images/DashboardIcon.png");
                }
              })();

              const onPress = () => {
                if (!isFocused) {
                  if (route.name === "offers") {
                    router.push("/offers");
                  } else {
                    navigation.navigate(route.name);
                  }
                }
              };

              return (
                <TouchableWithoutFeedback key={route.name} onPress={onPress}>
                  <Animated.View
                    style={[
                      styles.iconContainer,
                      {
                        transform: [{ scale: scaleAnim }],
                        opacity: opacityAnim,
                      },
                    ]}
                  >
                    {route.name === "emiCalculator" ? (
                      <Image source={icon} style={{ bottom: 20, left: 20 }} />
                    ) : route.name === "profile" ? (
                      <>
                        {!user?.profileImage ? (
                          <Ionicons
                            name="person-circle"
                            size={26}
                            color={
                              isFocused ? "rgba(98, 50, 255, 1)" : "#AEA8B3"
                            }
                          />
                        ) : (
                          <Image
                            source={{
                              uri: API_CONFIG.BASE_URL + user.profileImage,
                            }}
                            style={{
                              height: 25,
                              width: 25,
                              borderRadius: 25,
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <Image
                        source={icon}
                        style={[
                          styles.icon,
                          route.name === "emiCalculator"
                            ? { bottom: 30 }
                            : null,
                        ]}
                        tintColor={
                          isFocused || route.name === "emiCalculator"
                            ? "rgba(98, 50, 255, 1)"
                            : "#AEA8B3"
                        }
                      />
                    )}
                    <Text
                      style={[
                        styles.tabText,
                        {
                          color:
                            isFocused || route.name === "emiCalculator"
                              ? "rgba(98, 50, 255, 1)"
                              : "gray",
                        },
                      ]}
                    >
                      {route.name === "dashboard"
                        ? "Home"
                        : route.name === "offers"
                        ? "Offers"
                        : route.name === "emiCalculator"
                        ? ""
                        : route.name === "notification"
                        ? "Notifications"
                        : "Profile"}
                    </Text>
                  </Animated.View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    opacity: 1,
  },
  inactiveIcon: {
    opacity: 0.5,
  },
  tabText: {
    fontWeight: "500",
    fontSize: 12,
    fontFamily: "DMSans-Medium",
    color: "rgba(98, 50, 255, 1)",
    marginTop: 4,
    textAlign: "center",
  },
  activeLine: {
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: 20,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 4,
  },
});
