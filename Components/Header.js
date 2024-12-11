import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { Caveat_400Regular } from "@expo-google-fonts/caveat";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";
import { Slangs } from "../data"; // Import the slangs data

export default function Header() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Caveat_400Regular,
  });

  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filteredSlangs, setFilteredSlangs] = useState([]); // Initially empty list

  // Handle search functionality
  const handleSearch = (text) => {
    setSearchTerm(text); // Update search term
    if (text.trim() === "") {
      setFilteredSlangs([]); // Clear the list if input is empty
    } else {
      const filtered = Slangs.filter((slang) =>
        slang.slang.toLowerCase().includes(text.toLowerCase()) ||
        slang.meaning.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSlangs(filtered); // Update filtered results
    }
  };

  // Function to highlight the matching text
  const getHighlightedText = (text, searchTerm) => {
    if (!searchTerm.trim()) {
      return <Text style={styles.normalText}>{text}</Text>;
    }

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi")); // Split the text into parts
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <Text key={index} style={styles.highlightedText}>
          {part}
        </Text>
      ) : (
        <Text key={index} style={styles.normalText}>
          {part}
        </Text>
      )
    );
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#008BFF" />;
  }

  return (
    <View style={styles.header}>
      {/* Top Section */}
      <View style={styles.headerTop}>
        <Text style={styles.greetingText}>Hi, Pidgin lover 👋</Text>
        <Icon name="bell-o" size={18} color="#000" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Image
          style={styles.searchIcon}
          source={require("../assets/Vector 2.png")}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={handleSearch} // Handle search input
        />
      </View>

      {/* Display only if there's a search term */}
      {searchTerm.trim() !== "" && (
        <FlatList
          data={filteredSlangs} // Filtered list of slangs
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {/* Highlighted Slang */}
              <Text style={styles.slang}>
                {getHighlightedText(item.slang, searchTerm)}
              </Text>
              {/* Highlighted Meaning */}
              <Text style={styles.meaning}>
                {getHighlightedText(item.meaning, searchTerm)}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.noResultsText}>No results found</Text>
          )}
        />
      )}
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
  itemContainer: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  slang: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  meaning: {
    fontSize: 14,
    color: "#008bff",
    paddingTop: 10,
  },
  noResultsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  normalText: {
    color: "#000",
  },
  highlightedText: {
    color: "#008bff", // Highlight color (you can change this)
    fontWeight: "bold",
  },
});
