import React from "react";
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
  // ⭐ UPDATED CATEGORY ARRAY WITH URL IMAGES ONLY
  const categories = [
    { 
      id: 1, 
      title: "Beauty Service", 
      image: { uri: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" }
    },
    { 
      id: 2, 
      title: "Plumbing", 
      image: { uri: "https://images.unsplash.com/photo-1581092919535-3346a1be7dee" }
    },
    { 
      id: 3, 
      title: "Electrical", 
      image: { uri: "https://images.unsplash.com/photo-1581093448798-5fe5e3d8a5c1" }
    },
    { 
      id: 4, 
      title: "Home Cleaning", 
      image: { uri: "https://images.unsplash.com/photo-1581579188871-4b4b50c1d4e6" }
    },
    { 
      id: 5, 
      title: "Handyman", 
      image: { uri: "https://images.unsplash.com/photo-1597004891215-3f23c5f6b25f" }
    },
    { 
      id: 6, 
      title: "Tutoring", 
      image: { uri: "https://images.unsplash.com/photo-1588075592390-4816b9bd7c1f" }
    }
  ];

  const workers = [
    {
      id: 1,
      name: "Rahul Sharma",
      image: { uri: "https://randomuser.me/api/portraits/men/75.jpg" },
      rating: 4.8,
      distance: "1.2 km away",
      jobs: 25,
    },
    {
      id: 2,
      name: "Anita Verma",
      image: { uri: "https://randomuser.me/api/portraits/women/65.jpg" },
      rating: 4.9,
      distance: "2.5 km away",
      jobs: 40,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.brand}>The Make Connect</Text>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
        </View>

        {/* Greeting */}
        <Text style={styles.hello}>Hello, Jane!</Text>

        {/* Search Input */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#A8B0BA" />
          <TextInput
            placeholder="Search for a service or worker..."
            placeholderTextColor="#A8B0BA"
            style={styles.searchInput}
          />
          <MaterialIcons name="tune" size={20} color="#00D786" />
        </View>

        {/* Categories Section */}
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
              <Text style={styles.cardTitle}>{cat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nearby Workers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Workers</Text>
        </View>

        <FlatList
          data={workers}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingRight: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.workerCard}
              onPress={() =>
                navigation.navigate("WorkerProfile", { worker: item })
              }
            >
              <Image source={item.image} style={styles.workerImage} />
              <Text style={styles.workerName}>{item.name}</Text>

              <View style={styles.rowCenter}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>

              <Text style={styles.distance}>{item.distance}</Text>

              <Text style={styles.jobs}>{item.jobs} Jobs Done</Text>

              <View style={styles.tagRow}>
                <Text style={styles.tag}>Top Rated</Text>
                <Text style={styles.tag}>Available Now</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// -------------------- STYLES --------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F15",
    paddingHorizontal: 16,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  brand: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  hello: {
    color: "#fff",
    fontSize: 22,
    marginTop: 10,
    fontWeight: "700",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121820",
    padding: 12,
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
    marginTop: 10,
  },
  card: {
    width: "48%",
    backgroundColor: "#121820",
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1E2630",
  },
  cardImage: {
    width: "100%",
    height: 110,
  },
  cardTitle: {
    color: "#fff",
    padding: 10,
    fontSize: 14,
    fontWeight: "600",
  },

  workerCard: {
    width: 160,
    backgroundColor: "#121820",
    borderRadius: 14,
    padding: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#1E2630",
  },
  workerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  workerName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  rating: {
    color: "#fff",
    marginLeft: 4,
  },
  distance: {
    color: "#A8B0BA",
    marginTop: 3,
    fontSize: 12,
  },
  jobs: {
    color: "#A8B0BA",
    fontSize: 12,
    marginTop: 3,
    marginBottom: 6,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  tag: {
    backgroundColor: "#00D786",
    color: "#000",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 10,
    fontWeight: "700",
  },
});

