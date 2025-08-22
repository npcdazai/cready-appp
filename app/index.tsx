import { ResizeMode, Video } from "expo-av";
import { router } from "expo-router";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

export default function Index() {
  const videoRef = useRef<Video>(null);
  const { user } = useSelector((state: any) => state.auth);


  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded && status.didJustFinish) {
      if (!user) {
        router.replace("/onBording");
      } else if (!user?.loanAmount) {
        router.replace("/loanSeeking");
      } else if (!user?.firstName) {
        router.replace("/personalDetails");
      } else if (!user?.dateOfBirth) {
        router.replace("/kyc");
      } else {
        router.replace("/dashboard");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require("../assets/images/splashVideo.mp4")}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay={true}
        isLooping={false}
        isMuted={true}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  video: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
