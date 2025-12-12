import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";

const COLORS = {
  primary: "#13ec13",
  backgroundDark: "#102210",
  surface: "#111f11",
  card: "#152715",
  text: "#ffffff",
  textMuted: "#94a3a5",
  divider: "#1f3320",
};

export default function EditWorkerProfile({ navigation, route }) {
  const existingProfile = route?.params?.profile || {};

  const [name, setName] = useState(existingProfile.name || "Jordan Lee");
  const [about, setAbout] = useState(
    existingProfile.description ||
      "With over 15 years of experience, I specialize in residential and commercial electrical systems. Committed to safety, quality, and reliability on every project."
  );
  const [gender, setGender] = useState(existingProfile.gender || "Male");
  const [age, setAge] = useState(existingProfile.age ? String(existingProfile.age) : "34");

  const handleSave = () => {
    // TODO: connect with backend API to actually save changes
    // For now, just go back to profile screen
    navigation.goBack();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const isMale = gender === "Male";
  const isFemale = gender === "Female";

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconLeft} onPress={handleBack}>
          <Text style={styles.headerBack}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Profile</Text>

        <TouchableOpacity style={styles.headerSave} onPress={handleSave}>
          <Text style={styles.headerSaveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar + role */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCV-7hNXVbC0A5z-nwXV5QTQOqf8RxFxgmZ61-e8M2D8Kr-ttd0J08JZGZyNEmJFYxUhksVD49dZSEt4WNaLD8yUr0TH2rmIDUqEl09RFsdSJJYaO2_5g7Z5fD79D5JcO2hz7tkMIqYxW5o71bAJ3puBTBSN3S5Q1pJ7xyGqv2bVm29_xwOeFRZzHFxCzwUQbpqB1tVL15Mxj82ZtQrmQtQ4JHncfx9uarZoUgJEtJqi7xb1Q3Sd9rOp5tTGaKwEZY2qTx68Yy9soGc",
              }}
              style={styles.avatar}
            />

            <View style={styles.avatarEditBadge}>
              <Text style={styles.avatarEditIcon}>✎</Text>
            </View>
          </View>

          <Text style={styles.roleText}>Master Electrician</Text>
        </View>

        {/* Rating summary */}
        <View style={styles.ratingRow}>
          <View style={styles.ratingLeft}>
            <Text style={styles.ratingValue}>4.9</Text>
            <View style={styles.ratingStarsRow}>
              <Text style={styles.ratingStar}>★</Text>
              <Text style={styles.ratingStar}>★</Text>
              <Text style={styles.ratingStar}>★</Text>
              <Text style={styles.ratingStar}>★</Text>
              <Text style={styles.ratingStarOutline}>★</Text>
            </View>
            <Text style={styles.ratingSubtitle}>124 reviews</Text>
          </View>

          <View style={styles.ratingBars}>
            {[
              { label: "5", percent: 80 },
              { label: "4", percent: 15 },
              { label: "3", percent: 3 },
              { label: "2", percent: 1 },
              { label: "1", percent: 1 },
            ].map((item) => (
              <View style={styles.ratingBarRow} key={item.label}>
                <Text style={styles.ratingLabel}>{item.label}</Text>
                <View style={styles.ratingBarTrack}>
                  <View style={[styles.ratingBarFill, { width: `${item.percent}%` }]} />
                </View>
                <Text style={styles.ratingPercent}>{item.percent}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Name field */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Name</Text>
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={COLORS.textMuted}
          />
        </View>

        {/* About section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeader}>About</Text>
        </View>
        <TextInput
          style={styles.aboutInput}
          value={about}
          onChangeText={setAbout}
          multiline
          placeholder="Tell customers about your experience"
          placeholderTextColor={COLORS.textMuted}
        />

        {/* Gender + Age chips */}
        <View style={styles.chipRow}>
          <TouchableOpacity
            style={[styles.chip, isMale && styles.chipActive]}
            onPress={() => setGender("Male")}
          >
            <Text style={styles.chipIcon}>♂</Text>
            <Text style={styles.chipText}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.chip, isFemale && styles.chipActive]}
            onPress={() => setGender("Female")}
          >
            <Text style={styles.chipIcon}>♀</Text>
            <Text style={styles.chipText}>Female</Text>
          </TouchableOpacity>

          <View style={styles.chipAgeWrapper}>
            <Text style={styles.chipAgeLabel}>Age</Text>
            <TextInput
              style={styles.chipAgeInput}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Verification section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeader}>Verification</Text>
        </View>

        <View style={styles.verificationList}>
          <View style={[styles.verificationItem, styles.verificationHighlight]}>
            <Text style={styles.verificationIcon}>✔</Text>
            <Text style={styles.verificationText}>Verified</Text>
          </View>

          <View style={styles.verificationItem}>
            <Text style={styles.verificationSmallIcon}>🏅</Text>
            <Text style={styles.verificationSubText}>Master Electrician License</Text>
          </View>

          <View style={styles.verificationItem}>
            <Text style={styles.verificationSmallIcon}>💳</Text>
            <Text style={styles.verificationSubText}>Government Issued ID</Text>
          </View>

          <TouchableOpacity style={styles.uploadButton} activeOpacity={0.9}>
            <Text style={styles.uploadButtonText}>Upload New Document</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "rgba(16,34,16,0.95)",
  },
  headerIconLeft: {
    width: 40,
    justifyContent: "center",
  },
  headerBack: {
    color: COLORS.text,
    fontSize: 18,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  headerSave: {
    width: 40,
    alignItems: "flex-end",
  },
  headerSaveText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  avatarSection: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 12,
  },
  avatarWrapper: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: "hidden",
    marginBottom: 12,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarEditBadge: {
    position: "absolute",
    right: 6,
    bottom: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.backgroundDark,
  },
  avatarEditIcon: {
    color: COLORS.text,
    fontSize: 16,
  },
  roleText: {
    color: "rgba(19,236,19,0.8)",
    fontSize: 14,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  ratingLeft: {
    width: 90,
  },
  ratingValue: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.text,
  },
  ratingStarsRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  ratingStar: {
    color: COLORS.primary,
    fontSize: 16,
    marginRight: 2,
  },
  ratingStarOutline: {
    color: COLORS.primary,
    fontSize: 16,
    marginRight: 2,
    opacity: 0.5,
  },
  ratingSubtitle: {
    marginTop: 4,
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
  },
  ratingBars: {
    flex: 1,
    marginLeft: 16,
  },
  ratingBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ratingLabel: {
    width: 16,
    color: COLORS.text,
    fontSize: 12,
  },
  ratingBarTrack: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(19,236,19,0.2)",
    overflow: "hidden",
    marginHorizontal: 6,
  },
  ratingBarFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  ratingPercent: {
    width: 40,
    textAlign: "right",
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
  },
  fieldBlock: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  fieldLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 4,
  },
  nameInput: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
    paddingVertical: 4,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  sectionHeaderRow: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  aboutInput: {
    marginTop: 4,
    marginHorizontal: 16,
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 8,
  },
  chipRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(19,236,19,0.2)",
  },
  chipActive: {
    backgroundColor: "rgba(19,236,19,0.35)",
  },
  chipIcon: {
    color: COLORS.text,
    marginRight: 4,
  },
  chipText: {
    color: COLORS.text,
    fontSize: 13,
  },
  chipAgeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(19,236,19,0.2)",
    marginLeft: 4,
  },
  chipAgeLabel: {
    color: COLORS.text,
    fontSize: 13,
    marginRight: 6,
  },
  chipAgeInput: {
    minWidth: 32,
    color: COLORS.text,
    fontSize: 13,
    padding: 0,
  },
  verificationList: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 8,
  },
  verificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "rgba(19,236,19,0.1)",
  },
  verificationHighlight: {
    backgroundColor: "rgba(19,236,19,0.2)",
  },
  verificationIcon: {
    fontSize: 20,
    color: COLORS.primary,
    marginRight: 8,
  },
  verificationText: {
    flex: 1,
    color: COLORS.text,
    fontWeight: "600",
  },
  verificationSmallIcon: {
    fontSize: 18,
    color: COLORS.text,
    marginRight: 8,
  },
  verificationSubText: {
    flex: 1,
    color: COLORS.text,
  },
  uploadButton: {
    marginTop: 4,
    backgroundColor: "rgba(19,236,19,0.2)",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
  },
});
