import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";

export default function WorkerList({ navigation }) {
  const [sortBy, setSortBy] = useState("nearby");

  const workers = [
    {
      id: 1,
      name: "Rahul Sharma",
      skill: "Electrician",
      exp: "3 yrs",
      distance: "1.2 km",
      price: "₹150",
      rating: 4.7,
    },
    {
      id: 2,
      name: "Amit Verma",
      skill: "Plumber",
      exp: "5 yrs",
      distance: "2.3 km",
      price: "₹200",
      rating: 4.5,
    },
  ];

  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.title}>Nearby Workers</Text>

      {/* Sort Buttons */}
      <View style={styles.sortRow}>
        {["Nearby", "Price", "Rating"].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setSortBy(item.toLowerCase())}
            style={[
              styles.sortBtn,
              sortBy === item.toLowerCase() && styles.sortBtnActive
            ]}
          >
            <Text
              style={[
                styles.sortText,
                sortBy === item.toLowerCase() && styles.sortTextActive
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Worker List */}
      <FlatList
        data={workers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.workerCard}
            onPress={() => navigation.navigate("WorkerProfile", { worker: item })}
          >
            <Image
              source={require("../../assets/images/user.png")}
              style={styles.workerImg}
            />



            <View style={{ flex: 1 }}>
              <Text style={styles.workerName}>{item.name}</Text>
              <Text style={styles.workerSkill}>
                {item.skill} • {item.exp}
              </Text>

              <View style={styles.rowBetween}>
                <Text style={styles.distance}>{item.distance}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>

            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },

  title: { fontSize: 20, fontWeight: "700", marginBottom: 16 },

  sortRow: { flexDirection: "row", marginBottom: 16 },
  sortBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 10,
  },
  sortBtnActive: { backgroundColor: "#007bff" },
  sortText: { color: "#333", fontSize: 14 },
  sortTextActive: { color: "#fff" },

  workerCard: {
    flexDirection: "row",
    padding: 14,
    backgroundColor: "#f8f8f8",
    borderRadius: 14,
    marginBottom: 14,
    alignItems: "center",
  },

  workerImg: { width: 55, height: 55, borderRadius: 27 },

  workerName: { fontSize: 16, fontWeight: "700" },
  workerSkill: { color: "#777" },

  rowBetween: { flexDirection: "row", justifyContent: "space-between" },

  distance: { color: "#007bff", marginTop: 6 },
  price: { fontWeight: "700", marginTop: 6 },

  ratingBadge: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 10,
  },
  ratingText: { color: "#fff", fontWeight: "700" },
});
