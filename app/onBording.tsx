import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    key: "1",
    image: require("../assets/images/onBordingImage.png"),
    color: "#00CFFF",
    title: "Now the Sundays are ours again.",
    description: "”a loan gave us space to build memories that matter”",
    bgColor: "rgba(31, 225, 233, 0.5)",
  },
  {
    key: "2",
    image: require("../assets/images/onBordingImage2.png"),
    color: "#C6FF00",
    title: "Our Goa trip didn’t just happen.",
    description: "”it was earned and funded with love”",
    bgColor: "rgba(166, 255, 0, 0.4)",

  },
  {
    key: "3",
    image: require("../assets/images/onBordingImage3.png"),
    color: "#E0B3FF",
    title: "We skipped the chaos, not the moments",
    description: "”that loan gave us peace, presence, and a plan”",
    bgColor: "rgba(196, 181, 253, 1)",

  },
];

export default function OnBording() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  const onViewRef = useRef((info: { viewableItems: ViewToken[] }) => {
    if (info.viewableItems.length > 0) {
      const idx = info.viewableItems[0].index;
      setCurrentIndex(typeof idx === "number" ? idx : 0);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  // Auto carousel functionality
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % slides.length;
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          return nextIndex;
        });
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying]);

  // Pause auto carousel when user interacts
  const handleScrollBeginDrag = () => {
    setIsAutoPlaying(false);
  };

  const handleScrollEndDrag = () => {
    // Resume auto carousel after 2 seconds of no interaction
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View>

    
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        renderItem={({ item }) => (
          <View style={[styles.slide]}>
            <Image source={item.image} style={{ width: width , opacity:0.8}} />
            <View
              style={{
                position: "absolute",
                backgroundColor: item.bgColor,
                width: width,
                top: 0,
                height: "100%",
                opacity:0.5
              }}
            />
                 <View
              style={{
                position: "absolute",
                backgroundColor: item.color,
                width: width,
                bottom: 0,
                height:1
              }}
            />
            <View style={styles.textContainer}>
              <Image source={require("../assets/images/miniIcon.png")}  />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={[styles.quote, { color: item.color }]}>
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />
        </View>
      <View style={styles.bottomBar}>
        <View style={styles.dotsContainer}>
          {slides.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    currentIndex === idx ? slides[idx].color : "#444",
                },
                currentIndex === idx && styles.activeDot,
              ]}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.push("/welcome")}
        >
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2C36",
  },
  slide: {
    height: "100%",
    alignItems: "center",
  },
  image: {},

  textContainer: {
    position: "absolute",
    top: 300,
    left: 25,
    right: 40,
    gap: 20,
    width:"60%",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "500",
    fontFamily: "DMSans-Regular",
  },
  quote: {
    fontSize: 24,
    fontWeight: "500",
    fontFamily: "DMSans-Regular",
  },
  bottomBar: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#444",
    marginHorizontal: 4,
  },
  activeDot: {
    // backgroundColor: "#fff",
  },
  skipButton: {},
  skipText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "DMSans-Regular",
  },
});
