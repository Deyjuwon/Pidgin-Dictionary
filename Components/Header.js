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

// IMPORT FONTS
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { Caveat_400Regular } from "@expo-google-fonts/caveat";
import { useFonts } from "expo-font";

// IMPORT ICON
import Icon from "react-native-vector-icons/FontAwesome";

// DATA FETCH
import { Slangs } from "../data";

export default function Header() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Caveat_400Regular,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSlangs, setFilteredSlangs] = useState([]);

  // SEARCH FUNCTIONALITY
  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text.trim() === "") {
      setFilteredSlangs([]);
    } else {
      const filtered = Slangs.filter(
        (slang) =>
          slang.slang.toLowerCase().includes(text.toLowerCase()) ||
          slang.meaning.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSlangs(filtered);
    }
  };

  const getHighlightedText = (text, searchTerm) => {
    if (!searchTerm.trim()) {
      return <Text style={styles.normalText}>{text}</Text>;
    }

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
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
      <View style={styles.headerTop}>
        <Text style={styles.greetingText}>Hi, Pidgin lover 👋</Text>
        <Icon name="bell-o" size={18} color="#000" />
      </View>
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
          onChangeText={handleSearch}
        />
      </View>

      {/* SEARCH RESULT */}
      {searchTerm.trim() !== "" && (
        <FlatList
          data={filteredSlangs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.slang}>
                {getHighlightedText(item.slang, searchTerm)}
              </Text>
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

// STYLING
const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
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
    color: "#008bff",
    fontWeight: "bold",
  },
});
