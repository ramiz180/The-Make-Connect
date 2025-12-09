import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function BookingScreen({ route, navigation }) {

  // SAFE PARAM CHECK
  const worker = route?.params?.worker;

  if (!worker) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <Text style={{ color:"#fff", fontSize:16 }}>Worker data not found!</Text>
      </View>
    );
  }

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [selectedTime, setSelectedTime] = useState(null);
  const [address, setAddress] = useState("");

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM",
    "06:00 PM",
  ];

  const onChange = (event, selected) => {
    setShowPicker(false);
    if (selected) setDate(selected);
  };

  const handleConfirm = () => {
    if (!selectedTime || !address) {
      alert("Please select time & enter address");
      return;
    }

    navigation.navigate("OrderSummary", {
      worker,
      date: date.toDateString(),
      time: selectedTime,
      address,
      notes: "No notes added",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Service</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Worker Info */}
        <View style={styles.workerBox}>
          <Text style={styles.workerName}>{worker.name}</Text>

          <View style={styles.rowCenter}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{worker.rating}</Text>
            <Text style={styles.jobs}> • {worker.jobs} Jobs</Text>
          </View>
        </View>

        {/* Date Picker */}
        <Text style={styles.label}>Select Date</Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setShowPicker(true)}
        >
          <Ionicons name="calendar-outline" size={20} color="#9BA1A8" />
          <Text style={styles.inputText}>
            {date.toDateString()}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker value={date} mode="date" onChange={onChange} />
        )}

        {/* Time Slot Selection */}
        <Text style={styles.label}>Select Time</Text>

        <View style={styles.timeContainer}>
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot}
              style={[
                styles.timeSlot,
                selectedTime === slot && styles.timeSlotActive,
              ]}
              onPress={() => setSelectedTime(slot)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === slot && styles.timeTextActive,
                ]}
              >
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Address Input */}
        <Text style={styles.label}>Your Address</Text>

        <TextInput
          style={styles.addressInput}
          placeholder="Enter full address..."
          placeholderTextColor="#7E8592"
          multiline
          value={address}
          onChangeText={setAddress}
        />

        {/* Price Summary */}
        <View style={styles.priceBox}>
          <Text style={styles.priceLabel}>Estimated Price</Text>
          <Text style={styles.price}>₹299</Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.bookContainer}>
        <TouchableOpacity style={styles.bookBtn} onPress={handleConfirm}>
          <Text style={styles.bookText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
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
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  workerBox: {
    backgroundColor: "#121820",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#1E2630",
  },
  workerName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  rating: {
    color: "#FFD700",
    marginLeft: 6,
  },
  jobs: {
    color: "#9BA1A8",
    marginLeft: 6,
  },

  label: {
    color: "#fff",
    marginTop: 22,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "700",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121820",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1E2630",
  },
  inputText: {
    color: "#fff",
    marginLeft: 12,
    fontSize: 14,
  },

  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  timeSlot: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1E2630",
    backgroundColor: "#121820",
    marginRight: 10,
    marginBottom: 10,
  },
  timeSlotActive: {
    backgroundColor: "#00D786",
    borderColor: "#00D786",
  },
  timeText: {
    color: "#9BA1A8",
    fontSize: 14,
    fontWeight: "600",
  },
  timeTextActive: {
    color: "#000",
  },

  addressInput: {
    backgroundColor: "#121820",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1E2630",
    color: "#fff",
    fontSize: 14,
    minHeight: 80,
  },

  priceBox: {
    backgroundColor: "#121820",
    marginTop: 30,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1E2630",
  },
  priceLabel: {
    color: "#9BA1A8",
    fontSize: 14,
  },
  price: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 6,
  },

  bookContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#0B0F15",
  },
  bookBtn: {
    backgroundColor: "#00D786",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  bookText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },
});
