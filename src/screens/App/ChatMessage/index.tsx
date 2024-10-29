import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const ChatMessage = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi there! How can I assist you today?', isUser: false },
    {
      id: '2',
      text: 'I have a question about the product features.',
      isUser: true
    },
    { id: '3', text: 'Sure, what would you like to know?', isUser: false }
  ])
  const [inputText, setInputText] = useState('')

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages([
        ...messages,
        { id: String(messages.length + 1), text: inputText, isUser: true }
      ])
      setInputText('')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.isUser ? styles.userMessage : styles.assistantMessage
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="paper-plane" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9'
  },
  header: {
    backgroundColor: '#26938E',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16
  },
  chatContent: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#26938E',
    color: 'white'
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    color: '#333'
  },
  messageText: {
    fontSize: 16
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 12
  },
  sendButton: {
    backgroundColor: '#26938E',
    padding: 8,
    borderRadius: 20
  }
})

export default ChatMessage
