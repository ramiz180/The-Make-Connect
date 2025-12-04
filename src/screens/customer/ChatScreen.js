import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function ChatScreen({ navigation }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello! How can I help you?", sender: "worker" },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      text: message,
      sender: "customer",
    };

    setMessages([...messages, newMsg]);
    setMessage("");
  };

  const renderItem = ({ item }) => {
    const isCustomer = item.sender === "customer";

    return (
      <View
        style={[
          styles.messageContainer,
          isCustomer ? styles.rightMessage : styles.leftMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
      />

      {/* Input Area */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    padding: 15,
    backgroundColor: "#0A84FF",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  messageContainer: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },

  leftMessage: {
    backgroundColor: "#E6E6E6",
    alignSelf: "flex-start",
  },

  rightMessage: {
    backgroundColor: "#0A84FF",
    alignSelf: "flex-end",
  },

  messageText: {
    color: "#000",
  },

  inputArea: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    marginRight: 10,
  },

  sendBtn: {
    backgroundColor: "#0A84FF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },

  sendBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
