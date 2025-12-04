import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";

export default function WorkerSetLocationScreen({ navigation, route }) {
  const { nextScreen, userId, phone, name } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied. Please allow location access.");
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setCoords({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      setLoading(false);
    })();
  }, []);

  const handleConfirm = () => {
    if (!coords) return;

    navigation.navigate(nextScreen, {
      userId,
      phone,
      name,
      location: coords,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Set Your Location</Text>
      <Text style={styles.sub}>
        This helps us show workers and services nearby.
      </Text>

      {loading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color="#00D786" />
          <Text style={styles.loadText}>Fetching location...</Text>
        </View>
      ) : coords ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={coords} />
        </MapView>
      ) : (
        <Text style={styles.error}>Unable to fetch location</Text>
      )}

      <TouchableOpacity
        style={[styles.btn, !coords && styles.disabled]}
        disabled={!coords}
        onPress={handleConfirm}
      >
        <Text style={styles.btnText}>Confirm Location</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F15",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  sub: {
    color: "#A8B0BA",
    marginTop: 4,
    marginBottom: 20,
  },
  loaderWrap: {
    alignItems: "center",
    marginTop: 50,
  },
  loadText: {
    marginTop: 10,
    color: "#fff",
  },
  error: {
    color: "#ff6b6b",
    textAlign: "center",
    marginTop: 20,
  },
  map: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  btn: {
    backgroundColor: "#00D786",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  disabled: {
    opacity: 0.5,
  },
  btnText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
});
