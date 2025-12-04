import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";

export default function CustomerHome({ navigation }) {
  return (
    <ScrollView style={styles.container}>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search workers, services..."
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoryGrid}>
        {[
          "Electrician",
          "Plumber",
          "Painter",
          "Carpenter",
          "Beauty",
          "Appliance Repair"
        ].map((cat, index) => (
          <TouchableOpacity key={index} style={styles.categoryCard}>
            <Image
              source={require("../../assets/icons/category.png")}
              style={styles.categoryIcon}
            />


            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Filters */}
      <Text style={styles.sectionTitle}>Quick Filters</Text>
      <View style={styles.filterRow}>
        {["Nearby", "Low Price", "Verified", "Top Rated"].map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.filterChip}>
            <Text style={styles.filterText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Nearby Workers */}
      <Text style={styles.sectionTitle}>Nearby Workers</Text>

      <View style={styles.workerCard}>
        <Image
          source={require("../../assets/images/user.png")}
          style={styles.workerImg}
        />
        <View style={styles.workerInfo}>
          <Text style={styles.workerName}>Rahul Sharma</Text>
          <Text style={styles.workerSkill}>Electrician • 3 yrs exp</Text>
          <Text style={styles.workerDistance}>1.2 km away</Text>
        </View>
      </View>

      <View style={styles.workerCard}>
        <Image
          source={require("../../assets/images/user.png")}
          style={styles.workerImg}
        />
        <View style={styles.workerInfo}>
          <Text style={styles.workerName}>Amit Kumar</Text>
          <Text style={styles.workerSkill}>Plumber • 5 yrs exp</Text>
          <Text style={styles.workerDistance}>2.1 km away</Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },

  searchBox: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: { fontSize: 16, color: "#000" },

  sectionTitle: { fontSize: 18, fontWeight: "700", marginVertical: 12 },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "31%",
    backgroundColor: "#f9f9f9",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  categoryIcon: { width: 40, height: 40, marginBottom: 8 },
  categoryText: { fontSize: 14, fontWeight: "600" },

  filterRow: { flexDirection: "row", marginBottom: 10 },
  filterChip: {
    backgroundColor: "#e7f3ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 10,
  },
  filterText: { color: "#007bff" },

  workerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  workerImg: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  workerInfo: { flex: 1 },
  workerName: { fontSize: 16, fontWeight: "700" },
  workerSkill: { color: "#555" },
  workerDistance: { marginTop: 4, color: "#007bff", fontWeight: "600" },
});
