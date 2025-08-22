import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { API_CONFIG } from "./config/api";
import apiClient, { Partner } from "./utils/apiClient";

export default function LendingPartners() {
  const [search, setSearch] = useState("");
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageDimensions, setImageDimensions] = useState<{[key: string]: {width: number, height: number}}>({});

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await apiClient.getAllPartners();
      if (response.success && response.data) {
        setPartners(response.data);
      } else {
        Alert.alert("Error", response.message || "Failed to load partners");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderPartner = ({ item }: { item: any }) => {
    const imageUrl = API_CONFIG.BASE_URL + item.logoUrl;
    
    // Get image dimensions if not already cached
    if (!imageDimensions[imageUrl]) {
      Image.getSize(
        imageUrl,
        (width, height) => {
          setImageDimensions(prev => ({
            ...prev,
            [imageUrl]: { width, height }
          }));
        },
        (error) => {
          console.error("Failed to get image size:", error);
          // Set default dimensions on error
          setImageDimensions(prev => ({
            ...prev,
            [imageUrl]: { width: 110, height: 50 }
          }));
        }
      );
    }

    const dimensions = imageDimensions[imageUrl] || { width: 110, height: 50 };
    
    return (
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: imageUrl }} 
            style={[styles.logo, { width: dimensions.width, height: dimensions.height }]} 
            resizeMode="contain"
          />
        </View>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(item.websiteUrl)}
        >
          <Text style={styles.buttonText}>View site</Text>
        </TouchableOpacity> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.menuIcon}
        >
          <Image source={require("../assets/images/backIocn.png")} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lending Partners</Text>
      </View>
      {/* Search Bar */}
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBar}>
          <Image
            source={require("../assets/images/searchIcon.png")}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      {/* Partners Grid */}
      <FlatList
        data={filteredPartners}
        keyExtractor={(item) => item.name}
        renderItem={renderPartner}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
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
  searchBarWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "#888",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111",
    fontFamily: "DMSans-Regular",
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "rgba(250, 249, 255, 1)",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 0,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(98, 50, 255, 0.15)",
  },
  logoContainer: {
    width: "100%",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 16,
    backgroundColor: "white",
    borderWidth:1,
    borderColor:"rgba(98, 50, 255, 0.1)",
    borderRadius:10
  },
  logo: {
    // Dimensions are now handled dynamically in the component
  },
  button: {
    backgroundColor: "rgba(98, 50, 255, 1)",
    borderRadius: 8,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "DMSans-Bold",
  },
});
