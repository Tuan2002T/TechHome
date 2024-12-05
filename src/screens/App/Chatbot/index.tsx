import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { sendMessageAI } from '../../../api/API/chat'
import { useSelector } from 'react-redux'
import Markdown from 'react-native-markdown-display'

interface Message {
  id: number
  text: string
  isUser: boolean
}

const ChatBot: React.FC = ({ navigation }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [messageId, setMessageId] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { userData } = useSelector((state: any) => state.auth)
  const flatListRef = useRef<FlatList>(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }

  useEffect(() => {
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: 0, text: 'Xin chào! tôi có thể giúp gì cho bạn?', isUser: false }
      ])
    }, 1000)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (inputText.trim() === '') return

    const userMessage: Message = {
      id: messageId + 1,
      text: inputText,
      isUser: true
    }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setMessageId((prevId) => prevId + 1)
    setInputText('')

    setIsLoading(true)
    try {
      const chatbotResponse = await sendMessageAI(userData.token, inputText)
      const botMessage: Message = {
        id: messageId + 2,
        text: chatbotResponse.message,
        isUser: false
      }
      setMessages((prevMessages) => [...prevMessages, botMessage])
      setMessageId((prevId) => prevId + 2)
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: messageId + 2,
          text: 'Error occurred. Please try again.',
          isUser: false
        }
      ])
      setMessageId((prevId) => prevId + 2)
    } finally {
      setIsLoading(false)
    }
  }

  const renderMessage = ({ item }: { item: Message }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.isUser ? styles.userMessage : styles.botMessage
        ]}
      >
        <Markdown
          style={{
            body: [
              styles.messageText,
              item.isUser ? styles.userText : styles.botText
            ]
          }}
          rules={{
            paragraph: (node, children) => (
              <Text style={styles.markdownParagraph} key={node.key}>
                {children}
              </Text>
            )
          }}
        >
          {item.text}
        </Markdown>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Icon name="chevron-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>ChatBot</Text>

        <TouchableOpacity style={styles.headerButton}>
          <Icon name="ellipsis-v" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatContainer}
          keyboardShouldPersistTaps="handled"
        />
        {isLoading && (
          <View style={styles.typingIndicator}>
            <ActivityIndicator size="small" color="#26938E" />
            <Text style={styles.typingText}>Bot is typing...</Text>
          </View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your question..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity
            disabled={isLoading}
            onPress={handleSend}
            style={styles.sendButton}
          >
            <Icon
              name="paper-plane"
              size={20}
              color={
                inputText.trim() !== '' || !isLoading ? 'white' : '#A5A5A5'
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  flexContainer: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#26938E',
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    textAlign: 'center'
  },
  backButton: {
    padding: 5
  },
  chatContainer: {
    padding: 10
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  userMessage: {
    backgroundColor: '#0B9E9E',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0
  },
  botMessage: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomLeftRadius: 0
  },
  messageText: {
    fontSize: 16
  },
  markdownParagraph: {
    marginBottom: 10
  },
  userText: {
    color: 'white'
  },
  botText: {
    color: 'black'
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    fontSize: 16
  },
  sendButton: {
    backgroundColor: '#26938E',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 15
  },
  typingText: {
    marginLeft: 5,
    color: '#26938E',
    fontSize: 14,
    fontStyle: 'italic'
  }
})

export default ChatBot
