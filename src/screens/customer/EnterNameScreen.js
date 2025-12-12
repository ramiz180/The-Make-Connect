import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

export default function EnterNameScreen({ navigation, route }) {
  const { nextScreen = "CustomerSetLocation", userId, phone } = route?.params || {};

  const [fullName, setFullName] = useState("");

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    if (!fullName.trim()) return;

    navigation.navigate(nextScreen, {
      userId,
      phone,
      name: fullName.trim(),
      nextScreen: route?.params?.finalNextScreen,
    });
  };

  const isDisabled = !fullName.trim();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.backgroundContainer}>
          <View style={styles.backgroundImage}>
            <View style={styles.overlay} />
          </View>
          <View style={styles.glow} />
          
          <View style={styles.contentContainer}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <MaterialIcons name="handyman" size={32} color="#0A0A0A" />
              </View>
              <Text style={styles.brandText}>The Make Connect</Text>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>What is your name?</Text>
              </View>
              
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder="Your full name"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={fullName}
                  onChangeText={setFullName}
                  returnKeyType="done"
                  onSubmitEditing={handleContinue}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Continue Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.continueButton, isDisabled && styles.continueButtonDisabled]}
                onPress={handleContinue}
                disabled={isDisabled}
                activeOpacity={0.8}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    backgroundColor: '#0A0A0A',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 10, 10, 0.9)',
  },
  glow: {
    position: 'absolute',
    top: -height * 0.1,
    left: '50%',
    transform: [{ translateX: -width * 0.75 }],
    width: width * 1.5,
    height: height * 0.5,
    backgroundColor: 'rgba(69, 211, 154, 0.05)',
    borderRadius: width * 0.75,
    borderWidth: 1,
    borderColor: 'rgba(69, 211, 154, 0.1)',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#45D39A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#45D39A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 5,
  },
  brandText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  textContainer: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 38,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 48,
  },
  inputField: {
    width: '100%',
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: '#2A2A2A',
    paddingVertical: 16,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
  continueButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#45D39A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#45D39A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  continueButtonDisabled: {
    opacity: 0.6,
  },
  continueButtonText: {
    color: '#0A0A0A',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backArrow: {
    color: "#45D39A",
    fontSize: 20,
  },
  brandText: {
    marginLeft: 4,
    color: "#45D39A",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  // Removed duplicate brandText style
  stepBlock: {
    marginTop: 24,
  },
  stepText: {
    color: "#E0E0E0",
    fontSize: 13,
    marginBottom: 8,
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "#2A2A2A",
    overflow: "hidden",
  },
  progressFill: {
    width: "50%",
    height: "100%",
    backgroundColor: "#45D39A",
  },
  titleBlock: {
    marginTop: 24,
  },
  // Removed duplicate title style
  subtitle: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  formBlock: {
    marginTop: 32,
    gap: 20,
  },
  inputBlock: {
    width: "100%",
  },
  label: {
    color: "#E0E0E0",
    fontSize: 13,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    paddingHorizontal: 12,
    height: 56,
  },
  inputIcon: {
    color: "#555555",
    marginRight: 8,
    fontSize: 16,
  },
  input: {
    flex: 1,
    color: "#E0E0E0",
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#45D39A",
    paddingVertical: 16,
    borderRadius: 12,
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
