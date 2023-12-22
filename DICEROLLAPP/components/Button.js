// AutoRoll.js
import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const Button = ({ dedicatedFunction, name }) => {
  return (
    <TouchableOpacity onPress={dedicatedFunction} style={styles.button}>
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
    margin: 10,
    backgroundColor: "aqua",
    fontSize: 20,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});

export default Button;
