import React, { useState } from "react";
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

export default function SearchLocationScreen({ navigation, route }) {
  const { userId, phone, name } = route?.params || {};


  const [search, setSearch] = useState("");

 const handleConfirm = () => {
  navigation.replace("CustomerSetLocation", {
    userId,
    phone,
    name,
  });
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
          <Text style={styles.selectedTitle}>Selected Location</Text>

          <View style={styles.selectedCard}>
            <View style={styles.locationIconWrap}>
              <MaterialIcons name="location-on" size={24} color="#45D39A" />
            </View>
            <View style={styles.locationTextWrap}>
              <Text style={styles.locationTitle}>4140 Parker Rd.</Text>
              <Text style={styles.locationSubtitle}>
                Allentown, New Mexico 31134
              </Text>
            </View>
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
    paddingBottom: 8,
  },
  selectedTitle: {
    color: "#F6F8F6",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  selectedCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(24,24,27,0.8)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  locationIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(39,39,42,0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  locationTextWrap: {
    flex: 1,
  },
  locationTitle: {
    color: "#F6F8F6",
    fontSize: 16,
    fontWeight: "700",
  },
  locationSubtitle: {
    marginTop: 4,
    color: "#9CA3AF",
    fontSize: 13,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 4,
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
});
