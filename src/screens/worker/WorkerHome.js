






/*import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function WorkerHome({ navigation, route }) {
  const { userId } = route.params || {};

  const [status, setStatus] = useState("available");
  const isAvailable = status === "available";

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <View style={styles.header}>
          <Text style={styles.brandText}>The Make Connect</Text>

          <TouchableOpacity
            style={styles.addServiceButton}
            onPress={() =>
              navigation.navigate("AddService", { userId })
            }
          >
            <Text style={styles.addServiceText}>+ Add Service</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.centerContent}>
          <Text style={styles.statusLabel}>Set your status</Text>

          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleOption,
                isAvailable && styles.toggleOptionActive,
              ]}
              onPress={() => setStatus("available")}
            >
              <Text
                style={[
                  styles.toggleText,
                  isAvailable && styles.toggleTextActive,
                ]}
              >
                Available
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleOption,
                !isAvailable && styles.toggleOptionActive,
              ]}
              onPress={() => setStatus("unavailable")}
            >
              <Text
                style={[
                  styles.toggleText,
                  !isAvailable && styles.toggleTextActive,
                ]}
              >
                Unavailable
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerNav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={[styles.navIcon, styles.navIconActive]}>🏠</Text>
            <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() =>
              navigation.navigate("MyServices", { userId })
            }
          >
            <Text style={styles.navIcon}>🛠️</Text>
            <Text style={styles.navLabel}>Services</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() =>
              navigation.navigate("WorkerChatList", { userId })
            }
          >
            <Text style={styles.navIcon}>💬</Text>
            <Text style={styles.navLabel}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() =>
              navigation.navigate("WorkerBookingScreen", { userId })
            }
          >
            <Text style={styles.navIcon}>📅</Text>
            <Text style={styles.navLabel}>Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() =>
              navigation.navigate("WorkerProfile", { userId })
            }
          >
            <Text style={styles.navIcon}>👤</Text>
            <Text style={styles.navLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const PRIMARY = "#31FE83";
const BACKGROUND_DARK = "#000000";
const TEXT_LIGHT = "#FFFFFF";
const TEXT_MUTED_DARK = "#A0B3A0";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_DARK,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  brandText: {
    fontSize: 20,
    fontWeight: "700",
    color: TEXT_LIGHT,
  },
  addServiceButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: PRIMARY,
    borderRadius: 999,
  },
  addServiceText: {
    color: BACKGROUND_DARK,
    fontWeight: "700",
    fontSize: 14,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statusLabel: {
    fontSize: 16,
    color: TEXT_MUTED_DARK,
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#111111",
    borderRadius: 999,
    padding: 4,
  },
  toggleOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 999,
  },
  toggleOptionActive: {
    backgroundColor: PRIMARY,
  },
  toggleText: {
    fontSize: 16,
    color: TEXT_MUTED_DARK,
  },
  toggleTextActive: {
    color: BACKGROUND_DARK,
    fontWeight: "700",
  },
  footerNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#111111",
    borderRadius: 999,
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    fontSize: 18,
    color: TEXT_MUTED_DARK,
  },
  navIconActive: {
    color: PRIMARY,
  },
  navLabel: {
    fontSize: 10,
    color: TEXT_MUTED_DARK,
  },
  navLabelActive: {
    color: PRIMARY,
    fontWeight: "700",
  },
});*/



















import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function WorkerHome({ navigation, route }) {
  const { userId } = route.params || {}; // ✅ worker userId

  const [status, setStatus] = useState("available");
  const isAvailable = status === "available";

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.brandText}>The Make Connect</Text>

          <TouchableOpacity
            style={styles.addServiceButton}
            onPress={() => navigation.navigate("AddService", { userId })}
          >
            <Text style={styles.addServiceText}>+ Add Service</Text>
          </TouchableOpacity>
        </View>

        {/* CENTER */}
        <View style={styles.centerContent}>
          <Text style={styles.statusLabel}>Set your status</Text>

          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleOption, isAvailable && styles.toggleOptionActive]}
              onPress={() => setStatus("available")}
            >
              <Text style={[styles.toggleText, isAvailable && styles.toggleTextActive]}>
                Available
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleOption, !isAvailable && styles.toggleOptionActive]}
              onPress={() => setStatus("unavailable")}
            >
              <Text style={[styles.toggleText, !isAvailable && styles.toggleTextActive]}>
                Unavailable
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footerNav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={[styles.navIcon, styles.navIconActive]}>🏠</Text>
            <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("MyServices", { userId })}
          >
            <Text style={styles.navIcon}>🛠️</Text>
            <Text style={styles.navLabel}>Services</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("WorkerChatList", { userId })}
          >
            <Text style={styles.navIcon}>💬</Text>
            <Text style={styles.navLabel}>Chat</Text>
          </TouchableOpacity>

          {/* ✅ FIXED */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() =>
              navigation.navigate("WorkerBookingScreen", {
                workerId: userId, // ✅ PASS AS workerId
              })
            }
          >
            <Text style={styles.navIcon}>📅</Text>
            <Text style={styles.navLabel}>Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("WorkerProfile", { userId })}
          >
            <Text style={styles.navIcon}>👤</Text>
            <Text style={styles.navLabel}>Profile</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

/* ===== STYLES (UNCHANGED) ===== */
const PRIMARY = "#31FE83";
const BACKGROUND_DARK = "#000000";
const TEXT_LIGHT = "#FFFFFF";
const TEXT_MUTED_DARK = "#A0B3A0";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BACKGROUND_DARK },
  content: { flex: 1, padding: 16, justifyContent: "space-between" },
  header: { flexDirection: "row", justifyContent: "space-between" },
  brandText: { color: TEXT_LIGHT, fontSize: 20, fontWeight: "700" },
  addServiceButton: { backgroundColor: PRIMARY, padding: 8, borderRadius: 999 },
  addServiceText: { color: "#000", fontWeight: "700" },
  centerContent: { alignItems: "center", flex: 1, justifyContent: "center" },
  statusLabel: { color: TEXT_MUTED_DARK },
  toggleContainer: { flexDirection: "row", backgroundColor: "#111", borderRadius: 999 },
  toggleOption: { padding: 10 },
  toggleOptionActive: { backgroundColor: PRIMARY, borderRadius: 999 },
  toggleText: { color: TEXT_MUTED_DARK },
  toggleTextActive: { color: "#000", fontWeight: "700" },
  footerNav: { flexDirection: "row", justifyContent: "space-around", backgroundColor: "#111" },
  navItem: { alignItems: "center" },
  navIcon: { color: TEXT_MUTED_DARK },
  navIconActive: { color: PRIMARY },
  navLabel: { color: TEXT_MUTED_DARK, fontSize: 10 },
  navLabelActive: { color: PRIMARY },
});

