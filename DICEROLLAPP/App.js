// General Imports
import React, { useCallback, useEffect, useState } from "react";
import {
  StatusBar,
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";

// Images imports
import die1 from "./assets/diceImages/die1.png";
import die2 from "./assets/diceImages/die2.png";
import die3 from "./assets/diceImages/die3.png";
import die4 from "./assets/diceImages/die4.png";
import die5 from "./assets/diceImages/die5.png";
import die6 from "./assets/diceImages/die6.png";
import backgroundImg from "./assets/backgroundImageDark.jpg";

// Component Imports
import SplashScreenComponent from "./components/SplashScreen";
import Button from "./components/Button";

// Component
export default function App() {
  // State variables
  const [firstDieScore, setFirstDieScore] = useState(1);
  const [secondDieScore, setSecondDieScore] = useState(6);
  const [showSplash, setShowSplash] = useState(true);
  const [clickCounter, setClickCounter] = useState(0);
  const [autoRolling, setAutoRolling] = useState(false);
  const [appIsReady, setAppIsReady] = useState(true);

  // Array of dice images
  const diceImages = [die1, die2, die3, die4, die5, die6];

  // useEffect used as a constructor to handle app initialization
  useEffect(() => {
    async function prepare() {
      try {
        // Optional: Load fonts or perform other initialization steps
        // await Font.loadAsync(Entypo.font);

        // Simulate a delay for a smoother transition
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.warn("Initialization error:", error);
      } finally {
        // Hide the splash screen and set the app as ready
        setShowSplash(false);
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    // Call the prepare function
    prepare();
  }, []);

  // Callback function to hide splash screen on layout change
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // Render loading screen if the app is not ready
  if (!appIsReady) {
    return null;
  }

  // Render splash screen component if it's still showing
  if (showSplash) {
    return <SplashScreenComponent />;
  }

  // Function to update dice state and check for goal reached
  const updateDiceState = () => {
    if (secondDieScore + firstDieScore !== 8) {
      const newFirstDieScore = Math.floor(Math.random() * 6) + 1;
      const newSecondDieScore = Math.floor(Math.random() * 6) + 1;

      setFirstDieScore(newFirstDieScore);
      setSecondDieScore(newSecondDieScore);
      setClickCounter((prevClickCounter) => prevClickCounter + 1);
      return newFirstDieScore + newSecondDieScore;
    } else {
      // Show alert if the goal is reached
      Alert.alert("Goal Reached", "You have reached the combined sum of 8.");
    }
  };

  // Function to roll the dice
  const rollDice = () => {
    updateDiceState();
  };

  // Function to reset dice scores
  const reset = () => {
    setFirstDieScore(1);
    setSecondDieScore(6);
    setClickCounter(0);
  };

  // Function to perform auto-roll
  const autoRoll = async () => {
    if (secondDieScore + firstDieScore !== 8) {
      if (!autoRolling) {
        setAutoRolling(true);
        await autoRollDice();
      } else {
        Alert.alert("Already Rolling", "Please wait....");
      }
    } else {
      Alert.alert("Goal Reached", "You have reached the combined sum of 8.");
    }
  };

  // Function for auto-rolling dice recursively
  const autoRollDice = async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const rollDiceRecursive = async () => {
      if (updateDiceState() === 8) {
        setAutoRolling(false);
        Alert.alert("Goal Reached", "Auto-roll stopped. Total reached 8.");
        return;
      }

      await delay(200);
      rollDiceRecursive();
    };

    rollDiceRecursive();
  };

  // Function to stop auto-roll
  const stop = () => {
    setAutoRolling(false);
  };

  // Main JSX content
  return (
    <ImageBackground
      source={backgroundImg}
      style={styles.backgroundImage}
      onLayout={onLayoutRootView}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={diceImages[firstDieScore - 1]} />
          <Image source={diceImages[secondDieScore - 1]} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>
            Total : {firstDieScore + secondDieScore}
          </Text>
          <Text style={styles.textStyle}>Roll Count : {clickCounter}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button dedicatedFunction={rollDice} name="Roll" />
          <Button dedicatedFunction={autoRoll} name="Auto Roll" />
          <Button dedicatedFunction={reset} name="Reset" />
          {/* <Button dedicatedFunction={stop} name="Stop" /> */}
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </ImageBackground>
  );
}

// Styles
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: 170,
  },
  textStyle: { padding: 10, color: "white", fontSize: 16, fontWeight: "bold" },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: 220,
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
