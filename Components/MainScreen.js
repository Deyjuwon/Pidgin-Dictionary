import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the Main Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
});
