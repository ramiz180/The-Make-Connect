import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export default function RoleSelectionScreen({ navigation, route }) {

  // Incoming data from OTP screen
  const { phone, name } = route.params || {};

  const handleSelectRole = async (role) => {
    try {
      const res = await axios.post("http://192.168.1.5:5000/api/auth/signup", {
        name,
        phone,
        role,
      });

      const userId = res.data.user._id;

      if (role === "CUSTOMER") {
        navigation.navigate("SetLocation", {
          nextScreen: "CustomerHome",
          userId,
        });
      } else {
        navigation.navigate("WorkerSetup", { userId });
      }

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to save role");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose your Role</Text>

      <TouchableOpacity style={styles.card} onPress={() => handleSelectRole("CUSTOMER")}>
        <Text style={styles.cardTitle}>I want to Hire</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => handleSelectRole("WORKER")}>
        <Text style={styles.cardTitle}>I want to Work</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30 },
  card: { padding: 20, backgroundColor: "#f9f9f9", borderRadius: 12, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
});
