import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

// ✅ USE YOUR CORRECT PC IP
const BASE_URL = "http://192.168.29.199:3000";

const OTPScreen = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;

    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/api/auth/verify-otp`,
        {
          phone: phoneNumber,
          otp: code,
        }
      );

      if (res.data.success) {
        // ✅ ALWAYS GO TO ROLE SELECTION
        navigation.replace("RoleSelection", {
          userId: res.data.userId,
          phone: phoneNumber, // 🔥 MUST PASS
        });
      }
    } catch (err) {
      console.log("OTP verify error:", err.response?.data || err.message);
      Alert.alert("Error", "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const isOtpComplete = otp.every((d) => d !== "");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />

      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1521790797524-3f202c3b5325",
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />

        <SafeAreaView style={styles.contentContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>The Make Connect</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.mainContent}>
            <Text style={styles.title}>Enter Verification Code</Text>
            <Text style={styles.subtitle}>
              Sent to +91{phoneNumber}
            </Text>

            <View style={styles.otpContainer}>
              {otp.map((d, i) => (
                <TextInput
                  key={i}
                  ref={(r) => (inputRefs.current[i] = r)}
                  style={[
                    styles.otpInput,
                    d && styles.otpInputFilled,
                  ]}
                  value={d}
                  onChangeText={(v) => handleOtpChange(v, i)}
                  keyboardType="number-pad"
                  maxLength={1}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.verifyButton,
              (!isOtpComplete || loading) &&
                styles.verifyButtonDisabled,
            ]}
            onPress={handleVerify}
            disabled={!isOtpComplete || loading}
          >
            <Text style={styles.verifyButtonText}>
              {loading ? "Verifying..." : "Verify"}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default OTPScreen;

/* styles SAME AS YOUR FILE (unchanged) */


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  backgroundImage: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  contentContainer: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  headerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  mainContent: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#aaa', marginTop: 8 },
  otpContainer: { flexDirection: 'row', gap: 12, marginTop: 24 },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: '#555',
    borderRadius: 10,
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  otpInputFilled: { borderColor: '#30E0A1' },
  verifyButton: {
    backgroundColor: '#30E0A1',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  verifyButtonDisabled: { opacity: 0.5 },
  verifyButtonText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
});




