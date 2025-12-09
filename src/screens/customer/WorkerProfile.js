import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function WorkerProfile({ route, navigation }) {
  const { worker } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Worker Profile</Text>

          <Ionicons name="heart-outline" size={22} color="#fff" />
        </View>

        {/* Top Section */}
        <View style={styles.topSection}>
          <Image source={worker.image} style={styles.profileImage} />

          <Text style={styles.name}>{worker.name}</Text>
          <Text style={styles.skill}>{worker.skill}</Text>

          <View style={styles.rowCenter}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{worker.rating}</Text>
            <Text style={styles.dot}> • </Text>
            <Ionicons name="location-outline" size={14} color="#fff" />
            <Text style={styles.distance}>{worker.distance}</Text>
          </View>

          <Text style={styles.jobs}>{worker.jobs} jobs completed</Text>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            I am an experienced {worker.skill} professional with over{" "}
            {worker.jobs}+ successfully completed jobs. I focus on quality work,
            punctuality, and customer satisfaction. Available for quick bookings.
          </Text>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services Offered</Text>

          <View style={styles.listItem}>
            <MaterialIcons name="check-circle" size={20} color="#00D786" />
            <Text style={styles.listText}>Basic {worker.skill} Work</Text>
          </View>

          <View style={styles.listItem}>
            <MaterialIcons name="check-circle" size={20} color="#00D786" />
            <Text style={styles.listText}>Advanced {worker.skill} Service</Text>
          </View>

          <View style={styles.listItem}>
            <MaterialIcons name="check-circle" size={20} color="#00D786" />
            <Text style={styles.listText}>Emergency Visit Available</Text>
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Reviews</Text>

          <View style={styles.reviewCard}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/44.jpg" }}
              style={styles.reviewImg}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.reviewName}>Arjun Das</Text>
              <View style={styles.rowCenter}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.reviewRating}>4.9</Text>
              </View>
              <Text style={styles.reviewText}>
                Excellent work! Very polite and quick service.
              </Text>
            </View>
          </View>

          <View style={styles.reviewCard}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/women/55.jpg" }}
              style={styles.reviewImg}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.reviewName}>Priya Singh</Text>
              <View style={styles.rowCenter}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.reviewRating}>4.8</Text>
              </View>
              <Text style={styles.reviewText}>
                Very professional and good behaviour. Highly recommended!
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Book Button */}
      <View style={styles.bookContainer}>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => navigation.navigate("BookingScreen", { worker })}
        >
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// -------------------- STYLES --------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F15",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  topSection: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },
  skill: {
    color: "#9BA1A8",
    fontSize: 14,
    marginTop: 2,
  },

  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  rating: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 14,
  },
  dot: {
    color: "#fff",
    fontSize: 14,
    marginHorizontal: 6,
  },
  distance: {
    color: "#9BA1A8",
    fontSize: 13,
  },
  jobs: {
    color: "#9BA1A8",
    marginTop: 6,
  },

  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  aboutText: {
    color: "#9BA1A8",
    lineHeight: 20,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  listText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 14,
  },

  reviewCard: {
    backgroundColor: "#121820",
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#1E2630",
  },
  reviewImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  reviewRating: {
    color: "#fff",
    marginLeft: 4,
  },
  reviewText: {
    color: "#9BA1A8",
    marginTop: 2,
    fontSize: 13,
    width: "90%",
  },

  bookContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#0B0F15",
  },
  bookBtn: {
    backgroundColor: "#00D786",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  bookText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },
});
