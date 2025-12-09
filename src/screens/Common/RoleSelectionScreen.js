import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

export default function RoleSelectionScreen({ navigation, route }) {
  const fakeUserId = "1234567890";
  const { phone, name } = route.params || {};

  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (!selected) return;

    if (selected === "CUSTOMER") {
      navigation.navigate("CustomerSetLocation", {
        nextScreen: "CustomerTabs",  // ✅ Changed to CustomerTabs
        userId: fakeUserId,
        phone,
        name,
      });
    } else {
      navigation.navigate("WorkerSetLocationScreen", {
        nextScreen: "WorkerHome",

        userId: fakeUserId,
        phone,
        name,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* ---------- HEADER ---------- */}
        <View style={styles.headerContainer}>
          <View style={styles.row}>
            <MaterialIcons name="handyman" size={24} color="#00D786" />
            <Text style={styles.brandText}> The Make Connect</Text>
          </View>

          {/* Progress */}
          <View style={styles.progressBar}>
            <View style={styles.progressFill}></View>
          </View>
        </View>

        {/* Main Title */}
        <Text style={styles.headerText}>
          Welcome! How will you be{"\n"}using the app?
        </Text>

        {/* ---------- CUSTOMER CARD ---------- */}
        <TouchableOpacity
          style={[
            styles.card,
            selected === "CUSTOMER" && styles.selectedCard,
          ]}
          onPress={() => setSelected("CUSTOMER")}
        >
          <Image
            source={{
              uri: "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800",
            }}
            style={styles.cardImageTop}
          />

          <View style={styles.cardTextBox}>
            <Text style={styles.cardTitle}>I Want to Hire</Text>
            <Text style={styles.cardSub}>
              Find and book skilled professionals near you.
            </Text>
          </View>
        </TouchableOpacity>

        {/* ---------- WORKER CARD ---------- */}
        <TouchableOpacity
          style={[
            styles.card,
            selected === "WORKER" && styles.selectedCard,
          ]}
          onPress={() => setSelected("WORKER")}
        >
          <Image
            source={{
              uri: "https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg?auto=compress&cs=tinysrgb&w=800",
            }}
            style={styles.cardImageTop}
          />

          <View style={styles.cardTextBox}>
            <Text style={styles.cardTitle}>I am a Worker</Text>
            <Text style={styles.cardSub}>
              Find local jobs and manage your work.
            </Text>
          </View>
        </TouchableOpacity>

        {/* ---------- CONTINUE BUTTON ---------- */}
        <TouchableOpacity
          style={[styles.continueBtn, !selected && styles.disabled]}
          disabled={!selected}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        {/* ---------- Bottom Link ---------- */}
        <TouchableOpacity style={styles.bottomLinkWrap}>
          <Text style={styles.bottomLink}>Which one should I choose?</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F15",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 60,
  },

  /* HEADER TOP */
  headerContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
    marginLeft: 5,
  },

  progressBar: {
    width: "100%",
    height: 5,
    backgroundColor: "#1C2530",
    borderRadius: 3,
    marginTop: 12,
    overflow: "hidden",
  },
  progressFill: {
    width: "45%",
    height: "100%",
    backgroundColor: "#00D786",
  },

  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
    marginBottom: 25,
  },

  /* CARD STYLE */
  card: {
    backgroundColor: "#121820",
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: "#1E2630",
    overflow: "hidden",
  },

  selectedCard: {
    borderColor: "#00D786",
    backgroundColor: "rgba(0, 215, 134, 0.08)",
  },

  cardImageTop: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  cardTextBox: {
    padding: 18,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },
  cardSub: {
    color: "#A8B0BA",
    fontSize: 14,
    lineHeight: 20,
  },

  /* BUTTON */
  continueBtn: {
    backgroundColor: "#00D786",
    padding: 17,
    borderRadius: 12,
    marginTop: 15,
  },
  disabled: {
    opacity: 0.4,
  },
  continueText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },

  bottomLinkWrap: {
    alignItems: "center",
    marginTop: 10,
  },

  bottomLink: {
    color: "#70B9FF",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
