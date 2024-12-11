import React from "react";
import { StyleSheet, SafeAreaView, SectionList, Text, View } from "react-native";
import Header from "./Header";
import { Slangs } from "../data";


// Grouping Slangs by First Letter
const groupSlangsByLetter = (slangs) => {
  return slangs.reduce((acc, item) => {
    const firstLetter = item.slang[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {});
};

export default function MainScreen() {
  const groupedSlangs = groupSlangsByLetter(Slangs);

  // Convert grouped data into SectionList format
  const sections = Object.keys(groupedSlangs)
    .sort() // Sort alphabetically
    .map((key) => ({
      title: key,
      data: groupedSlangs[key],
    }));

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SectionList
        sections={sections}
        style={styles.mainContainer}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.slang}>{item.slang}</Text>
            <Text style={styles.meaning}>{item.meaning}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  sectionHeader: {
    fontSize: 32,
    paddingHorizontal: 25,
    paddingVertical: 10,
    color: "#333",
    fontStyle: "italic",
    textAlign: "right",
    width: "100%",
    backgroundColor: "#fff",
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
});
