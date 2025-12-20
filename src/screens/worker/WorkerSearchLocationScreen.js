/*import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

export default function WorkerSearchLocationScreen({ navigation, route }) {
  const { userId, phone, name, finalNextScreen = "WorkerHome" } =
    route?.params || {};

  const [search, setSearch] = useState("");
  const [radius, setRadius] = useState("5 km");

  const handleConfirm = () => {
    navigation.replace("WorkerSetLocationScreen", {
      userId,
      phone,
      name,
      nextScreen: finalNextScreen,
      radius,
    });
  };

  const renderRadiusChip = (label) => {
    const selected = radius === label;
    return (
      <TouchableOpacity
        key={label}
        style={[styles.radiusChip, selected && styles.radiusChipSelected]}
        onPress={() => setRadius(label)}
      >
        <Text
          style={[styles.radiusChipText, selected && styles.radiusChipTextSelected]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#F6F8F6" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Set Your Location</Text>
            <Text style={styles.headerSubtitle}>The Make Connect</Text>
          </View>

          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="my-location" size={24} color="#F6F8F6" />
          </TouchableOpacity>
        </View>

        <View style={styles.mapWrapper}>
          <ImageBackground
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-xSV9TCdDbo1hdy_jCXVrRIm9m4me932-f6_T7Mq250TyFEDclFABhpG0rzr6urXnlnEKC7ghVzNQhT2kvVaITIFs3p__2KtnnPiyzbkBw5ZNyKOuanCmmgJDe8FsjKh0vEIlNUKKdXEQ-tG5Jrvx22VzGkcPUA6X0DTzOc3wjF84YlhtvuvUhvNPS_q6NbKwfKkPdTghV-xdZbJ16UZ1xzYXrObpkIsfNKHF51UYGV8fP3p19NTF03Xoxh0huzAEMwWrdq-Krp8",
            }}
            style={styles.mapImage}
          >
            <View style={styles.mapOverlay} />

            <View style={styles.searchBarWrapper}>
              <View style={styles.searchBarInner}>
                <MaterialIcons
                  name="search"
                  size={20}
                  color="rgba(148,163,184,1)"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search address, city, or zip code"
                  placeholderTextColor="rgba(148,163,184,1)"
                  value={search}
                  onChangeText={setSearch}
                />
              </View>
            </View>

            <View style={styles.mapControlsWrapper}>
              <View style={styles.zoomButtons}>
                <TouchableOpacity style={[styles.roundButton, styles.roundTop]}>
                  <MaterialIcons
                    name="add"
                    size={22}
                    color="#F6F8F6"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.roundButton, styles.roundBottom]}>
                  <MaterialIcons
                    name="remove"
                    size={22}
                    color="#F6F8F6"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.roundButton}>
                <MaterialIcons
                  name="navigation"
                  size={22}
                  color="#F6F8F6"
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <Text style={styles.helperText}>Move the map to set your location</Text>

        <View style={styles.selectedSection}>
          <View style={styles.selectedCard}>
            <View style={styles.locationIconWrap}>
              <MaterialIcons name="location-on" size={24} color="#45D39A" />
            </View>
            <View style={styles.locationTextWrap}>
              <Text style={styles.selectedLabel}>Selected Address</Text>
              <Text style={styles.locationTitle}>
                1234 Main St, San Francisco, CA 94122
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.radiusSection}>
          <Text style={styles.radiusTitle}>Set Your Service Radius</Text>
          <View style={styles.radiusRow}>
            {['2 km', '5 km', '10 km', 'City-wide'].map(renderRadiusChip)}
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  iconButton: {
    width: 48,
    height: 48,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerCenter: {
    alignItems: "center",
  },
  headerTitle: {
    color: "#F6F8F6",
    fontSize: 18,
    fontWeight: "700",
  },
  headerSubtitle: {
    marginTop: 2,
    color: "#45D39A",
    fontSize: 12,
    fontWeight: "600",
  },
  mapWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  mapImage: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  searchBarWrapper: {
    padding: 16,
  },
  searchBarInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(24,24,27,0.8)",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: "#F6F8F6",
  },
  mapControlsWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 16,
  },
  zoomButtons: {
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(24,24,27,0.8)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  roundTop: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  roundBottom: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginBottom: 0,
  },
  helperText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 13,
    paddingTop: 8,
    paddingBottom: 12,
  },
  selectedSection: {
    paddingHorizontal: 16,
  },
  selectedCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  locationIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#27272A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  locationTextWrap: {
    flex: 1,
  },
  selectedLabel: {
    color: "#9CA3AF",
    fontSize: 12,
    marginBottom: 2,
  },
  locationTitle: {
    color: "#F6F8F6",
    fontSize: 14,
    fontWeight: "700",
  },
  radiusSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  radiusTitle: {
    color: "#F6F8F6",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  radiusRow: {
    flexDirection: "row",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 4,
  },
  radiusChip: {
    flex: 1,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  radiusChipSelected: {
    backgroundColor: "#45D39A",
  },
  radiusChipText: {
    color: "#D4D4D8",
    fontSize: 13,
  },
  radiusChipTextSelected: {
    color: "#000000",
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10,
    backgroundColor: "#0A0A0A",
  },
  confirmButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#45D39A",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
  },
});*/













import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

/* ================== CONFIG ================== */

// ✅ Google Maps API Key (NO .env)
const GOOGLE_MAPS_KEY = "AIzaSyB43OA5-4D61nQAeC5iXmLYQmDAEHQIgd8";

const API = "http://192.168.29.199:3000/api";

/* ============================================ */

export default function WorkerSearchLocationScreen({ navigation, route }) {
  const { userId, phone, name, finalNextScreen = "WorkerHome" } =
    route?.params || {};

  const [region, setRegion] = useState(null);
  const [radius, setRadius] = useState("5 km");

  /* ================== GET CURRENT LOCATION ================== */

  useEffect(() => {
    (async () => {
      const { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  /* ================== CONFIRM ================== */

  const handleConfirm = () => {
    if (!region) return;

    navigation.replace("WorkerSetLocationScreen", {
      userId,
      phone,
      name,
      nextScreen: finalNextScreen,
      radius,
      coords: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
    });
  };

  /* ================== RADIUS UI ================== */

  const renderRadiusChip = (label) => {
    const selected = radius === label;
    return (
      <TouchableOpacity
        key={label}
        style={[styles.radiusChip, selected && styles.radiusChipSelected]}
        onPress={() => setRadius(label)}
      >
        <Text
          style={[
            styles.radiusChipText,
            selected && styles.radiusChipTextSelected,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  if (!region) return null;

  /* ================== RENDER ================== */

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#F6F8F6" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Set Your Location</Text>
            <Text style={styles.headerSubtitle}>The Make Connect</Text>
          </View>

          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="my-location" size={24} color="#F6F8F6" />
          </TouchableOpacity>
        </View>

        {/* GOOGLE PLACES SEARCH */}
        <GooglePlacesAutocomplete
          placeholder="Search address, area..."
          fetchDetails
          onPress={(data, details = null) => {
            const loc = details.geometry.location;
            setRegion({
              latitude: loc.lat,
              longitude: loc.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: "en",
          }}
          styles={{
            container: styles.searchContainer,
            textInput: styles.searchInput,
            listView: { backgroundColor: "#fff" },
          }}
        />

        {/* MAP */}
        <View style={styles.mapWrapper}>
          <MapView
            style={styles.map}
            provider="google"
            region={region}
            onRegionChangeComplete={setRegion}
          >
            <Marker
              draggable
              coordinate={region}
              onDragEnd={(e) =>
                setRegion({
                  ...region,
                  ...e.nativeEvent.coordinate,
                })
              }
            />
          </MapView>
        </View>

        {/* RADIUS */}
        <View style={styles.radiusSection}>
          <Text style={styles.radiusTitle}>Set Your Service Radius</Text>
          <View style={styles.radiusRow}>
            {["2 km", "5 km", "10 km", "City-wide"].map(renderRadiusChip)}
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmText}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ================== STYLES ================== */

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0A0A0A" },
  container: { flex: 1, backgroundColor: "#0A0A0A" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },

  iconButton: { width: 40 },
  headerCenter: { alignItems: "center" },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  headerSubtitle: { color: "#45D39A", fontSize: 12 },

  searchContainer: {
    position: "absolute",
    top: 80,
    width: "100%",
    zIndex: 10,
    paddingHorizontal: 16,
  },

  searchInput: {
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  mapWrapper: {
    flex: 1,
    marginTop: 80,
  },

  map: {
    flex: 1,
  },

  radiusSection: {
    padding: 16,
  },

  radiusTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  radiusRow: {
    flexDirection: "row",
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 4,
  },

  radiusChip: {
    flex: 1,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  radiusChipSelected: {
    backgroundColor: "#45D39A",
    borderRadius: 8,
  },

  radiusChipText: { color: "#D4D4D8" },
  radiusChipTextSelected: { color: "#000", fontWeight: "600" },

  footer: {
    padding: 16,
  },

  confirmButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#45D39A",
    alignItems: "center",
    justifyContent: "center",
  },

  confirmText: { color: "#000", fontWeight: "700", fontSize: 16 },
});

