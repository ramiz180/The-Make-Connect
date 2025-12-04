import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function RateReviewScreen({ navigation }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    alert("Thank you for your feedback!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rate Worker</Text>
      </View>

      {/* Worker Info */}
      <View style={styles.workerBox}>
        <Text style={styles.workerName}>Worker Name</Text>
        <Text style={styles.workerJob}>Plumber</Text>
      </View>

      {/* Rating Stars */}
      <Text style={styles.label}>Give Rating</Text>

      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity key={num} onPress={() => setRating(num)}>
            <Text
              style={[
                styles.star,
                { color: num <= rating ? "#FFD700" : "#999" },
              ]}
            >
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Review Input */}
      <Text style={[styles.label, { marginTop: 20 }]}>Write Review</Text>

      <TextInput
        style={styles.textArea}
        placeholder="Write your review..."
        multiline
        numberOfLines={4}
        value={review}
        onChangeText={setReview}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },

  header: {
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#0A84FF",
    borderRadius: 10,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },

  workerBox: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
  },

  workerName: {
    fontSize: 18,
    fontWeight: "600",
  },

  workerJob: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },

  label: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "500",
  },

  starRow: {
    flexDirection: "row",
    marginTop: 8,
  },

  star: {
    fontSize: 35,
    marginRight: 8,
  },

  textArea: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    height: 120,
    textAlignVertical: "top",
    marginTop: 10,
  },

  submitBtn: {
    backgroundColor: "#0A84FF",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
