import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function OrderSummaryScreen({ route, navigation }) {
  const { worker, date, time, address, notes } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="#333"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Order Summary</Text>
      </View>

      {/* Worker Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Worker Details</Text>

        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{worker.name}</Text>

        <Text style={styles.label}>Skill</Text>
        <Text style={styles.value}>{worker.skill}</Text>

        <Text style={styles.label}>Experience</Text>
        <Text style={styles.value}>{worker.exp}</Text>
      </View>

      {/* Booking Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Booking Details</Text>

        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{date}</Text>

        <Text style={styles.label}>Time</Text>
        <Text style={styles.value}>{time}</Text>

        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{address}</Text>

        {notes ? (
          <>
            <Text style={styles.label}>Notes</Text>
            <Text style={styles.value}>{notes}</Text>
          </>
        ) : null}
      </View>

      {/* Price */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Payment</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Service Charge</Text>
          <Text style={styles.value}>{worker.price}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Platform Fee</Text>
          <Text style={styles.value}>₹10</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total Pay</Text>
          <Text style={styles.totalValue}>
            {`₹${parseInt(worker.price.replace("₹", "")) + 10}`}
          </Text>
        </View>
      </View>

      {/* Confirm */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("PaymentScreen", {
            worker,
            total:
              parseInt(worker.price.replace("₹", "")) + 10,
          })
        }
      >
        <Text style={styles.buttonText}>Proceed to Pay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", marginLeft: 12 },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111",
  },

  label: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  totalLabel: { fontSize: 16, fontWeight: "bold", color: "#000" },
  totalValue: { fontSize: 16, fontWeight: "bold", color: "#0A7AFF" },

  button: {
    backgroundColor: "#0A7AFF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
