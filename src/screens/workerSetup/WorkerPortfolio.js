import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkerPortfolio({ navigation }) {
  const [photos, setPhotos] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Upload Portfolio</Text>

        <View style={styles.photoContainer}>
          {photos.length === 0 ? (
            <TouchableOpacity style={styles.photoPlaceholder}>
              <Text style={{color:'#888'}}>Upload Photo</Text>
            </TouchableOpacity>
          ) : (
            photos.map((p, idx) => <Image key={idx} source={{uri:p}} style={styles.photo} />)
          )}
        </View>

        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate('WorkerVerification')}
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
  photoContainer:{flexDirection:'row', flexWrap:'wrap', marginBottom:20},
  photoPlaceholder:{width:100,height:100,backgroundColor:'#f0f0f0',justifyContent:'center',alignItems:'center',margin:5},
  photo:{width:100,height:100,margin:5,borderRadius:8},
  continueBtn:{backgroundColor:'#00D786', padding:15, borderRadius:10, alignItems:'center'},
  continueText:{fontWeight:'700', color:'#000'},
});
