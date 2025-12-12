import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

export default function AddService({ navigation, route }) {
  const editingService = route?.params?.editService;

  const [category, setCategory] = useState(editingService?.title || "");
  const [price, setPrice] = useState(editingService?.price || "");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState(
    editingService?.skills || ["Faucet Repair", "Pipe Installation"]
  );

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    setSkills((prev) => [...prev, trimmed]);
    setSkillInput("");
  };

  const handleRemoveSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSubmit = () => {
    if (!category || !price) {
      return;
    }

    if (editingService) {
      const updatedService = {
        ...editingService,
        title: category,
        price,
        skills,
      };
      navigation.navigate("MyServices", { updatedService });
      return;
    }

    const newService = {
      id: Date.now().toString(),
      title: category,
      price,
      unit: "/hr",
      skills,
    };

    navigation.navigate("MyServices", { newService });
  };

  return (
    <View style={styles.root}>
      <View style={styles.headerBackground} />
      <View style={styles.gradientOverlay} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>{"←"}</Text>
          </TouchableOpacity>

          <View style={styles.brandRow}>
            <View style={styles.brandDot} />
            <Text style={styles.brandText}>The Make Connect</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.mainSection}>
          <Text style={styles.title}>Add a New Service</Text>
          <Text style={styles.subtitle}>
            Showcase your skills and set your rates to connect with new clients.
          </Text>

          <View style={styles.formSection}>
            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Service Category</Text>
              <TouchableOpacity
                style={styles.selectInput}
                activeOpacity={0.8}
                onPress={() => {}}
              >
                <Text
                  style={
                    category
                      ? styles.selectValue
                      : [styles.selectValue, styles.placeholder]
                  }
                >
                  {category || "Select a category"}
                </Text>
                <Text style={styles.chevron}>⌄</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Sub-skills</Text>
              <View style={styles.skillsContainer}>
                {skills.map((skill) => (
                  <View key={skill} style={styles.skillChip}>
                    <Text style={styles.skillText}>{skill}</Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveSkill(skill)}
                      style={styles.skillRemove}
                    >
                      <Text style={styles.skillRemoveText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                <View style={styles.skillInputWrapper}>
                  <TextInput
                    value={skillInput}
                    onChangeText={setSkillInput}
                    placeholder="Add a skill..."
                    placeholderTextColor={COLORS.textMuted}
                    style={styles.skillInput}
                    onSubmitEditing={handleAddSkill}
                    returnKeyType="done"
                  />
                </View>
              </View>
            </View>

            <View style={styles.fieldBlock}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Add Work Sample Image</Text>
                <Text style={styles.optionalText}>Optional</Text>
              </View>

              <TouchableOpacity
                style={styles.uploadBox}
                activeOpacity={0.8}
                onPress={() => {}}
              >
                <Text style={styles.uploadIcon}>🖼️</Text>
                <Text style={styles.uploadText}>Tap to upload an image</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Price</Text>
              <View style={styles.priceWrapper}>
                <Text style={styles.currency}>₹</Text>
                <TextInput
                  value={price}
                  onChangeText={setPrice}
                  placeholder="Enter amount in Rupees"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="numeric"
                  style={styles.priceInput}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerButtonWrapper}>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.9}
          onPress={handleSubmit}
        >
          <Text style={styles.primaryButtonText}>Add Service to Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const COLORS = {
  primary: "#31FE83",
  backgroundDark: "#000000",
  surfaceDark: "#1a1a1a",
  borderDark: "#2e2e2e",
  text: "#ffffff",
  textMuted: "#a0b3a0",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: "#333333",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: "rgba(0,0,0,0.65)",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  backIcon: {
    color: COLORS.text,
    fontSize: 20,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  brandText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "700",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  mainSection: {
    marginTop: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.textMuted,
  },
  formSection: {
    marginTop: 32,
    gap: 24,
  },
  fieldBlock: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.textMuted,
  },
  selectInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    backgroundColor: COLORS.surfaceDark,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectValue: {
    fontSize: 15,
    color: COLORS.text,
    flex: 1,
  },
  placeholder: {
    color: COLORS.textMuted,
  },
  chevron: {
    fontSize: 18,
    color: COLORS.textMuted,
    marginLeft: 8,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    backgroundColor: COLORS.surfaceDark,
    padding: 8,
  },
  skillChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    backgroundColor: "rgba(49,254,131,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  skillText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  skillRemove: {
    marginLeft: 4,
  },
  skillRemoveText: {
    color: COLORS.primary,
    fontSize: 12,
  },
  skillInputWrapper: {
    minWidth: 100,
    flex: 1,
  },
  skillInput: {
    color: COLORS.text,
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  optionalText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  uploadBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.borderDark,
    backgroundColor: COLORS.surfaceDark,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadIcon: {
    fontSize: 28,
    color: COLORS.textMuted,
  },
  uploadText: {
    marginTop: 8,
    fontSize: 13,
    color: COLORS.textMuted,
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    backgroundColor: COLORS.surfaceDark,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  currency: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginRight: 6,
  },
  priceInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    paddingVertical: 4,
  },
  footerButtonWrapper: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 24,
  },
  primaryButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "700",
  },
});
