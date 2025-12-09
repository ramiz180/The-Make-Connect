import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderSuccess({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>

        {/* Success Icon */}
        <View style={styles.successCircle}>
          <Ionicons name="checkmark" size={60} color="#000" />
        </View>

        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your service has been successfully booked.
        </Text>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.navigate("CustomerTabs")}
        >
          <Text style={styles.homeBtnText}>Go to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewBtn}
          onPress={() => alert("Bookings screen coming soon")}
        >
          <Text style={styles.viewBtnText}>View Bookings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F15",
    justifyContent: "center",
    alignItems: "center",
  },

  center: {
    alignItems: "center",
  },

  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#00D786",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 30,
  },

  subtitle: {
    color: "#9BA1A8",
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 40,
  },

  homeBtn: {
    backgroundColor: "#00D786",
    paddingVertical: 14,
    paddingHorizontal: 70,
    borderRadius: 12,
    marginTop: 40,
  },
  homeBtnText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },

  viewBtn: {
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#00D786",
  },
  viewBtnText: {
    color: "#00D786",
    fontSize: 16,
    fontWeight: "600",
  },
});
