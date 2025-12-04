import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function EditWorkerProfile() {
  const [name, setName] = useState("Rahim Khan");
  const [about, setAbout] = useState("Plumber with 4+ years experience.");
  const [skills, setSkills] = useState([{ skill: "Tap Repair", price: "150" }]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [portfolio, setPortfolio] = useState([
    "https://i.ibb.co/5cZVJkZ/sample1.jpg",
    "https://i.ibb.co/McNWvfp/sample2.jpg",
  ]);

  const addSkill = () => {
    setSkills([...skills, { skill: "", price: "" }]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      {/* Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Enter your name"
      />

      {/* About */}
      <Text style={styles.label}>About You</Text>
      <TextInput
        value={about}
        onChangeText={setAbout}
        style={[styles.input, { height: 90, textAlignVertical: "top" }]}
        multiline
        placeholder="Describe your experience"
      />

      {/* Skills & Prices */}
      <Text style={styles.sectionTitle}>Skills & Charges</Text>
      {skills.map((item, index) => (
        <View key={index} style={styles.skillRow}>
          <TextInput
            value={item.skill}
            onChangeText={(text) => {
              const copy = [...skills];
              copy[index].skill = text;
              setSkills(copy);
            }}
            placeholder="Skill (e.g., Tap Repair)"
            style={[styles.input, { flex: 1 }]}
          />

          <TextInput
            value={item.price}
            onChangeText={(text) => {
              const copy = [...skills];
              copy[index].price = text;
              setSkills(copy);
            }}
            placeholder="₹ Price"
            keyboardType="numeric"
            style={[styles.input, { width: 90, marginLeft: 10 }]}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addBtn} onPress={addSkill}>
        <Text style={styles.addBtnText}>+ Add Skill</Text>
      </TouchableOpacity>

      {/* Availability */}
      <View style={styles.availabilityRow}>
        <Text style={styles.label}>Availability</Text>
        <Switch
          value={isAvailable}
          onValueChange={setIsAvailable}
          trackColor={{ false: "#ccc", true: "#0A84FF" }}
        />
      </View>

      {/* Portfolio */}
      <Text style={styles.sectionTitle}>Portfolio</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {portfolio.map((img, i) => (
          <Image
            key={i}
            source={{ uri: img }}
            style={styles.portfolioImage}
          />
        ))}

        <TouchableOpacity style={styles.uploadBox}>
          <Text style={{ fontSize: 30, color: "#999" }}>+</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Save */}
      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginVertical: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#F9F9F9",
  },

  skillRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },

  addBtn: {
    marginTop: 10,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  addBtnText: { fontSize: 14, fontWeight: "600" },

  availabilityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    alignItems: "center",
  },

  portfolioImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },

  uploadBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },

  saveBtn: {
    backgroundColor: "#0A84FF",
    padding: 15,
    borderRadius: 12,
    marginTop: 30,
  },

  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
