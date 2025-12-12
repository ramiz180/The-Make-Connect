import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EnterNameScreen({ navigation, route }) {
  const { nextScreen = "CustomerSetLocation", userId, phone } = route?.params || {};

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    const fullName = `${firstName} ${lastName}`.trim();
    if (!firstName.trim() || !lastName.trim()) return;

    navigation.navigate(nextScreen, {
      userId,
      phone,
      name: fullName,
      nextScreen: route?.params?.finalNextScreen,
    });
  };

  const isDisabled = !firstName.trim() || !lastName.trim();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.inner}>
          {/* Top brand + back */}
          <View style={styles.topRow}>
            <View style={styles.brandLeft}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Text style={styles.backArrow}>{"<"}</Text>
              </TouchableOpacity>
              <Text style={styles.brandText}>THE MAKE CONNECT</Text>
            </View>
          </View>

          {/* Step + progress */}
          <View style={styles.stepBlock}>
            <Text style={styles.stepText}>Step 2 of 4</Text>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>

          {/* Title + subtitle */}
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Complete your profile</Text>
            <Text style={styles.subtitle}>
              This helps others identify you on the platform.
            </Text>
          </View>

          {/* First + Last name fields */}
          <View style={styles.formBlock}>
            <View style={styles.inputBlock}> 
              <Text style={styles.label}>First Name</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your first name"
                  placeholderTextColor="#555555"
                  value={firstName}
                  onChangeText={setFirstName}
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={styles.inputBlock}> 
              <Text style={styles.label}>Last Name</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your last name"
                  placeholderTextColor="#555555"
                  value={lastName}
                  onChangeText={setLastName}
                  returnKeyType="done"
                  onSubmitEditing={handleContinue}
                />
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }} />

          {/* Bottom continue button */}
          <TouchableOpacity
            style={[styles.btn, isDisabled && styles.disabled]}
            disabled={isDisabled}
            onPress={handleContinue}
          >
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
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
  title: {
    color: "#E0E0E0",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
  },
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
