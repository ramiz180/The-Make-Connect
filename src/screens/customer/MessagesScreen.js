import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MessagesScreen({ navigation }) {
  const messages = [
    {
      id: 1,
      name: "Alex Johnson",
      skill: "Master Plumber",
      message: "Awesome, I’ll be there in 15 minutes!",
      time: "10:45 AM",
      color: "#4A90E2",
    },
    {
      id: 2,
      name: "Michael Lee",
      skill: "Residential Plumber",
      message: "Can you please confirm your address?",
      time: "Yesterday",
      color: "#50E3C2",
    },
    {
      id: 3,
      name: "Samantha Bee",
      skill: "Certified Plumber",
      message: "You: Great, thank you!",
      time: "2d ago",
      color: "#F5A623",
    },
    {
      id: 4,
      name: "David Smith",
      skill: "Drainage Specialist",
      message: "Okay, see you tomorrow at 10 AM.",
      time: "1w ago",
      color: "#E8505B",
    },
    {
      id: 5,
      name: "James Rodriguez",
      skill: "Commercial Plumber",
      message: "You: The booking has been confirmed.",
      time: "3/12/24",
      color: "#9B51E0",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Ionicons
          name="chevron-back"
          size={26}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Messages</Text>
        <Ionicons name="search" size={22} color="#fff" />
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              {/* Avatar */}
              <View style={[styles.avatar, { backgroundColor: item.color }]}>
                <Ionicons name="person" size={28} color="#fff" />
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>

                <Text style={styles.skill}>{item.skill}</Text>
                <Text style={styles.message} numberOfLines={1}>
                  {item.message}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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

  card: {
    backgroundColor: "#1A1A1A",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
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
  },

  message: {
    color: "#D0D0D0",
    marginTop: 4,
  },

  time: {
    color: "#8A8A8A",
    fontSize: 12,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
