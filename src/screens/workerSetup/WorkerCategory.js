import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkerCategory({ navigation }) {
  const categories = ['Plumbing', 'Electrician', 'Carpentry', 'Cleaning', 'Painting'];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subSkills, setSubSkills] = useState([{ skill:'', charge:'' }]);

  const addSubSkill = () => setSubSkills([...subSkills, { skill:'', charge:'' }]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Select Category & Skills</Text>

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryRow}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryBtn, selectedCategory===cat && styles.selectedCategory]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryText, selectedCategory===cat && styles.selectedCategoryText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Sub-skills & Charges</Text>
        {subSkills.map((item, idx) => (
          <View key={idx} style={styles.subSkillRow}>
            <TextInput
              placeholder="Sub-skill"
              style={styles.input}
              value={item.skill}
              onChangeText={text => {
                const newArr = [...subSkills];
                newArr[idx].skill = text;
                setSubSkills(newArr);
              }}
            />
            <TextInput
              placeholder="Charge"
              style={styles.input}
              value={item.charge}
              onChangeText={text => {
                const newArr = [...subSkills];
                newArr[idx].charge = text;
                setSubSkills(newArr);
              }}
            />
          </View>
        ))}
        <TouchableOpacity onPress={addSubSkill}><Text style={{color:'#00D786'}}>+ Add more</Text></TouchableOpacity>

        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate('WorkerPortfolio')}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#fff'},
  scroll:{padding:20},
  title:{fontSize:24,fontWeight:'700',marginBottom:20},
  label:{fontSize:16,fontWeight:'600',marginTop:10,marginBottom:8},
  categoryRow:{flexDirection:'row', flexWrap:'wrap', marginBottom:15},
  categoryBtn:{padding:10,borderWidth:1,borderColor:'#888', borderRadius:8, margin:5},
  selectedCategory:{backgroundColor:'#00D786', borderColor:'#00D786'},
  categoryText:{color:'#444'},
  selectedCategoryText:{color:'#fff', fontWeight:'700'},
  subSkillRow:{flexDirection:'row', justifyContent:'space-between', marginBottom:10},
  input:{borderWidth:1, borderColor:'#ccc', borderRadius:8, padding:10, flex:1, marginRight:5},
  continueBtn:{backgroundColor:'#00D786', padding:15, borderRadius:10, alignItems:'center', marginTop:20},
  continueText:{fontWeight:'700', color:'#000'},
});
