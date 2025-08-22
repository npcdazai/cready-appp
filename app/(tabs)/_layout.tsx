import { Tabs } from "expo-router";
import React from "react";
import CustomTabBar from "../components/CustomTabBar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          title: "Offers",
        }}
      />
      <Tabs.Screen
        name="emiCalculator"
        options={{
          title: "EMI Calculator",
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
