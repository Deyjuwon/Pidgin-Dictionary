import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

// IMPORT FONTS
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { Caveat_700Bold } from "@expo-google-fonts/caveat";
import { useFonts } from "expo-font";

export default function SplashScreen() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Caveat_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#008BFF" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pidgin</Text>
      <Text style={styles.subtitle}>Your favourite Nigerian</Text>
      <Text style={styles.subtitle}>Pidgin library</Text>
    </View>
  );
}

//STYLING
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 58,
    fontWeight: "bold",
    color: "#008BFF",
    marginBottom: 20,
    fontFamily: "Caveat_700Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#545353",
    fontWeight: "400",
    fontFamily: "Inter_400Regular",
    lineHeight: 24,
  },
});
