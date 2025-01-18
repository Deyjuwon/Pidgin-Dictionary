import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  SectionList,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Header from "./Header";
import { Slangs } from "../data";

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// DATA GROUPING
const groupSlangsByLetter = (slangs) => {
  if (!slangs || !Array.isArray(slangs)) return {};
  return slangs.reduce((acc, item) => {
    const firstLetter = item.slang[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);

    // Sort the array alphabetically
    acc[firstLetter].sort((a, b) => a.slang.localeCompare(b.slang));
    return acc;
  }, {});
};

export default function MainScreen() {
  const [expandedId, setExpandedId] = useState(null);

  const groupedSlangs = groupSlangsByLetter(Slangs);

  // ARRAY SORTING
  const sections = Object.keys(groupedSlangs)
    .sort()
    .map((key) => ({
      title: key,
      data: groupedSlangs[key],
    }));

  const toggleMeaning = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SectionList
        sections={sections}
        style={styles.mainContainer}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleMeaning(item.id)}>
              <Text style={styles.slang}>{item.slang}</Text>
            </TouchableOpacity>

            {/* DROPDOWN */}
            {expandedId === item.id && (
              <Text style={styles.meaning}>{item.meaning}</Text>
            )}
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
}

// STYLING
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  sectionHeader: {
    fontSize: 28,
    paddingHorizontal: 20,
    paddingVertical: 8,
    color: "#555",
    fontStyle: "italic",
    textAlign: "left",
    backgroundColor: "#eef2f3",
  },
  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  slang: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  meaning: {
    fontSize: 16,
    color: "#007bff",
    paddingTop: 5,
    paddingLeft: 15,
  },
});
