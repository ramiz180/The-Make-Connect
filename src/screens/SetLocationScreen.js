import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function SetLocationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const nextScreen = route.params?.nextScreen || 'CustomerHome';
  const userId = route.params?.userId; // Get from previous signup
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState('5 km');

  const radiusOptions = ['2 km', '5 km', '10 km', 'City-wide'];

  const handleConfirm = async () => {
    if (!location) {
      Alert.alert('Error', 'Please enter a location');
      return;
    }

    try {
      // Save location to backend
      await axios.post('http://YOUR_BACKEND_IP:5000/api/user/update-location', {
        userId,
        location,
        serviceRadius: radius,
      });

      // Navigate to CustomerHome
      navigation.replace(nextScreen);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to save location');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Location</Text>

      <TextInput
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <Text style={{ marginTop: 20 }}>Select Radius:</Text>
      <View style={styles.radiusRow}>
        {radiusOptions.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.radiusBtn, radius === item && styles.activeRadius]}
            onPress={() => setRadius(item)}
          >
            <Text style={[styles.radiusText, radius === item && styles.activeRadiusText]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginTop: 10 },
  radiusRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  radiusBtn: { padding: 10, borderRadius: 20, borderWidth: 1, borderColor: '#555' },
  activeRadius: { backgroundColor: '#58ff7d', borderColor: '#58ff7d' },
  radiusText: { color: '#555' },
  activeRadiusText: { color: '#000', fontWeight: '700' },
  confirmBtn: { backgroundColor: '#28a745', padding: 15, borderRadius: 12, marginTop: 20 },
  confirmText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
});
