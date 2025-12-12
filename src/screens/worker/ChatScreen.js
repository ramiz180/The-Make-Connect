import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";

const COLORS = {
  primary: "#13ec13",
  backgroundLight: "#f6f8f6",
  backgroundDark: "#102210",
  text: "#ffffff",
  textDark: "#0d1b0d",
  textMuted: "#a0b3a0",
};

const CHATS = [
  {
    id: "1",
    name: "Jane Doe",
    time: "10:32 AM",
    inquiry: "Inquiry for: Custom Bookshelf",
    preview: "That sounds great, what's your...",
    unread: 2,
    avatarColor: "#f97373",
  },
  {
    id: "2",
    name: "Mike Ross",
    time: "9:15 AM",
    inquiry: "Inquiry for: Plumbing Repair",
    preview: "Can you come by this afternoon?",
    unread: 0,
    avatarColor: "#60a5fa",
  },
  {
    id: "3",
    name: "Samantha Miller",
    time: "Yesterday",
    inquiry: "Inquiry for: Electrical Wiring",
    preview: "Okay, see you then!",
    unread: 0,
    avatarColor: "#fb923c",
  },
  {
    id: "4",
    name: "Chris Green",
    time: "Sunday",
    inquiry: "Inquiry for: Garden Landscaping",
    preview: "Thanks for the quote.",
    unread: 0,
    avatarColor: "#4ade80",
  },
];

export default function ChatScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerSide} />
          <Text style={styles.headerTitle}>Chats</Text>
          <View style={styles.headerSideRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>🔍</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.listWrapper}>
          {CHATS.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              style={styles.chatRow}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("WorkerChatScreen", {
                  id: chat.id,
                  name: chat.name,
                  inquiry: chat.inquiry,
                })
              }
            >
              <View style={styles.avatarWrapper}>
                <View
                  style={[styles.avatarCircle, { backgroundColor: chat.avatarColor }]}
                >
                  <Text style={styles.avatarInitial}>{chat.name[0]}</Text>
                </View>
              </View>

              <View style={styles.chatContent}>
                <View style={styles.nameRow}>
                  <Text style={styles.nameText} numberOfLines={1}>
                    {chat.name}
                  </Text>
                  <Text
                    style={chat.unread ? styles.timeTextPrimary : styles.timeTextMuted}
                  >
                    {chat.time}
                  </Text>
                </View>

                <Text style={styles.inquiryText} numberOfLines={1}>
                  {chat.inquiry}
                </Text>

                <View style={styles.previewRow}>
                  <Text style={styles.previewText} numberOfLines={1}>
                    {chat.preview}
                  </Text>
                  {chat.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{chat.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
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

        <TouchableOpacity style={styles.navItemActive}>
          <Text style={[styles.navIcon, styles.navIconActive]}>💬</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("WorkerBookingScreen")}
        >
          <Text style={styles.navIcon}>📅</Text>
          <Text style={styles.navLabel}>Bookings</Text>
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
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerSide: {
    width: 48,
    height: 48,
  },
  headerSideRight: {
    width: 48,
    height: 48,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 18,
    color: COLORS.text,
  },
  listWrapper: {
    marginTop: 4,
  },
  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 16,
  },
  avatarWrapper: {
    marginRight: 12,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  chatContent: {
    flex: 1,
    minWidth: 0,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  nameText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginRight: 8,
  },
  timeTextPrimary: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primary,
  },
  timeTextMuted: {
    fontSize: 11,
    fontWeight: "500",
    color: "#94a3b8",
  },
  inquiryText: {
    marginTop: 2,
    fontSize: 12,
    color: "#cbd5f5",
  },
  previewRow: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  previewText: {
    flex: 1,
    fontSize: 13,
    color: "#e5e7eb",
  },
  unreadBadge: {
    marginLeft: 8,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.backgroundDark,
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
    borderTopColor: "#1e293b",
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
