import messaging from '@react-native-firebase/messaging';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SidebarModal from "../components/SidebarModal";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    
    await messaging().registerDeviceForRemoteMessages();
    token = await messaging().getToken();
    console.log("FCM Token:", token);

  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

export default function Notification() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notificationListener = useRef<Notifications.Subscription | undefined>(undefined);
  const responseListener = useRef<Notifications.Subscription | undefined>(undefined);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token ?? ''));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      const newNotification: Notification = {
        id: notification.request.identifier,
        title: notification.request.content.title ?? 'No Title',
        description: notification.request.content.body ?? 'No Body',
        time: new Date().toLocaleTimeString(),
        isRead: false,
      };
      setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View
          style={{
            backgroundColor: "rgba(234, 236, 240, 1)",
            height: 1,
            width: "100%",
          }}
        />
        
        <View style={styles.notificationContainer}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          { notifications.length > 0 ? notifications.map((notification) => (
            <TouchableOpacity 
              key={notification.id} 
              style={[
                styles.notificationCard,
                !notification.isRead && styles.unreadNotification
              ]}
            >
              <View style={styles.notificationContent}>
                <View style={styles.notificationText}>
                  <Text style={[
                    styles.notificationTitle,
                    !notification.isRead && styles.unreadTitle
                  ]}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationDescription}>
                    {notification.description}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {notification.time}
                  </Text>
                </View>
                
                {!notification.isRead && (
                  <View style={styles.unreadDot} />
                )}
              </View>
            </TouchableOpacity>
          ))
        :

        <View style={{justifyContent:"center",alignItems:"center", height:"100%"}}>
        
        <Text>No notifications</Text>
        </View>
        }
        </View>
      </ScrollView>
    </View>
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
  notificationContainer: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 50,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "DMSans-Bold",
    color: "rgba(0, 0, 0, 1)",
    marginLeft: 20,
    marginBottom: 16,
  },
  notificationCard: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(234, 236, 240, 1)",
  },
  unreadNotification: {
    backgroundColor: "rgba(98, 50, 255, 0.02)",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(98, 50, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    width: 20,
    height: 20,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "DMSans-Medium",
    color: "rgba(0, 0, 0, 1)",
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: "600",
    fontFamily: "DMSans-Bold",
  },
  notificationDescription: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    color: "rgba(112, 112, 112, 1)",
    marginBottom: 6,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: "DMSans-Regular",
    color: "rgba(156, 156, 156, 1)",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(98, 50, 255, 1)",
    marginLeft: 8,
    marginTop: 4,
  },
});
