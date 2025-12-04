import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";

export default function WorkerProfile({ route, navigation }) {
  const worker = route.params?.worker;

  if (!worker) {
    return (
      <View style={styles.center}>
        <Text>No worker data found</Text>
      </View>
    );
  }

  const handleReport = () => {
    Alert.alert(
      "Report Worker",
      "Select a reason",
      [
        { text: "Fake Profile" },
        { text: "Wrong Charges" },
        { text: "Misbehavior" },
        { text: "Spam" },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const handleBlock = () => {
    Alert.alert(
      "Block Worker",
      "You will no longer see this worker.",
      [
        { text: "Block", style: "destructive" },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Photo Section */}
      <ScrollView horizontal pagingEnabled style={styles.photoCarousel}>
        <Image
          source={require("../../assets/images/user.png")}
          style={styles.photo}
        />
        <Image
          source={require("../../assets/images/user.png")}
          style={styles.photo}
        />
      </ScrollView>

      {/* Basic Info */}
      <View style={styles.section}>
        <Text style={styles.name}>{worker.name}</Text>

        <View style={styles.row}>
          <Text style={styles.skill}>{worker.skill}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Verified</Text>
          </View>
        </View>

        <Text style={styles.info}>
          {worker.exp} • {worker.distance}
        </Text>

        <Text style={styles.price}>Charges: {worker.price}</Text>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          Experienced professional in {worker.skill}. Provides reliable service with clean work.
        </Text>
      </View>

      {/* Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ratings & Reviews</Text>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewRating}>⭐ 4.7</Text>
          <Text style={styles.reviewText}>
            Great service! Very professional and quick to respond.
          </Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.viewAll}>View all reviews →</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Button */}
      <TouchableOpacity
        style={styles.chatBtn}
        onPress={() => navigation.navigate("ChatScreen", { worker })}
      >
        <Text style={styles.chatText}>Chat Now</Text>
      </TouchableOpacity>

      {/* Report/Block */}
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={handleReport}>
          <Text style={styles.report}>Report</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBlock}>
          <Text style={styles.block}>Block</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1 },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  photoCarousel: { height: 250, backgroundColor: "#eee" },
  photo: { width: 350, height: 250, resizeMode: "cover" },

  section: { padding: 16 },

  name: { fontSize: 22, fontWeight: "700" },
  skill: { fontSize: 16, marginRight: 10, color: "#444" },

  row: { flexDirection: "row", alignItems: "center", marginTop: 4 },

  badge: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  info: { color: "#555", marginTop: 4 },
  price: { fontSize: 16, fontWeight: "700", marginTop: 6 },

  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },

  aboutText: { color: "#555", lineHeight: 20 },

  reviewCard: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },

  reviewRating: { fontWeight: "700", marginBottom: 4 },
  reviewText: { color: "#444" },

  viewAll: { color: "#007bff", marginTop: 6, fontWeight: "600" },

  chatBtn: {
    backgroundColor: "#007bff",
    margin: 16,
    padding: 14,
    borderRadius: 12,
  },
  chatText: { color: "#fff", textAlign: "center", fontWeight: "700", fontSize: 16 },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  report: { color: "red", fontWeight: "600" },
  block: { color: "#333", fontWeight: "600" },
});
