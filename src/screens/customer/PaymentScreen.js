import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentScreen({ route, navigation }) {
  const { worker, date, time, address } = route.params;

  const paymentMethods = [
    { id: 1, name: "UPI", icon: "logo-google" },
    { id: 2, name: "Cash on Service", icon: "cash-outline" },
    { id: 3, name: "Debit / Credit Card", icon: "card-outline" },
  ];

  const handlePay = () => {
    navigation.navigate("OrderSuccess");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Booking Summary */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>Service: {worker.name}</Text>
          <Text style={styles.summaryText}>Date: {date}</Text>
          <Text style={styles.summaryText}>Time: {time}</Text>
          <Text style={styles.summaryText}>Address: {address}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.amountText}>Total Amount</Text>
            <Text style={styles.amount}>₹299</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <Text style={styles.label}>Choose Payment Method</Text>

        {paymentMethods.map((item) => (
          <TouchableOpacity key={item.id} style={styles.methodBox}>
            <Ionicons name={item.icon} size={22} color="#00D786" />
            <Text style={styles.methodName}>{item.name}</Text>
          </TouchableOpacity>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.payContainer}>
        <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
          <Text style={styles.payText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// -------- STYLES -------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F15",
    paddingHorizontal: 16,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  summaryBox: {
    backgroundColor: "#121820",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#1E2630",
  },

  summaryText: {
    color: "#9BA1A8",
    fontSize: 14,
    marginBottom: 4,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  amountText: {
    color: "#fff",
    fontSize: 16,
  },
  amount: {
    color: "#00D786",
    fontSize: 20,
    fontWeight: "700",
  },

  label: {
    color: "#fff",
    fontSize: 16,
    marginTop: 30,
    marginBottom: 12,
    fontWeight: "700",
  },

  methodBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#121820",
    borderWidth: 1,
    borderColor: "#1E2630",
    marginBottom: 12,
  },
  methodName: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 16,
  },

  payContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#0B0F15",
  },
  payBtn: {
    backgroundColor: "#00D786",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  payText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },
});
