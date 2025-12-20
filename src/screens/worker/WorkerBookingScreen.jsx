import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";

const API = "http://192.168.29.199:3000/api";

export default function WorkerBookingScreen({ route }) {
  const { workerId } = route.params || {}; // ✅ NOW CORRECT

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${API}/bookings/worker/${workerId}`
      );
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.log("❌ Worker bookings error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!workerId) return;
    fetchBookings();
  }, [workerId]);

  const updateStatus = async (bookingId, action) => {
    try {
      await axios.post(`${API}/bookings/${action}`, { bookingId });
      fetchBookings();
    } catch (err) {
      Alert.alert("Error", "Action failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00FF85" />
      ) : bookings.length === 0 ? (
        <Text style={styles.empty}>No bookings yet</Text>
      ) : (
        <ScrollView>
          {bookings.map((b) => (
            <View key={b._id} style={styles.card}>
              {/* ✅ CUSTOMER NAME */}
              <Text style={styles.name}>
                👤 {b.customerId?.name || "Customer"}
              </Text>

              <Text style={styles.service}>🛠 {b.service?.name}</Text>
              <Text style={styles.meta}>📅 {b.date} | ⏰ {b.time}</Text>
              <Text style={styles.status}>Status: {b.status}</Text>

              {b.status === "pending" && (
                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.accept}
                    onPress={() => updateStatus(b._id, "accept")}
                  >
                    <Text style={styles.btnText}>Accept</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.reject}
                    onPress={() => updateStatus(b._id, "reject")}
                  >
                    <Text style={styles.btnText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              )}

              {b.status === "accepted" && (
                <TouchableOpacity
                  style={styles.complete}
                  onPress={() => updateStatus(b._id, "complete")}
                >
                  <Text style={styles.btnText}>Mark Completed</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#121212" },
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 16 },
  empty: { color: "#9ca3af", textAlign: "center", marginTop: 40 },
  card: { backgroundColor: "#1E1E1E", borderRadius: 14, padding: 14, marginBottom: 12 },
  name: { color: "#fff", fontWeight: "700" },
  service: { color: "#9ca3af", marginTop: 4 },
  meta: { color: "#9ca3af", marginTop: 4 },
  status: { color: "#00FF85", marginTop: 6 },
  row: { flexDirection: "row", marginTop: 10 },
  accept: { flex: 1, backgroundColor: "#00FF85", padding: 10, borderRadius: 8 },
  reject: { flex: 1, backgroundColor: "#ef4444", padding: 10, borderRadius: 8, marginLeft: 6 },
  complete: { marginTop: 10, backgroundColor: "#2563eb", padding: 10, borderRadius: 8 },
  btnText: { color: "#000", fontWeight: "700", textAlign: "center" },
});
