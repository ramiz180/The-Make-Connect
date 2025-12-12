import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const COLORS = {
  primary: "#13ec13",
  backgroundDark: "#102210",
  bubbleOther: "#3f3f46",
  text: "#ffffff",
  textMuted: "#9ca3af",
};

export default function WorkerChatScreen({ navigation, route }) {
  const chatId = route?.params?.id || "1";
  const name = route?.params?.name || "Jane Doe";
  const inquiry = route?.params?.inquiry || "Inquiry for: Custom Bookshelf";

  const initialByChat = {
    "1": [
      {
        id: 1,
        text:
          "Hi! I saw your profile and I'm interested in getting a custom bookshelf built. Are you available for new projects?",
        sender: "customer",
        time: "10:28 AM",
      },
      {
        id: 2,
        text:
          "Hello Jane! Yes, I am. I'd be happy to discuss your project. What kind of design do you have in mind?",
        sender: "worker",
        time: "10:30 AM",
      },
      {
        id: 3,
        text:
          "That sounds great, what's your availability for a quick call to discuss the details?",
        sender: "customer",
        time: "10:32 AM",
      },
    ],
    "2": [
      {
        id: 1,
        text: "Hi, I need help with a plumbing repair at my apartment.",
        sender: "customer",
        time: "9:10 AM",
      },
      {
        id: 2,
        text: "Sure Mike, can you tell me more about the issue?",
        sender: "worker",
        time: "9:12 AM",
      },
      {
        id: 3,
        text: "There's a leak under the kitchen sink.",
        sender: "customer",
        time: "9:15 AM",
      },
    ],
    "3": [
      {
        id: 1,
        text: "Thanks again for helping with the wiring yesterday.",
        sender: "customer",
        time: "Yesterday",
      },
      {
        id: 2,
        text: "You're welcome, Samantha! Let me know if anything else comes up.",
        sender: "worker",
        time: "Yesterday",
      },
    ],
    "4": [
      {
        id: 1,
        text: "I appreciate the landscaping quote.",
        sender: "customer",
        time: "Sunday",
      },
      {
        id: 2,
        text: "Happy to help, Chris. We can start whenever you're ready.",
        sender: "worker",
        time: "Sunday",
      },
    ],
  };

  const [messages, setMessages] = useState(initialByChat[chatId] || initialByChat["1"]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: "worker",
      time: "Now",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const renderMessage = ({ item }) => {
    const isWorker = item.sender === "worker";
    return (
      <View
        style={[
          styles.messageRow,
          isWorker ? styles.messageRowSelf : styles.messageRowOther,
        ]}
      >
        {!isWorker && <View style={styles.avatarSmall} />}

        <View style={styles.bubbleColumn}>
          <View
            style={[styles.messageBubble, isWorker ? styles.bubbleSelf : styles.bubbleOther]}
          >
            <Text
              style={[styles.messageText, isWorker ? styles.messageTextSelf : null]}
            >
              {item.text}
            </Text>
          </View>
          <Text
            style={[styles.timeText, isWorker ? styles.timeTextSelf : styles.timeTextOther]}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.backgroundLayer} />

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>{"‹"}</Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerName}>{name}</Text>
            <Text style={styles.headerSubtitle}>{inquiry}</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatList}
        />

        <View style={styles.inputBarWrapper}>
          <View style={styles.inputBar}>
            <TouchableOpacity style={styles.inputIconButton}>
              <Text style={styles.inputIcon}>＋</Text>
            </TouchableOpacity>

            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type a message..."
              placeholderTextColor={COLORS.textMuted}
              style={styles.textInput}
            />

            <TouchableOpacity style={styles.inputIconButton}>
              <Text style={styles.inputIcon}>🎤</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sendFab} onPress={sendMessage}>
              <Text style={styles.sendFabIcon}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.backgroundDark,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 20,
    color: COLORS.text,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: COLORS.textMuted,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  chatList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  messageRowOther: {
    alignSelf: "flex-start",
  },
  messageRowSelf: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#4b5563",
  },
  bubbleColumn: {
    maxWidth: "80%",
  },
  messageBubble: {
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bubbleOther: {
    backgroundColor: COLORS.bubbleOther,
    borderBottomLeftRadius: 4,
  },
  bubbleSelf: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
    color: COLORS.text,
  },
  messageTextSelf: {
    color: COLORS.backgroundDark,
    fontWeight: "600",
  },
  timeText: {
    marginTop: 2,
    fontSize: 10,
    color: COLORS.textMuted,
  },
  timeTextSelf: {
    textAlign: "right",
  },
  timeTextOther: {
    textAlign: "left",
  },
  inputBarWrapper: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 4,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    backgroundColor: "rgba(31,41,55,0.9)",
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  inputIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  inputIcon: {
    fontSize: 18,
    color: COLORS.textMuted,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 8,
    color: COLORS.text,
    fontSize: 14,
  },
  sendFab: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendFabIcon: {
    fontSize: 18,
    color: COLORS.backgroundDark,
    transform: [{ rotate: "-45deg" }],
  },
});
