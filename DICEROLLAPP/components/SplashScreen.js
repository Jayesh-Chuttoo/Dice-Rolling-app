// General Imports
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import splashImage from "../assets/splash.png";

// Define the SplashScreen functional component
const SplashScreen = () => {
  // Create a useRef for the rotation animation
  const rotation = useRef(new Animated.Value(0)).current;

  // Set up the useEffect hook to configure and start the rotation animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear, // Use linear easing for a constant rotation speed
        useNativeDriver: false, // Set to false if running on Android
      })
    ).start();
  }, [rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Render the component with animations
  return (
    <View style={styles.container}>
      <Animated.Image
        source={splashImage}
        style={[styles.image, { transform: [{ rotate }] }]}
      />
    </View>
  );
};

// Define styles for the SplashScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Set your desired background color
  },
  image: {
    width: 900,
    height: 900,
    resizeMode: "contain",
  },
});

// Export the SplashScreen component
export default SplashScreen;
