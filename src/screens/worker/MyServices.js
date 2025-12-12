import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const COLORS = {
  primary: "#31FE83",
  backgroundDark: "#000000",
  surfaceDark: "#1a1a1a",
  borderDark: "#2e2e2e",
  text: "#ffffff",
  textMuted: "#a0b3a0",
};

const INITIAL_SERVICES = [
  {
    id: "1",
    title: "Plumbing Services",
    price: "500",
    unit: "/hr",
    skills: ["Faucet Repair", "Pipe Installation", "Drain Cleaning"],
  },
  {
    id: "2",
    title: "Electrical Work",
    price: "650",
    unit: "/hr",
    skills: ["Wiring", "Fixture Installation"],
  },
  {
    id: "3",
    title: "Carpentry",
    price: "700",
    unit: "/hr",
    skills: ["Furniture Assembly", "Custom Shelving", "Door Repair"],
  },
];

export default function MyServices({ navigation, route }) {
  const [services, setServices] = useState(INITIAL_SERVICES);

  useEffect(() => {
    const newService = route?.params?.newService;
    const updatedService = route?.params?.updatedService;
    if (newService) {
      setServices((prev) => {
        const exists = prev.some((s) => s.id === newService.id);
        if (exists) return prev;
        return [newService, ...prev];
      });
    }
    if (updatedService) {
      setServices((prev) =>
        prev.map((s) => (s.id === updatedService.id ? updatedService : s))
      );
    }
  }, [route?.params?.newService, route?.params?.updatedService]);

  return (
    <View style={styles.root}>
      <View style={styles.headerBackground} />
      <View style={styles.gradientOverlay} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>{"←"}</Text>
          </TouchableOpacity>

          <View style={styles.brandRow}>
            <View style={styles.brandDot} />
            <Text style={styles.brandText}>The Make Connect</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.mainSection}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.title}>My Services</Text>
              <Text style={styles.subtitle}>
                Manage your offered services and rates.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("AddService")}
            >
              <Text style={styles.addIcon}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listSection}>
            {services.map((service) => (
              <View key={service.id} style={styles.card}>
                <View style={styles.cardHeaderRow}>
                  <View>
                    <Text style={styles.cardTitle}>{service.title}</Text>
                    <Text style={styles.cardPrice}>
                      ₹{service.price}{" "}
                      <Text style={styles.cardUnit}>{service.unit}</Text>
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.moreButton}
                    onPress={() => navigation.navigate("AddService", { editService: service })}
                  >
                    <Text style={styles.moreIcon}>⋮</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.cardDivider} />

                <View style={styles.skillsBlock}>
                  <Text style={styles.skillsLabel}>Sub-skills</Text>
                  <View style={styles.skillsRow}>
                    {service.skills.map((skill) => (
                      <View key={skill} style={styles.skillChip}>
                        <Text style={styles.skillText}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
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

        <TouchableOpacity style={styles.navItemActive}>
          <Text style={[styles.navIcon, styles.navIconActive]}>🛠️</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Services</Text>
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
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: "#333333",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  backIcon: {
    color: COLORS.text,
    fontSize: 20,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginRight: 8,
  },
  brandText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "700",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  mainSection: {
    marginTop: 32,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.textMuted,
  },
  addButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  addIcon: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "700",
  },
  listSection: {
    marginTop: 24,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    backgroundColor: COLORS.surfaceDark,
    padding: 16,
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  cardPrice: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
  },
  cardUnit: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textMuted,
  },
  moreButton: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  moreIcon: {
    color: COLORS.textMuted,
    fontSize: 18,
  },
  cardDivider: {
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderDark,
  },
  skillsBlock: {
    marginTop: 12,
  },
  skillsLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.textMuted,
  },
  skillsRow: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillChip: {
    borderRadius: 999,
    backgroundColor: "rgba(49,254,131,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "600",
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
    borderTopColor: COLORS.borderDark,
    backgroundColor: "rgba(26,26,26,0.9)",
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
