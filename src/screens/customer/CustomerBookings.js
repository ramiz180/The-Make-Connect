import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { socket } from "../../utils/socket";

/* ================== CONFIG ================== */
const API = "http://192.168.29.199:3000/api";
/* ============================================ */

const STATUS_MAP = {
  pending: {
    label: "Pending",
    color: "#FACC15",
    bg: "rgba(250,204,21,0.2)",
  },
  accepted: {
    label: "Confirmed",
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.2)",
  },
  cancelled: {
    label: "Cancelled",
    color: "#F87171",
    bg: "rgba(248,113,113,0.2)",
  },
  completed: {
    label: "Completed",
    color: "#31FE83",
    bg: "rgba(49,254,131,0.2)",
  },
};

export default function CustomerBookings({ route }) {
  const { customerId } = route.params;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BOOKINGS ================= */
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${API}/bookings/customer/${customerId}`
      );
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.log("❌ Fetch customer bookings error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SOCKET ================= */
  useEffect(() => {
    if (!customerId) return;

    socket.connect();
    socket.emit("join", customerId);

    fetchBookings();

    socket.on("booking:new", fetchBookings);
    socket.on("booking:updated", fetchBookings);

    return () => {
      socket.off("booking:new", fetchBookings);
      socket.off("booking:updated", fetchBookings);
      socket.disconnect();
    };
  }, [customerId]);

  /* ================= UI ================= */
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>My Bookings</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#31FE83" />
        ) : bookings.length === 0 ? (
          <Text style={styles.emptyText}>No bookings yet</Text>
        ) : (
          bookings.map((b) => {
            const status = STATUS_MAP[b.status] || STATUS_MAP.pending;

            return (
              <View key={b._id} style={styles.card}>
                {/* TOP */}
                <View style={styles.topRow}>
                  <Text style={styles.service}>
                    🛠 {b.service?.name || "Service"}
                  </Text>

                  <View
                    style={[
                      styles.statusChip,
                      { backgroundColor: status.bg },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: status.color },
                      ]}
                    >
                      {status.label}
                    </Text>
                  </View>
                </View>

                <Text style={styles.worker}>
                  👤 {b.workerId?.name || "Worker"}
                </Text>

                <View style={styles.row}>
                  <Text style={styles.meta}>📅 {b.date}</Text>
                  <Text style={styles.meta}>⏰ {b.time}</Text>
                </View>

                <Text style={styles.address}>📍 {b.address}</Text>

                {b.status === "pending" && (
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={async () => {
                      await axios.post(`${API}/bookings/cancel`, {
                        bookingId: b._id,
                      });
                    }}
                  >
                    <Text style={styles.cancelText}>Cancel Booking</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================== STYLES ================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 16 },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },

  emptyText: {
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 40,
  },

  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#27272f",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  service: { color: "#fff", fontWeight: "700", fontSize: 15 },

  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  statusText: { fontSize: 11, fontWeight: "700" },

  worker: { color: "#A8B0BA", marginTop: 6 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  meta: { color: "#9CA3AF", fontSize: 12 },

  address: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 6,
  },

  cancelBtn: {
    marginTop: 12,
    backgroundColor: "#7F1D1D",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },

  cancelText: {
    color: "#FCA5A5",
    fontWeight: "700",
    fontSize: 13,
  },
});
