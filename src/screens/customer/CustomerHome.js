/*import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function CustomerHome({ navigation }) {
  const categories = [
    {
      id: 1,
      title: "Beauty Services",
      image: {
        uri:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      },
    },
    {
      id: 2,
      title: "Plumbing",
      image: {
        uri:
          "https://images.unsplash.com/photo-1581092919535-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
      },
    },
    {
      id: 3,
      title: "Electrical",
      image: {
        uri:
          "https://images.unsplash.com/photo-1581093448798-5fe5e3d8a5c1?auto=format&fit=crop&w=800&q=80",
      },
    },
    {
      id: 4,
      title: "Home Cleaning",
      image: {
        uri:
          "https://images.unsplash.com/photo-1581579188871-4b4b50c1d4e6?auto=format&fit=crop&w=800&q=80",
      },
    },
    {
      id: 5,
      title: "Handyman",
      image: {
        uri:
          "https://images.unsplash.com/photo-1597004891215-3f23c5f6b25f?auto=format&fit=crop&w=800&q=80",
      },
    },
    {
      id: 6,
      title: "Tutoring",
      image: {
        uri:
          "https://images.unsplash.com/photo-1588075592390-4816b9bd7c1f?auto=format&fit=crop&w=800&q=80",
      },
    },
  ];

  const workers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Master Plumber",
      image: {
        uri: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      rating: 4.9,
      distance: "1.2 km away",
    },
    {
      id: 2,
      name: "Maria Garcia",
      role: "Electrician",
      image: {
        uri: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      rating: 4.8,
      distance: "2.5 km away",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Ionicons name="menu" size={24} color="#d1d5db" />
          </View>
          <Text style={styles.brand}>The MakeConnect</Text>
          <TouchableOpacity style={styles.headerRight}>
            <Ionicons name="notifications-outline" size={22} color="#d1d5db" />
          </TouchableOpacity>
        </View>

        <View style={styles.greetingContainer}>
          <Text style={styles.hello}>Hello, Jane!</Text>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color="#00FF85" />
            <Text style={styles.locationText}>Mission District, San Francisco</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#A8B0BA" />
          <TextInput
            placeholder="Search for a service or worker..."
            placeholderTextColor="#A8B0BA"
            style={styles.searchInput}
          />
          <MaterialIcons name="tune" size={22} color="#00FF85" />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Services</Text>
        </View>

        <View style={styles.grid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.card}
              onPress={() => navigation.navigate("WorkerList", { category: cat })}
            >
              <Image source={cat.image} style={styles.cardImage} />
              <View style={styles.cardOverlay} />
              <Text style={styles.cardTitle}>{cat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Workers</Text>
        </View>

        <FlatList
          data={workers}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingRight: 20, paddingVertical: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.workerCard}
              onPress={() => navigation.navigate("WorkerProfile", { worker: item })}
            >
              <Image source={item.image} style={styles.workerImage} />
              <Text style={styles.workerName}>{item.name}</Text>
              <Text style={styles.workerRole}>{item.role}</Text>

              <View style={styles.rowCenter}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>

              <Text style={styles.distance}>{item.distance}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.chipsRow}>
          <TouchableOpacity style={[styles.chip, styles.chipActive]}>
            <Text style={styles.chipText}>Top Rated</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Available Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Verified</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Deals</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footerNav}>
        <View style={styles.navItem}>
          <Ionicons name="home" size={22} color="#00FF85" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
        </View>

        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Ionicons name="calendar" size={22} color="#9ca3af" />
          <Text style={styles.navLabel}>Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Ionicons name="chatbubble" size={22} color="#9ca3af" />
          <Text style={styles.navLabel}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Ionicons name="person" size={22} color="#9ca3af" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  headerLeft: {
    width: 40,
    alignItems: "flex-start",
  },
  headerRight: {
    width: 40,
    alignItems: "flex-end",
  },
  brand: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  greetingContainer: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 16,
  },
  hello: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#A8B0BA',
    fontSize: 14,
    marginLeft: 4,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f2933",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#1E2630",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#fff",
  },
  sectionHeader: {
    marginTop: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
  card: {
    width: "48%",
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: "#111827",
  },
  cardImage: {
    width: "100%",
    height: 110,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  cardTitle: {
    position: "absolute",
    left: 10,
    bottom: 10,
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  workerCard: {
    width: 180,
    backgroundColor: "#111827",
    borderRadius: 14,
    padding: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#1E2630",
    alignItems: "center",
  },
  workerImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  workerName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  workerRole: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 2,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  rating: {
    color: "#fff",
    marginLeft: 4,
    fontSize: 12,
  },
  distance: {
    color: "#A8B0BA",
    marginTop: 4,
    fontSize: 12,
  },
  chipsRow: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 8,
    columnGap: 8,
    flexWrap: "wrap",
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#1E2630",
  },
  chipActive: {
    backgroundColor: "rgba(0,255,133,0.18)",
    borderColor: "#00FF85",
  },
  chipText: {
    color: "#e5e7eb",
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
    backgroundColor: "#121212",
    borderTopWidth: 1,
    borderTopColor: "#1E2630",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navLabel: {
    marginTop: 4,
    fontSize: 10,
    color: "#9ca3af",
  },
  navLabelActive: {
    color: "#00FF85",
    fontWeight: "700",
  },
});*/







import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const API = "http://192.168.29.199:3000/api";

export default function CustomerHome({ navigation, route }) {
  const {
    latitude,
    longitude,
    name,
    address,
    userId: customerId, // ✅ LOGGED-IN USER ID
  } = route.params || {};

  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* ================= FETCH WORKERS ================= */
  useEffect(() => {
    if (!latitude || !longitude) {
      setErrorMsg("Location not available. Please set your location again.");
      return;
    }
    fetchNearbyWorkers();
  }, [latitude, longitude]);

  const fetchNearbyWorkers = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await axios.get(
        `${API}/customer/nearby-workers?latitude=${latitude}&longitude=${longitude}`
      );

      setWorkers(res.data.workers || []);
    } catch (err) {
      setErrorMsg("Failed to load nearby workers.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DISTANCE ================= */
  const getDistanceKm = (lat1, lon1, lat2, lon2) => {
    if (!lat2 || !lon2) return "Nearby";
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
  };

  /* ================= WORKER CARD ================= */
  const renderWorker = ({ item }) => {
    const services =
      item.services?.map((s) => s.name).join(", ") || "Service";

    const price = Number(item.services?.[0]?.price ?? 0);

    const [lng, lat] = item.geoLocation?.coordinates || [];

    const distance =
      lat && lng
        ? `${getDistanceKm(latitude, longitude, lat, lng)} km away`
        : "Nearby";

    return (
      <View style={styles.workerCard}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
          style={styles.workerImage}
        />

        <Text style={styles.workerName}>
          {item.userId?.name || "Worker"}
        </Text>

        <Text style={styles.workerRole}>🛠️ {services}</Text>
        <Text style={styles.distance}>{distance}</Text>

        {/* ACTIONS */}
        <View style={styles.workerActions}>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={() =>
              item.userId?.phone &&
              Linking.openURL(`tel:${item.userId.phone}`)
            }
          >
            <Text style={styles.btnText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.whatsBtn}
            onPress={() =>
              item.userId?.phone &&
              Linking.openURL(`https://wa.me/91${item.userId.phone}`)
            }
          >
            <Text style={styles.btnText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* ✅ BOOK NOW */}
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() =>
            navigation.navigate("CustomerBookingConfirm", {
              customerId, // ✅ CUSTOMER USER ID
              workerId: item.userId?._id, // ✅ WORKER USER ID

              worker: {
                name: item.userId?.name,
                role: services,
                hourlyRate: price,
                rating: 4.8,
                reviews: 120,
                avatar: {
                  uri: "https://randomuser.me/api/portraits/men/75.jpg",
                },
              },

              address: address || "Customer location",
            })
          }
        >
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <Ionicons name="menu" size={24} color="#d1d5db" />
          <Text style={styles.brand}>The MakeConnect</Text>
          <Ionicons name="notifications-outline" size={22} color="#d1d5db" />
        </View>

        {/* GREETING */}
        <View style={styles.greetingContainer}>
          <Text style={styles.hello}>Hello, {name || "Customer"}!</Text>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color="#00FF85" />
            <Text style={styles.locationText}>
              {address || "Your location"}
            </Text>
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#A8B0BA" />
          <TextInput
            placeholder="Search for a service..."
            placeholderTextColor="#A8B0BA"
            style={styles.searchInput}
          />
        </View>

        {/* WORKERS */}
        <Text style={styles.sectionTitle}>Nearby Workers</Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading workers...</Text>
        ) : errorMsg ? (
          <Text style={styles.emptyText}>{errorMsg}</Text>
        ) : (
          <FlatList
            data={workers}
            horizontal
            keyExtractor={(item) => item._id}
            renderItem={renderWorker}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footerNav}>
        <View style={styles.navItem}>
          <Ionicons name="home" size={22} color="#00FF85" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="calendar" size={22} color="#9ca3af" />
          <Text style={styles.navLabel}>Bookings</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="chatbubble" size={22} color="#9ca3af" />
          <Text style={styles.navLabel}>Messages</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="person" size={22} color="#9ca3af" />
          <Text style={styles.navLabel}>Profile</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 16 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  brand: { color: "#fff", fontSize: 18, fontWeight: "700" },

  greetingContainer: { marginTop: 10, marginBottom: 16 },
  hello: { fontSize: 26, fontWeight: "bold", color: "#fff" },
  locationContainer: { flexDirection: "row", alignItems: "center" },
  locationText: { color: "#A8B0BA", marginLeft: 4 },

  searchBar: {
    flexDirection: "row",
    backgroundColor: "#1f2933",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  searchInput: { flex: 1, color: "#fff", marginLeft: 10 },

  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 12 },

  workerCard: {
    width: 220,
    backgroundColor: "#111827",
    borderRadius: 14,
    padding: 14,
    marginRight: 12,
  },
  workerImage: { width: 64, height: 64, borderRadius: 32, alignSelf: "center" },
  workerName: { color: "#fff", fontWeight: "700", textAlign: "center" },
  workerRole: { color: "#9CA3AF", fontSize: 12, textAlign: "center", marginVertical: 4 },
  distance: { color: "#A8B0BA", textAlign: "center", fontSize: 12 },

  workerActions: { flexDirection: "row", marginTop: 10 },
  callBtn: {
    flex: 1,
    backgroundColor: "#00FF85",
    padding: 8,
    borderRadius: 8,
    marginRight: 6,
    alignItems: "center",
  },
  whatsBtn: {
    flex: 1,
    backgroundColor: "#25D366",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#000", fontWeight: "700", fontSize: 12 },

  bookBtn: {
    marginTop: 10,
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  bookBtnText: { color: "#fff", fontWeight: "700", fontSize: 13 },

  loadingText: { color: "#A8B0BA", textAlign: "center" },
  emptyText: { color: "#A8B0BA", textAlign: "center" },

  footerNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#121212",
    borderTopWidth: 1,
    borderTopColor: "#1E2630",
  },
  navItem: { alignItems: "center" },
  navLabel: { fontSize: 10, color: "#9ca3af" },
  navLabelActive: { color: "#00FF85", fontWeight: "700" },
});
