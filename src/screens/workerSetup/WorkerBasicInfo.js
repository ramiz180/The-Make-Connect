import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkerBasicInfo({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Basic Information</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderRow}>
          {['Male', 'Female', 'Other'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.genderBtn, gender === item && styles.selectedGender]}
              onPress={() => setGender(item)}
            >
              <Text style={[styles.genderText, gender === item && styles.selectedGenderText]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Profile Photo</Text>
        <TouchableOpacity style={styles.photoPlaceholder}>
          <Text style={{color:'#888'}}>Upload Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate('WorkerCategory')}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#fff' },
  scroll: { padding: 20 },
  title: { fontSize:24, fontWeight:'700', marginBottom:20 },
  input: { borderWidth:1, borderColor:'#ccc', borderRadius:8, padding:12, marginBottom:15 },
  label: { fontSize:16, fontWeight:'600', marginTop:15, marginBottom:8 },
  genderRow: { flexDirection:'row', justifyContent:'space-between', marginBottom:15 },
  genderBtn: { padding:10, borderWidth:1, borderColor:'#888', borderRadius:8, flex:1, marginHorizontal:5, alignItems:'center' },
  selectedGender: { backgroundColor:'#00D786', borderColor:'#00D786' },
  genderText: { color:'#444' },
  selectedGenderText: { color:'#fff', fontWeight:'700' },
  photoPlaceholder: { height:120, backgroundColor:'#f0f0f0', borderRadius:8, justifyContent:'center', alignItems:'center', marginBottom:20 },
  continueBtn: { backgroundColor:'#00D786', padding:15, borderRadius:10, alignItems:'center', marginTop:10 },
  continueText: { fontWeight:'700', color:'#000' },
});
