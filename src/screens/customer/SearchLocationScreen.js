import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

/* ================== CONFIG ================== */
const GOOGLE_KEY = "AIzaSyB43OA5-4D61nQAeC5iXmLYQmDAEHQIgd8";
const API = "http://192.168.29.199:3000/api";
/* ============================================ */

export default function SearchLocationScreen({ navigation, route }) {
  const { userId, phone, name } = route.params || {};

  const [region, setRegion] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedSubtitle, setSelectedSubtitle] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  /* ================== INITIAL LOCATION ================== */
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      const initialRegion = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(initialRegion);
      updateAddressFromCoords(loc.coords);
    })();
  }, []);

  /* ================== REVERSE GEOCODE ================== */
  const updateAddressFromCoords = async (coords) => {
    const geo = await Location.reverseGeocodeAsync(coords);
    if (!geo.length) return;

    const g = geo[0];
    setSelectedTitle(
      [g.name || g.street, g.subregion || g.city].filter(Boolean).join(", ")
    );
    setSelectedSubtitle(
      [
        g.name,
        g.street,
        g.district,
        g.subregion || g.city,
        g.region,
        g.postalCode,
        g.country,
      ]
        .filter(Boolean)
        .join(", ")
    );
  };

  /* ================== CONFIRM ================== */
  const handleConfirm = () => {
    navigation.replace("CustomerSetLocation", {
      userId,
      phone,
      name,
      coords: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
    });
  };

  if (!region) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#F6F8F6" />
          </TouchableOpacity>

          <View style={{ alignItems: "center" }}>
            <Text style={styles.headerTitle}>Set Your Location</Text>
            <Text style={styles.headerSubtitle}>The Make Connect</Text>
          </View>

          <View style={{ width: 24 }} />
        </View>

        {/* SEARCH */}
        <GooglePlacesAutocomplete
          placeholder="Search address, area, landmark"
          fetchDetails
          debounce={300}
          listViewDisplayed="auto"
          enablePoweredByContainer={false}
          keyboardShouldPersistTaps="handled"
          onPress={(data, details = null) => {
            const loc = details.geometry.location;

            setRegion({
              latitude: loc.lat,
              longitude: loc.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });

            setSelectedTitle(
              details.name || data.structured_formatting?.main_text
            );
            setSelectedSubtitle(
              details.formatted_address || data.description
            );

            setIsSearching(false);
          }}
          query={{
            key: GOOGLE_KEY,
            language: "en",
            components: "country:in",
          }}
          textInputProps={{
            onFocus: () => setIsSearching(true),
            onChangeText: () => setIsSearching(true),
            placeholderTextColor: "#9CA3AF",
          }}
          styles={{
            container: { flex: 1, paddingHorizontal: 16 },
            textInput: styles.searchInput,
            listView: {
              backgroundColor: "#020617",
              borderRadius: 12,
              marginTop: 8,
            },
            row: { padding: 16 },
            description: { color: "#E5E7EB", fontSize: 14 },
            separator: { height: 1, backgroundColor: "#1F2937" },
          }}
        />

        {/* MAP + FOOTER */}
        {!isSearching && (
          <>
            <View style={styles.mapWrapper}>
              <MapView style={styles.map} region={region}>
                <Marker draggable coordinate={region} />
              </MapView>
            </View>

            <View style={styles.selectedCard}>
              <MaterialIcons name="location-on" size={22} color="#45D39A" />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.locationTitle}>{selectedTitle}</Text>
                <Text style={styles.locationSubtitle}>{selectedSubtitle}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmText}>Confirm & proceed</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

/* ================== STYLES ================== */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0A0A0A" },
  container: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 16 },
  headerTitle: { color: "#F6F8F6", fontSize: 18, fontWeight: "700" },
  headerSubtitle: { color: "#45D39A", fontSize: 12 },
  searchInput: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "rgba(24,24,27,0.95)",
    color: "#F6F8F6",
  },
  mapWrapper: { flex: 1, margin: 16, borderRadius: 16, overflow: "hidden" },
  map: { flex: 1 },
  selectedCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: "rgba(24,24,27,0.8)",
    borderRadius: 16,
  },
  locationTitle: { color: "#F6F8F6", fontSize: 16, fontWeight: "700" },
  locationSubtitle: { color: "#9CA3AF", fontSize: 13 },
  confirmButton: {
    height: 56,
    margin: 16,
    borderRadius: 16,
    backgroundColor: "#45D39A",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: { fontSize: 16, fontWeight: "700", color: "#000" },
});
