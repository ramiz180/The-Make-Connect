import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const COLORS = {
  primary: "#31FE83",
  backgroundDark: "#000000",
  surfaceDark: "#111111",
  surfaceCard: "rgba(24,24,27,0.9)",
  text: "#ffffff",
  textMuted: "#a0b3a0",
};

const BOOKINGS = [
  {
    id: "1",
    name: "Alex Johnson",
    service: "Home Deep Cleaning",
    status: "Confirmed",
    statusColor: "#60a5fa",
    statusBg: "rgba(59,130,246,0.2)",
    date: "Jul 28, 2024",
    time: "10:00 AM",
  },
  {
    id: "2",
    name: "Maria Garcia",
    service: "Plumbing Fix",
    status: "Completed",
    statusColor: COLORS.primary,
    statusBg: "rgba(49,254,131,0.2)",
    date: "Jul 25, 2024",
    time: "02:30 PM",
  },
  {
    id: "3",
    name: "David Smith",
    service: "Electrical Wiring",
    status: "Cancelled",
    statusColor: "#f87171",
    statusBg: "rgba(248,113,113,0.2)",
    date: "Jul 22, 2024",
    time: "11:00 AM",
  },
  {
    id: "4",
    name: "Emily White",
    service: "Painting Service",
    status: "Pending",
    statusColor: "#facc15",
    statusBg: "rgba(250,204,21,0.2)",
    date: "Aug 02, 2024",
    time: "09:00 AM",
  },
];

export default function BookingScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <View style={styles.backgroundOverlay} />

      <View style={styles.contentWrapper}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Bookings</Text>
            <TouchableOpacity style={styles.notificationButton}>
              <Text style={styles.notificationIcon}>🔔</Text>
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          <View style={styles.listWrapper}>
            {BOOKINGS.map((booking) => (
              <View key={booking.id} style={styles.card}>
                <View style={styles.cardTopRow}>
                  <View>
                    <View style={styles.nameRow}>
                      <Text style={styles.avatarIcon}>👤</Text>
                      <Text style={styles.nameText}>{booking.name}</Text>
                    </View>
                    <Text style={styles.serviceText}>{booking.service}</Text>
                  </View>

                  <View style={styles.rightTopCol}>
                    <View
                      style={[
                        styles.statusChip,
                        { backgroundColor: booking.statusBg },
                      ]}
                    >
                      <Text
                        style={[styles.statusText, { color: booking.statusColor }]}
                      >
                        {booking.status}
                      </Text>
                    </View>
                    <View style={styles.actionsRow}>
                      <Text style={styles.actionIcon}>📍</Text>
                      <Text style={styles.actionIcon}>💬</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardBottomRow}>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaIcon}>📅</Text>
                    <Text style={styles.metaText}>{booking.date}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaIcon}>⏰</Text>
                    <Text style={styles.metaText}>{booking.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footerNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("WorkerHome")}
          >
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("MyServices")}
          >
            <Text style={styles.navIcon}>🛠️</Text>
            <Text style={styles.navLabel}>Services</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("WorkerChatList")}
          >
            <Text style={styles.navIcon}>💬</Text>
            <Text style={styles.navLabel}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItemActive}>
            <Text style={[styles.navIcon, styles.navIconActive]}>📅</Text>
            <Text style={[styles.navLabel, styles.navLabelActive]}>Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("WorkerProfile")}
          >
            <Text style={styles.navIcon}>👤</Text>
            <Text style={styles.navLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },
  notificationButton: {
    position: "relative",
    padding: 4,
  },
  notificationIcon: {
    fontSize: 22,
    color: COLORS.text,
  },
  notificationDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  listWrapper: {
    marginTop: 8,
  },
  card: {
    backgroundColor: COLORS.surfaceCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarIcon: {
    fontSize: 18,
    color: COLORS.textMuted,
    marginRight: 6,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  serviceText: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.textMuted,
  },
  rightTopCol: {
    alignItems: "flex-end",
  },
  statusChip: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  actionIcon: {
    fontSize: 16,
    color: COLORS.primary,
    marginLeft: 10,
  },
  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#27272f",
    paddingTop: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaIcon: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginRight: 4,
  },
  metaText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  footerNav: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#111111",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navItemActive: {
    alignItems: "center",
    justifyContent: "center",
  },
  navIcon: {
    fontSize: 18,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  navIconActive: {
    color: COLORS.primary,
  },
  navLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  navLabelActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});
