import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerificationStatus() {
  const status = "Verified";  
  const reason = "";          

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verification Status</Text>

      <View
        style={[
          styles.statusBox,
          status === "Verified" && styles.verified,
          status === "Pending" && styles.pending,
          status === "Rejected" && styles.rejected,
        ]}
      >
        <Text style={styles.statusText}>{status}</Text>
      </View>

      {status === "Rejected" && (
        <Text style={{ marginTop: 10, color: "red" }}>
          Reason: {reason || "Incomplete documents."}
        </Text>
      )}

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Re-upload Documents</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:"#fff", padding:20 },
  title:{ fontSize:26, fontWeight:"700", marginBottom:20 },
  statusBox:{
    padding:15,
    borderRadius:10,
    width:150,
    alignItems:"center"
  },
  verified:{ backgroundColor:"#00D786" },
  pending:{ backgroundColor:"#FFC107" },
  rejected:{ backgroundColor:"#FF5252" },
  statusText:{ color:"#000", fontSize:18, fontWeight:"700" },
  btn:{
    backgroundColor:"#00D786",
    padding:15,
    borderRadius:10,
    alignItems:"center",
    marginTop:25
  },
  btnText:{ fontWeight:"700", color:"#000" }
});
