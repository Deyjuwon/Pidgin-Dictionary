import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { Caveat_400Regular } from '@expo-google-fonts/caveat';
import { useFonts } from 'expo-font'; 

export default function SplashScreen() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Caveat_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#008BFF" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comot</Text>
      <Text style={styles.subtitle}>Your favourite Nigerian</Text>
      <Text style={styles.subtitle}>Pidgin library</Text>
      <ActivityIndicator size="large" color="#008BFF" />
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
    fontSize: 64,
    fontWeight: "bold",
    color: "#008BFF",
    marginBottom: 20,
    fontFamily: 'Caveat_400Regular',
  },
  subtitle: {
    fontSize: 16,
    color: "#545353",
    fontWeight: '400',
    fontFamily: 'Inter_400Regular',
  },
});
