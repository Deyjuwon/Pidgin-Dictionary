import React from "react";
import { StyleSheet, View, Text, TextInput, Image, ActivityIndicator  } from "react-native";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { Caveat_400Regular } from "@expo-google-fonts/caveat";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Header() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Caveat_400Regular,
        });

        if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#008BFF" />;
        }
    
  return (
    
    <View style={styles.header}>
      {/* Top Section */}
      <View style={styles.headerTop}>
        <Text style={styles.greetingText}>Hi, Pidgin lover 👋</Text>
        {/* <Image style={styles.bellIcon} source={require("../assets/Vector.png")} /> */}
        <Icon name="bell-o" size={18} color="#000" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Image style={styles.searchIcon} source={require("../assets/Vector 2.png")} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
          
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20, // Add padding for space below the status bar
    fontFamily: "Inter_400Regular", 
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#008BFF",
    fontFamily: "Caveat_400Regular",
  },
  bellIcon: {
    width: 18,
    height: 18,
    tintColor: "#000",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#008BFF1A",
    borderRadius: 50,
    paddingHorizontal: 25,
    borderWidth: 0,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 0,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 0,
    color: "#000",
  },
});
