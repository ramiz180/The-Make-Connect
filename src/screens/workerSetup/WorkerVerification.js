import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkerVerification({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text style={{marginBottom:10}}>Upload these documents for admin review:</Text>

      {['Aadhaar Front', 'Aadhaar Back', 'Selfie', 'Work Photo'].map((item, idx) => (
        <TouchableOpacity key={idx} style={styles.uploadBtn}>
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() => navigation.navigate('WorkerRadius')}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:20, backgroundColor:'#fff'},
  title:{fontSize:24,fontWeight:'700',marginBottom:20},
  uploadBtn:{padding:15, borderWidth:1, borderColor:'#ccc', borderRadius:10, marginVertical:5, alignItems:'center'},
  continueBtn:{backgroundColor:'#00D786', padding:15, borderRadius:10, alignItems:'center', marginTop:20},
  continueText:{fontWeight:'700', color:'#000'},
});
