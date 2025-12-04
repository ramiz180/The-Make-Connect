import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function WorkerChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I need plumbing service.", sender: "customer" },
    { id: 2, text: "Sure, what issue are you facing?", sender: "worker" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "worker",
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "worker"
          ? styles.workerBubble
          : styles.customerBubble,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === "worker"
            ? styles.workerText
            : styles.customerText,
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        style={styles.chatList}
      />

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          style={styles.input}
        />

        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#0A84FF",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  chatList: { padding: 15 },

  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },

  workerBubble: {
    backgroundColor: "#0A84FF",
    alignSelf: "flex-end",
  },

  customerBubble: {
    backgroundColor: "#F1F1F1",
    alignSelf: "flex-start",
  },

  messageText: {
    fontSize: 15,
  },

  workerText: { color: "#fff" },
  customerText: { color: "#000" },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  input: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  sendBtn: {
    backgroundColor: "#0A84FF",
    paddingHorizontal: 15,
    marginLeft: 10,
    justifyContent: "center",
    borderRadius: 8,
  },

  sendText: { color: "#fff", fontWeight: "600" },
});
