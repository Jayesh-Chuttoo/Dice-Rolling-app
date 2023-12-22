// General Imports
import React, { useState, useEffect } from "react";
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

// Image import
import die1 from "./assets/diceImages/die1.png";
import die2 from "./assets/diceImages/die2.png";
import die3 from "./assets/diceImages/die3.png";
import die4 from "./assets/diceImages/die4.png";
import die5 from "./assets/diceImages/die5.png";
import die6 from "./assets/diceImages/die6.png";
import Button from "./components/Button";
import backgroundImg from "./assets/backgroundImageDark.jpg";

export default function App() {
  const [firstDieScore, setFirstDieScore] = useState(1);
  const [secondDieScore, setSecondDieScore] = useState(6);
  const [clickCounter, setClickCounter] = useState(0);
  const [autoRolling, setAutoRolling] = useState(false);
  const diceImages = [die1, die2, die3, die4, die5, die6];

  // Roll Dice function
  const rollDice = () => {
    if (secondDieScore + firstDieScore !== 8) {
      const newFirstDieScore = Math.floor(Math.random() * 6) + 1;
      const newSecondDieScore = Math.floor(Math.random() * 6) + 1;

      setFirstDieScore(newFirstDieScore);
      setSecondDieScore(newSecondDieScore);
      setClickCounter((prevClickCounter) => prevClickCounter + 1);
    } else {
      Alert.alert("Goal Reached", "You have reached the combined sum of 8.");
    }
  };

  // Reset function
  const reset = () => {
    setFirstDieScore(1);
    setSecondDieScore(6);
    setClickCounter(0);
  };

  // Autoroll function
  const autoRoll = () => {
    if (secondDieScore + firstDieScore !== 8) {
      if (!autoRolling) {
        setAutoRolling(true);
      } else {
        Alert.alert("Already Rolling", "Please wait....");
      }
    } else {
      Alert.alert("Goal Reached", "You have reached the combined sum of 8.");
    }
  };

  // Autoroll useEffect hooked with autoRolling state
  useEffect(() => {
    if (autoRolling) {
      let intervalId = setInterval(() => {
        const newFirstDieScore = Math.floor(Math.random() * 6) + 1;
        const newSecondDieScore = Math.floor(Math.random() * 6) + 1;

        setFirstDieScore(newFirstDieScore);
        setSecondDieScore(newSecondDieScore);
        setClickCounter((prevClickCounter) => prevClickCounter + 1);

        if (newFirstDieScore + newSecondDieScore === 8) {
          clearInterval(intervalId);
          setAutoRolling(false);
          Alert.alert("Goal Reached", "Auto-roll stopped. Total reached 8.");
        }
      }, 200);

      return () => clearInterval(intervalId);
    }
  }, [autoRolling]);

  // Stop Autoroll function
  const stop = () => {
    setAutoRolling(false);
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
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

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "black",
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
