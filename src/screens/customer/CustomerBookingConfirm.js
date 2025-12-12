import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function CustomerBookingConfirm({ navigation, route }) {
  const worker = route?.params?.worker || {
    name: "Alex Johnson",
    role: "Plumbing Repair",
    rating: 4.9,
    reviews: 124,
    avatar: { uri: "https://randomuser.me/api/portraits/men/32.jpg" },
    hourlyRate: 85,
  };

  const [address, setAddress] = useState(
    "502 West 41st Street, Austin, TX"
  );
  const [date, setDate] = useState("2023-10-25");
  const [time, setTime] = useState("02:00 PM");
  const [notes, setNotes] = useState("");

  const handleConfirm = () => {
    // TODO: integrate API and then navigate to success screen
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color="#e5e7eb" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Booking</Text>
        <View style={styles.headerIcon}>
          <Ionicons name="ellipsis-vertical" size={20} color="#9ca3af" />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 140, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Worker card */}
        <View style={styles.workerCard}>
          <View style={styles.workerTop}>
            <View style={styles.workerAvatarWrap}>
              <Image source={worker.avatar} style={styles.workerAvatar} />
              <View style={styles.workerVerified}>
                <Ionicons name="checkmark-circle" size={16} color="#00FF85" />
              </View>
            </View>

            <View style={{ alignItems: "center" }}>
              <Text style={styles.workerName}>{worker.name}</Text>
              <View style={styles.workerTagWrap}>
                <Text style={styles.workerTagText}>{worker.role}</Text>
              </View>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FACC15" />
                <Text style={styles.ratingText}>{worker.rating.toFixed(1)}</Text>
                <Text style={styles.ratingSubText}>
                  ({worker.reviews} reviews)
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Hourly Rate</Text>
            <Text style={styles.rateValue}>
              ${worker.hourlyRate.toFixed(2)}
              <Text style={styles.rateUnit}> / hr</Text>
            </Text>
          </View>
        </View>

        {/* Service Location */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Service Location</Text>
          <View style={styles.locationInputWrap}>
            <Ionicons name="location" size={18} color="#00FF85" />
            <TextInput
              style={styles.locationInput}
              placeholder="Enter service address"
              placeholderTextColor="#6b7280"
              value={address}
              onChangeText={setAddress}
            />
            <Ionicons name="locate" size={18} color="#9ca3af" />
          </View>
        </View>

        {/* Date & Time */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Date & Time</Text>
          <View style={styles.rowGap}>
            <TouchableOpacity style={styles.dateBox}>
              <Text style={styles.dateText}>{date}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.timeBox}>
              <Ionicons
                name="time-outline"
                size={18}
                color="#00FF85"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.timeText}>{time}</Text>
              <Ionicons
                name="chevron-down"
                size={16}
                color="#9ca3af"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Special Instructions */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Special Instructions</Text>
            <Text style={styles.optionalLabel}>Optional</Text>
          </View>

          <View style={styles.notesWrap}>
            <TextInput
              style={styles.notesInput}
              multiline
              placeholder="Describe your issue in detail or leave special instructions for entry (e.g., Gate code is 1234)..."
              placeholderTextColor="#6b7280"
              value={notes}
              onChangeText={setNotes}
            />

            <View style={styles.notesBottomRow}>
              <View style={styles.notesIconRow}>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="camera" size={18} color="#00FF85" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="mic" size={18} color="#00FF85" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="location" size={18} color="#00FF85" />
                </TouchableOpacity>
              </View>
              <Text style={styles.charCount}>{notes.length}/500</Text>
            </View>
          </View>
        </View>

        {/* Payment method */}
        <View style={styles.paymentCard}>
          <View style={styles.paymentLeft}>
            <View style={styles.paymentIconWrap}>
              <Ionicons name="card" size={18} color="#fff" />
            </View>
            <View>
              <Text style={styles.paymentTitle}>Payment Method</Text>
              <Text style={styles.paymentSub}>Visa ending in 4242</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.paymentChange}>Change</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm Book</Text>
          <Ionicons name="arrow-forward" size={18} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  headerIcon: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  workerCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#27272f",
  },
  workerTop: {
    alignItems: "center",
  },
  workerAvatarWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "rgba(0,255,133,0.25)",
    marginBottom: 8,
  },
  workerAvatar: {
    width: "100%",
    height: "100%",
  },
  workerVerified: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#111827",
    borderRadius: 999,
    padding: 2,
  },
  workerName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  workerTagWrap: {
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(0,255,133,0.16)",
    marginBottom: 6,
  },
  workerTagText: {
    color: "#00FF85",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingText: {
    color: "#fff",
    fontSize: 13,
    marginLeft: 4,
  },
  ratingSubText: {
    color: "#9ca3af",
    fontSize: 12,
    marginLeft: 4,
  },
  rateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#27272f",
  },
  rateLabel: {
    color: "#9ca3af",
    fontSize: 13,
  },
  rateValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  rateUnit: {
    color: "#9ca3af",
    fontSize: 11,
  },
  sectionBlock: {
    marginTop: 24,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  locationInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#374151",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  locationInput: {
    flex: 1,
    color: "#fff",
    marginHorizontal: 8,
    fontSize: 14,
  },
  rowGap: {
    flexDirection: "row",
    columnGap: 10,
  },
  dateBox: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  dateText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
  timeBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#374151",
    paddingHorizontal: 12,
  },
  timeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  optionalLabel: {
    color: "#6b7280",
    fontSize: 11,
  },
  notesWrap: {
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#374151",
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 6,
  },
  notesInput: {
    color: "#fff",
    fontSize: 13,
    minHeight: 80,
    textAlignVertical: "top",
  },
  notesBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#374151",
    paddingTop: 6,
  },
  notesIconRow: {
    flexDirection: "row",
    columnGap: 4,
  },
  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  charCount: {
    color: "#6b7280",
    fontSize: 11,
  },
  paymentCard: {
    marginTop: 24,
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#374151",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  paymentIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  paymentTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  paymentSub: {
    color: "#9ca3af",
    fontSize: 11,
  },
  paymentChange: {
    color: "#00FF85",
    fontSize: 13,
    fontWeight: "600",
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#121212",
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
  },
  confirmBtn: {
    backgroundColor: "#00FF85",
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 6,
  },
  cancelBtn: {
    marginTop: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#374151",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    color: "#e5e7eb",
    fontSize: 15,
    fontWeight: "600",
  },
});
