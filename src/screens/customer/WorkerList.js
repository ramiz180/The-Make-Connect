import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function WorkerList({ navigation, route }) {
  const category = route?.params?.category;
  const title = category?.title || "Workers";

  const workers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Master Plumber",
      distance: "1.2 km away",
      rating: 4.9,
      avatar: { uri: "https://randomuser.me/api/portraits/men/32.jpg" },
    },
    {
      id: 2,
      name: "Michael Lee",
      role: "Residential Plumber",
      distance: "1.8 km away",
      rating: 4.8,
      avatar: { uri: "https://randomuser.me/api/portraits/men/44.jpg" },
    },
    {
      id: 3,
      name: "Samantha Doe",
      role: "Certified Plumber",
      distance: "2.1 km away",
      rating: 4.7,
      avatar: { uri: "https://randomuser.me/api/portraits/women/68.jpg" },
    },
    {
      id: 4,
      name: "David Smith",
      role: "Drainage Specialist",
      distance: "3.0 km away",
      rating: 5.0,
      avatar: { uri: "https://randomuser.me/api/portraits/men/12.jpg" },
    },
    {
      id: 5,
      name: "James Rodriguez",
      role: "Commercial Plumber",
      distance: "4.5 km away",
      rating: 4.9,
      avatar: { uri: "https://randomuser.me/api/portraits/men/52.jpg" },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#e5e7eb" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="search" size={20} color="#e5e7eb" />
        </TouchableOpacity>
      </View>

      {/* Filter chips row */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>Price</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterChip, styles.filterChipActive]}>
          <Text style={[styles.filterText, styles.filterTextActive]}>Nearby</Text>
        </TouchableOpacity>
      </View>

      {/* List of workers */}
      <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 90 }}>
        {workers.map((worker) => (
          <View key={worker.id} style={styles.card}>
            <Image source={worker.avatar} style={styles.avatar} />

            <View style={styles.cardMiddle}>
              <Text style={styles.name}>{worker.name}</Text>
              <Text style={styles.role}>{worker.role}</Text>
              <Text style={styles.distance}>{worker.distance}</Text>
            </View>

            <View style={styles.cardRight}>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>{worker.rating}</Text>
              </View>

              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => navigation.navigate("CustomerBookingConfirm", { worker })}
              >
                <Text style={styles.primaryBtnText}>Book Now</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnText}>Book for Later</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom navigation bar */}
      <View style={styles.footerNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("CustomerHome")}
        >
          <Ionicons name="home" size={22} color="#00FF85" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Ionicons name="calendar" size={22} color="#9ca3af" />
          <Text style={styles.navLabel}>Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Ionicons name="chatbubble" size={22} color="#9ca3af" />
          <Text style={styles.navLabel}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Ionicons name="person" size={22} color="#9ca3af" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 8,
  },
  headerIcon: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  filterRow: {
    flexDirection: "row",
    columnGap: 8,
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#1F2937",
  },
  filterChipActive: {
    backgroundColor: "rgba(0,255,133,0.18)",
    borderColor: "#00FF85",
  },
  filterText: {
    color: "#e5e7eb",
    fontSize: 12,
  },
  filterTextActive: {
    color: "#00FF85",
    fontWeight: "600",
  },
  list: {
    marginTop: 4,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#111827",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 10,
  },
  cardMiddle: {
    flex: 1,
  },
  name: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  role: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 2,
  },
  distance: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 4,
  },
  cardRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
  },
  primaryBtn: {
    backgroundColor: "#00FF85",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 4,
  },
  primaryBtnText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "700",
  },
  secondaryBtn: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#00FF85",
  },
  secondaryBtnText: {
    color: "#00FF85",
    fontSize: 12,
    fontWeight: "600",
  },
  footerNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#121212",
    borderTopWidth: 1,
    borderTopColor: "#1F2937",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navLabel: {
    marginTop: 4,
    fontSize: 10,
    color: "#9ca3af",
  },
  navLabelActive: {
    color: "#00FF85",
    fontWeight: "700",
  },
});
