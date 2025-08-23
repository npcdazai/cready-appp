import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import apiClient, { FAQ } from "./utils/apiClient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FAQs() {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await apiClient.getAllFAQs();
      if (response.success && response.data) {
        console.log(response.data);
        setFaqs(response.data);
      } else {
        Alert.alert("Error", response.message || "Failed to load FAQs");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.menuIcon}
        >
          <Image source={require("../assets/images/backIocn.png")} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQs</Text>
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
      {/* FAQ List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading FAQs...</Text>
          </View>
        ) : filteredFAQs.length === 0 ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>No FAQs found</Text>
          </View>
        ) : (
          filteredFAQs.map((faq, idx) => {
            const isExpanded = idx === expandedIndex;
            return (
              <View style={styles.faqCard} key={faq.id}>
                <TouchableOpacity
                  style={styles.faqRow}
                  activeOpacity={0.8}
                  onPress={() => setExpandedIndex(isExpanded ? -1 : idx)}
                >
                  <Text style={styles.faqNumber}>{idx + 1}.</Text>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Image
                    source={
                      isExpanded
                        ? require("../assets/images/chevron-down.png")
                        : require("../assets/images/chevron-right.png")
                    }
                    style={styles.chevronIcon}
                  />
                </TouchableOpacity>
                {isExpanded && (
                  <View style={styles.answerBox}>
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: "rgba(249, 249, 249, 1)",
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  faqCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  faqRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  faqNumber: {
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "500",
    fontSize: 14,
    marginRight: 8,
    fontFamily: "DMSans-Medium",
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    color: "#111",
    fontWeight: "700",
    fontFamily: "DMSans-Bold",
  },
  chevronIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
    tintColor: "#888",
  },
  answerBox: {
    backgroundColor: "rgba(251, 248, 255, 1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(98, 50, 255, 0.2)",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "DMSans-Medium",
    lineHeight: 22,
    fontWeight: "300",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
    fontFamily: "DMSans-Regular",
  },
});
