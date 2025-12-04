import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkerRadius({ navigation }) {
  const [radius, setRadius] = useState('5 km');
  const options = ['2 km', '5 km', '10 km'];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set Work Radius</Text>

      <View style={styles.radiusRow}>
        {options.map(opt => (
          <TouchableOpacity
            key={opt}
            style={[styles.radiusBtn, radius===opt && styles.selectedRadius]}
            onPress={() => setRadius(opt)}
          >
            <Text style={[styles.radiusText, radius===opt && styles.selectedText]}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() => navigation.navigate('WorkerHome')}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:20, backgroundColor:'#fff'},
  title:{fontSize:24,fontWeight:'700',marginBottom:20},
  radiusRow:{flexDirection:'row', justifyContent:'space-around', marginBottom:30},
  radiusBtn:{padding:15,borderWidth:1,borderColor:'#888', borderRadius:8},
  selectedRadius:{backgroundColor:'#00D786', borderColor:'#00D786'},
  radiusText:{color:'#444'},
  selectedText:{color:'#000', fontWeight:'700'},
  continueBtn:{backgroundColor:'#00D786', padding:15, borderRadius:10, alignItems:'center'},
  continueText:{fontWeight:'700', color:'#000'},
});
