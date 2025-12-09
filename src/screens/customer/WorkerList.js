import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function WorkerList({ navigation }) {
  const [sortBy, setSortBy] = useState("nearby");

  const workers = [
    {
      id: 1,
      name: "Alex Johnson",
      skill: "Master Plumber",
      distance: "1.3 km away",
      rating: 4.9,
      avatarColor: "#4A90E2",
    },
    {
      id: 2,
      name: "Michael Lee",
      skill: "Residential Plumber",
      distance: "1.8 km away",
      rating: 4.8,
      avatarColor: "#50E3C2",
    },
    {
      id: 3,
      name: "Samantha Bee",
      skill: "Commercial Plumber",
      distance: "2.1 km away",
      rating: 4.7,
      avatarColor: "#F5A623",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Top header */}
      <View style={styles.headerRow}>
        <Ionicons
          name="chevron-back"
          size={26}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Plumbers</Text>
        <Ionicons name="search" size={22} color="#fff" />
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="filter" size={14} color="#fff" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Price</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Rating</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.filterBtn, styles.activeFilter]}>
          <Text style={styles.activeFilterText}>Nearby</Text>
        </TouchableOpacity>
      </View>

      {/* Workers List */}
      <FlatList
        data={workers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              {/* Avatar Placeholder */}
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: item.avatarColor || "#555" },
                ]}
              >
                <Ionicons name="person" size={28} color="#fff" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.skill}>{item.skill}</Text>
                <Text style={styles.distance}>{item.distance}</Text>
              </View>

              <View style={styles.ratingBox}>
                <Ionicons name="star" size={14} color="#fff" />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.bookBtn}
                onPress={() =>
                  navigation.navigate("WorkerProfile", { worker: item })
                }
              >
                <Text style={styles.bookText}>Book</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.chatBtn}
                onPress={() => navigation.navigate("Messages")}
              >
                <Text style={styles.chatText}>Chat</Text>
              </TouchableOpacity>

            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    paddingHorizontal: 16,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 45,
    marginBottom: 20,
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },

  filterRow: {
    flexDirection: "row",
    marginBottom: 15,
  },

  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#2A2A2A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
  },

  filterText: {
    color: "#fff",
    fontSize: 13,
    marginLeft: 3,
  },

  activeFilter: {
    backgroundColor: "#0DE47F",
  },

  activeFilterText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 13,
  },

  card: {
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  skill: {
    color: "#B5B5B5",
    marginTop: 2,
  },

  distance: {
    color: "#0DE47F",
    marginTop: 4,
    fontWeight: "600",
  },

  ratingBox: {
    flexDirection: "row",
    backgroundColor: "#333",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    height: 24,
    alignItems: "center",
  },

  rating: {
    color: "#fff",
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "700",
  },

  btnRow: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
  },

  bookBtn: {
    backgroundColor: "#0DE47F",
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 14,
  },

  bookText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 14,
  },

  chatBtn: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 14,
  },

  chatText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
