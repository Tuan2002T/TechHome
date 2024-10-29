import React, { useState, useRef, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Keyboard
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
    { id: '3', text: 'Sure, what would you like to know?', isUser: false },
    { id: '4', text: 'Sure, what would you like to know?', isUser: false },
    { id: '5', text: 'Sure, what would you like to know?', isUser: false },
    { id: '6', text: 'Sure, what would you like to know?', isUser: false }
  ])
  const [inputText, setInputText] = useState('')
  const flatListRef = useRef(null)

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages((prevMessages) => {
        const newMessages = [
          ...prevMessages,
          { id: String(prevMessages.length + 1), text: inputText, isUser: true }
        ]
        // Cuộn xuống tin nhắn mới nhất ngay sau khi cập nhật
        flatListRef.current.scrollToEnd({ animated: true })
        return newMessages
      })
      setInputText('')
    }
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        flatListRef.current.scrollToEnd({ animated: true })
      }
    )

    return () => {
      keyboardDidShowListener.remove()
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat</Text>
      </View>
      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={messages}
        keyExtractor={(item) => item.id}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: item.isUser ? 'row-reverse' : 'row',
              alignItems: 'flex-end'
            }}
          >
            {!item.isUser &&
              (index === messages.length - 1 || messages[index + 1].isUser) && (
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 25,
                    marginRight: 8,
                    marginBottom: 4
                  }}
                  source={{
                    uri: 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474014Xlf/anh-gai-xinh-cute-de-thuong-hot-girl-17.jpg'
                  }}
                />
              )}
            <View
              style={[
                styles.messageContainer,
                item.isUser ? styles.userMessage : styles.assistantMessage,
                !item.isUser &&
                  !(
                    index === messages.length - 1 || messages[index + 1].isUser
                  ) && { marginLeft: 40 }
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
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
    paddingHorizontal: 15
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
    backgroundColor: '#83c5be',
    color: 'white'
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffe5ec',
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
