import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WorkerSetLocationScreen({ navigation, route }) {
  const { nextScreen, userId, phone, name } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState(null);
  const [areaName, setAreaName] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");
  const [directions, setDirections] = useState("");
  const [saveAs, setSaveAs] = useState("home");

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Permission denied. Please allow location access.");
          setLoading(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const currentCoords = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };

        setCoords(currentCoords);

        const geocode = await Location.reverseGeocodeAsync(currentCoords);
        if (geocode && geocode.length > 0) {
          const g = geocode[0];
          const areaParts = [g.name || g.street, g.subregion || g.city].filter(
            Boolean
          );
          const title = areaParts.join(", ");
          setAreaName(title || "Current Location");

          const addressParts = [
            g.name,
            g.street,
            g.district,
            g.subregion || g.city,
            g.region,
            g.postalCode,
            g.country,
          ].filter(Boolean);
          setFullAddress(addressParts.join(", "));
        } else {
          setAreaName("Current Location");
          setFullAddress("");
        }
      } catch (error) {
        setCoords(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleConfirm = () => {
    if (!coords) return;

    navigation.navigate(nextScreen, {
      userId,
      phone,
      name,
      location: coords,
      address: {
        areaName,
        fullAddress,
        house,
        apartment,
        directions,
        label: saveAs,
      },
    });
  };

  const renderSaveAsChip = (value, iconLabel, text) => {
    const selected = saveAs === value;
    return (
      <TouchableOpacity
        onPress={() => setSaveAs(value)}
        style={[styles.chip, selected && styles.chipSelected]}
      >
        <Text style={[styles.chipIcon, selected && styles.chipIconSelected]}>
          {iconLabel}
        </Text>
        <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerImageWrapper}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800",
            }}
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay} />
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backIcon}>{"<"}</Text>
            </TouchableOpacity>
            <View style={styles.headerTitleWrap}>
              <Text style={styles.headerTitle}>Enter Address</Text>
              <Text style={styles.headerSubtitle}>The Make Connect</Text>
            </View>
            <View style={styles.headerSpacer} />
          </View>
        </View>

        <View style={styles.mainCardWrapper}>
          {loading ? (
            <View style={styles.loaderWrap}>
              <ActivityIndicator size="large" color="#45D39A" />
              <Text style={styles.loadText}>Fetching your location...</Text>
            </View>
          ) : !coords ? (
            <Text style={styles.error}>Unable to fetch location</Text>
          ) : (
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.addressHeader}>
                <View style={styles.addressIconWrap}>
                  <Text style={styles.addressIcon}>📍</Text>
                </View>
                <View style={styles.addressTextWrap}>
                  <Text style={styles.addressTitle} numberOfLines={1}>
                    {areaName || "Current Location"}
                  </Text>
                  {!!fullAddress && (
                    <Text style={styles.addressSubtitle} numberOfLines={2}>
                      {fullAddress}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.infoBanner}>
                <View style={styles.infoIconWrap}>
                  <Text style={styles.infoIcon}>i</Text>
                </View>
                <Text style={styles.infoText}>
                  A detailed address will help our Delivery Partner reach your
                  doorstep easily.
                </Text>
              </View>

              <View style={styles.fieldGroup}>
                <View style={styles.fieldWrapper}>
                  <Text style={styles.fieldLabel}>HOUSE / FLAT / BLOCK NO.</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Flat 4B, Block A"
                    placeholderTextColor="#6B7280"
                    value={house}
                    onChangeText={setHouse}
                  />
                </View>

                <View style={styles.fieldWrapper}>
                  <Text style={styles.fieldLabel}>APARTMENT / ROAD / AREA</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Sunshine Apartments"
                    placeholderTextColor="#6B7280"
                    value={apartment}
                    onChangeText={setApartment}
                  />
                </View>
              </View>

              <View style={styles.fieldGroupAlt}>
                <Text style={styles.fieldLabel}>DIRECTIONS TO REACH (OPTIONAL)</Text>

                <TouchableOpacity style={styles.voiceButton}>
                  <Text style={styles.voiceButtonText}>
                    Tap to record voice directions
                  </Text>
                  <View style={styles.voiceButtonIconWrap}>
                    <Text style={styles.voiceButtonIcon}>🎤</Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.textAreaWrapper}>
                  <TextInput
                    style={styles.textArea}
                    multiline
                    placeholder="e.g. Ring the bell on the red gate"
                    placeholderTextColor="#6B7280"
                    value={directions}
                    onChangeText={setDirections}
                  />
                  <Text style={styles.charCount}>
                    {directions.length}/200
                  </Text>
                </View>
              </View>

              <View style={styles.saveAsWrapper}>
                <Text style={styles.fieldLabel}>SAVE AS</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.chipRow}
                >
                  {renderSaveAsChip("home", "🏠", "Home")}
                  {renderSaveAsChip("work", "💼", "Work")}
                  {renderSaveAsChip("other", "📍", "Other")}
                  {renderSaveAsChip("friends", "👥", "Friends & Family")}
                </ScrollView>
              </View>
            </ScrollView>
          )}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.btn, (!coords || loading) && styles.disabled]}
            disabled={!coords || loading}
            onPress={handleConfirm}
          >
            <Text style={styles.btnText}>ENTER HOUSE / FLAT / BLOCK NO.</Text>
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
  headerImageWrapper: {
    height: 180,
    width: "100%",
    overflow: "hidden",
  },
  headerImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  headerTitleWrap: {
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  headerSubtitle: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "#45D39A",
    fontSize: 10,
    fontWeight: "700",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  mainCardWrapper: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  loaderWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadText: {
    marginTop: 10,
    color: "#E5E7EB",
  },
  error: {
    color: "#F87171",
    textAlign: "center",
    marginTop: 20,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  addressIconWrap: {
    marginRight: 8,
    marginTop: 2,
  },
  addressIcon: {
    fontSize: 24,
  },
  addressTextWrap: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  addressSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#9CA3AF",
  },
  infoBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#1F1F1F",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(69,211,154,0.2)",
    marginBottom: 20,
  },
  infoIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(69,211,154,0.1)",
    marginRight: 8,
  },
  infoIcon: {
    color: "#45D39A",
    fontWeight: "700",
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: "#D1D5DB",
  },
  fieldGroup: {
    marginBottom: 20,
  },
  fieldWrapper: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#6B7280",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    backgroundColor: "#1F1F1F",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#111827",
  },
  fieldGroupAlt: {
    marginBottom: 20,
  },
  voiceButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1F1F1F",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#111827",
    marginBottom: 10,
  },
  voiceButtonText: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  voiceButtonIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  voiceButtonIcon: {
    fontSize: 16,
    color: "#9CA3AF",
  },
  textAreaWrapper: {
    position: "relative",
  },
  textArea: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "#1F1F1F",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#111827",
    textAlignVertical: "top",
  },
  charCount: {
    position: "absolute",
    right: 12,
    bottom: 8,
    fontSize: 10,
    color: "#6B7280",
  },
  saveAsWrapper: {
    marginBottom: 12,
  },
  chipRow: {
    paddingVertical: 4,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#1F1F1F",
    borderWidth: 1,
    borderColor: "#111827",
    marginRight: 10,
  },
  chipSelected: {
    backgroundColor: "#45D39A",
    borderColor: "#45D39A",
  },
  chipIcon: {
    marginRight: 6,
    fontSize: 16,
    color: "#9CA3AF",
  },
  chipIconSelected: {
    color: "#000000",
  },
  chipText: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  chipTextSelected: {
    color: "#000000",
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 4,
    backgroundColor: "rgba(10,10,10,0.98)",
  },
  btn: {
    height: 56,
    backgroundColor: "#45D39A",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#45D39A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },
  disabled: {
    opacity: 0.6,
  },
  btnText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
