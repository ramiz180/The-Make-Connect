import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";

export default function WorkerHome({ navigation }) {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Worker Dashboard</Text>
      </View>

      {/* Verification Card */}
      <View style={styles.verificationCard}>
        <Text style={styles.statusTitle}>Verification Status</Text>
        <Text style={styles.statusBadge}>Pending Review</Text>
      </View>

      {/* Availability Toggle */}
      <View style={styles.availabilityBox}>
        <Text style={styles.availabilityText}>I am Available</Text>
        <Switch value={isAvailable} onValueChange={setIsAvailable} />
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("WorkerChatScreen")}
        >
          <Text style={styles.actionText}>Inbox</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("EditWorkerProfile")}
        >
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Radius Info */}
      <View style={styles.radiusBox}>
        <Text style={styles.radiusTitle}>Work Radius</Text>
        <Text style={styles.radiusValue}>5 km</Text>
      </View>

      {/* View Verification Details */}
      <TouchableOpacity
        style={styles.verifyBtn}
        onPress={() => navigation.navigate("VerificationStatus")}
      >
        <Text style={styles.verifyText}>View Verification Details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },

  header: {
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#0A84FF",
    borderRadius: 10,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },

  verificationCard: {
    backgroundColor: "#F6F6F6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  statusBadge: {
    marginTop: 8,
    backgroundColor: "#FFD700",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    fontWeight: "600",
  },

  availabilityBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    padding: 15,
    borderRadius: 10,
  },

  availabilityText: {
    fontSize: 16,
    fontWeight: "500",
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  actionBtn: {
    backgroundColor: "#0A84FF",
    width: "48%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  actionText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  radiusBox: {
    marginTop: 25,
    backgroundColor: "#EAEAEA",
    padding: 15,
    borderRadius: 10,
  },

  radiusTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  radiusValue: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 5,
  },

  verifyBtn: {
    marginTop: 25,
    backgroundColor: "#FFA500",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  verifyText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
