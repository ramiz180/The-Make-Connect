import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CustomerHome() {
  const navigation = useNavigation();

  const categories = [
    { id: 1, name: "Electrician", icon: "zap" },
    { id: 2, name: "Plumber", icon: "tool" },
    { id: 3, name: "Carpenter", icon: "home" },
    { id: 4, name: "Beautician", icon: "scissors" },
    { id: 5, name: "Painter", icon: "brush" },
    { id: 6, name: "Mechanic", icon: "settings" },
  ];

  const workers = [
    {
      id: "1",
      name: "Amit Electricals",
      distance: "1.2 km",
      rating: 4.8,
      price: "₹150",
      photo:
        "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
    },
    {
      id: "2",
      name: "Suresh Plumbing",
      distance: "2.1 km",
      rating: 4.6,
      price: "₹200",
      photo:
        "https://cdn-icons-png.flaticon.com/512/679/679922.png",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* -------- SEARCH BAR -------- */}
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search for workers, skills..."
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
      </View>

      {/* -------- CATEGORIES -------- */}
      <Text style={styles.sectionTitle}>Categories</Text>

      <View style={styles.grid}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.categoryCard}
            onPress={() => navigation.navigate("WorkerList", { category: cat.name })}
          >
            <View style={styles.iconCircle}>
              <Feather name={cat.icon} size={26} color="#00D786" />
            </View>
            <Text style={styles.catLabel}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* -------- QUICK FILTERS -------- */}
      <Text style={styles.sectionTitle}>Quick Filters</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filtersRow}>
          {["Nearby", "Low Price", "Top Rated", "Experience"].map((f) => (
            <TouchableOpacity key={f} style={styles.filterBtn}>
              <Text style={styles.filterText}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* -------- NEARBY WORKERS -------- */}
      <Text style={styles.sectionTitle}>Nearby Workers</Text>

      <FlatList
        data={workers}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.workerCard}
            onPress={() => navigation.navigate("WorkerProfile", { workerId: item.id })}
          >
            <Image source={{ uri: item.photo }} style={styles.workerImg} />

            <View style={{ flex: 1 }}>
              <Text style={styles.workerName}>{item.name}</Text>
              <Text style={styles.workerSub}>{item.distance} away</Text>

              <View style={styles.row}>
                <Text style={styles.rating}>⭐ {item.rating}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>

            <Feather name="chevron-right" size={22} color="#777" />
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F15",
    padding: 20,
  },

  /* SEARCH BAR */
  searchBar: {
    backgroundColor: "#1A1F27",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 50,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "#fff",
  },

  /* TITLES */
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 10,
  },

  /* CATEGORIES GRID */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "30%",
    backgroundColor: "#111",
    borderRadius: 14,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 15,
  },
  iconCircle: {
    backgroundColor: "#1A1F27",
    padding: 18,
    borderRadius: 50,
    marginBottom: 8,
  },
  catLabel: {
    color: "#fff",
    marginTop: 5,
    fontSize: 14,
  },

  /* QUICK FILTERS */
  filtersRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  filterBtn: {
    backgroundColor: "#1A1F27",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterText: {
    color: "#aaa",
  },

  /* WORKERS LIST */
  workerCard: {
    backgroundColor: "#111",
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: "center",
  },
  workerImg: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 12,
  },
  workerName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  workerSub: {
    color: "#aaa",
    fontSize: 12,
    marginVertical: 3,
  },
  row: {
    flexDirection: "row",
    marginTop: 3,
  },
  rating: {
    color: "#00D786",
    marginRight: 10,
  },
  price: {
    color: "#fff",
    fontWeight: "600",
  },
});
