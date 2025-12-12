import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

const COLORS = {
  primary: "#13ec13",
  backgroundDark: "#102210",
  surface: "#111f11",
  card: "#152715",
  text: "#ffffff",
  textMuted: "#94a3a5",
  divider: "#1f3320",
  dangerBg: "#3b1515",
  danger: "#f87171",
};

export default function WorkerProfile({ navigation }) {
  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSpacer} />

        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCV-7hNXVbC0A5z-nwXV5QTQOqf8RxFxgmZ61-e8M2D8Kr-ttd0J08JZGZyNEmJFYxUhksVD49dZSEt4WNaLD8yUr0TH2rmIDUqEl09RFsdSJJYaO2_5g7Z5fD79D5JcO2hz7tkMIqYxW5o71bAJ3puBTBSN3S5Q1pJ7xyGqv2bVm29_xwOeFRZzHFxCzwUQbpqB1tVL15Mxj82ZtQrmQtQ4JHncfx9uarZoUgJEtJqi7xb1Q3Sd9rOp5tTGaKwEZY2qTx68Yy9soGc",
              }}
              style={styles.avatar}
            />
          </View>

          <Text style={styles.name}>Jordan Lee</Text>

          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("EditWorkerProfile")}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionsWrapper}>
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>Account</Text>

            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("MyServices")}
            >
              <View style={styles.rowLeft}>
                <Text style={styles.rowIcon}>🛠️</Text>
                <Text style={styles.rowText}>My Services</Text>
              </View>
              <Text style={styles.chevron}>{"›"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>Settings</Text>

            <TouchableOpacity style={[styles.row, styles.rowBorder]} activeOpacity={0.8}>
              <View style={styles.rowLeft}>
                <Text style={styles.rowIcon}>❓</Text>
                <Text style={styles.rowText}>Help &amp; Support</Text>
              </View>
              <Text style={styles.chevron}>{"›"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.row, styles.rowBorder]} activeOpacity={0.8}>
              <View style={styles.rowLeft}>
                <Text style={styles.rowIcon}>🌐</Text>
                <Text style={styles.rowText}>Languages</Text>
              </View>
              <Text style={styles.chevron}>{"›"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.row, styles.rowBorder]} activeOpacity={0.8}>
              <View style={styles.rowLeft}>
                <Text style={styles.rowIcon}>⚖️</Text>
                <Text style={styles.rowText}>Terms &amp; Conditions</Text>
              </View>
              <Text style={styles.chevron}>{"›"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row} activeOpacity={0.8}>
              <View style={styles.rowLeft}>
                <Text style={styles.rowIcon}>🔒</Text>
                <Text style={styles.rowText}>Privacy Policy</Text>
              </View>
              <Text style={styles.chevron}>{"›"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.logoutWrapper}>
          <TouchableOpacity style={styles.logoutButton} activeOpacity={0.9}>
            <Text style={styles.logoutIcon}>⬅️</Text>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("WorkerBookingScreen")}
        >
          <Text style={styles.navIcon}>📅</Text>
          <Text style={styles.navLabel}>Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItemActive}>
          <Text style={[styles.navIcon, styles.navIconActive]}>👤</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  headerSpacer: {
    height: 16,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarWrapper: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 12,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  editButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600",
  },
  sectionsWrapper: {
    gap: 24,
  },
  sectionBlock: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.6)",
    marginBottom: 8,
    marginLeft: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowIcon: {
    fontSize: 18,
    marginRight: 10,
    color: COLORS.text,
  },
  rowText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
  },
  chevron: {
    fontSize: 18,
    color: "rgba(255,255,255,0.5)",
  },
  logoutWrapper: {
    marginTop: 24,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.dangerBg,
    paddingVertical: 14,
    borderRadius: 12,
  },
  logoutIcon: {
    fontSize: 18,
    color: COLORS.danger,
    marginRight: 6,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.danger,
  },
  footerNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "rgba(15,23,15,0.8)",
    backgroundColor: "rgba(16,34,16,0.95)",
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
    color: "#9ca3af",
    marginBottom: 2,
  },
  navIconActive: {
    color: COLORS.primary,
  },
  navLabel: {
    fontSize: 10,
    color: "#9ca3af",
  },
  navLabelActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});
