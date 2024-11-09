import React, { useState, useRef, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { getAllMessagesByChatId, sendMessages } from '../../../api/API/chat'
import { useSelector } from 'react-redux'
import { NavigationProp, RouteProp } from '@react-navigation/native'

interface Files {
  fileId: number
  fileName: string
  fileType: string
  fileUrl: string
}
interface Messages {
  messageId: number
  senderId: number
  avatar: string
  content: string
  sentAt: string
  Files: Files[]
}

interface ChatMessageProps {
  navigation: NavigationProp<any>
  route: RouteProp<any> & { params: { chatId: number } }
}

const ChatMessage: React.FC<ChatMessageProps> = ({ navigation, route }) => {
  const { userData } = useSelector((state: any) => state.auth)
  const [messages, setMessages] = useState<Messages[]>([])
  const [inputText, setInputText] = useState('')
  const flatListRef = useRef<any>(null)

  useEffect(() => {
    const getMessages = async () => {
      const response = await getAllMessagesByChatId(
        userData.token,
        route.params.chatId
      )
      setMessages(response)
    }
    getMessages()
  }, [])

  const sendMessage = async () => {
    try {
      const response = await sendMessages(
        userData.token,
        route.params.chatId,
        inputText
      )
      setMessages((prevMessages) => [...prevMessages, response])
      setInputText('')
      flatListRef.current.scrollToEnd({ animated: true })
      console.log(response)
    } catch (error) {
      console.log(error)
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

  const checkUser = (senderId: number) => {
    return senderId === userData.user.userId
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const renderMessage = ({ item, index }: any) => {
    const isCurrentUser = checkUser(item.senderId)
    const isLastMessage = index === messages.length - 1
    const nextMessageSenderId = messages[index + 1]?.senderId
    const shouldShowAvatar =
      !isCurrentUser && (isLastMessage || nextMessageSenderId !== item.senderId)
    const isFirstInSequence =
      index === 0 || messages[index - 1].senderId !== item.senderId
    const isLastInSequence =
      isLastMessage || nextMessageSenderId !== item.senderId
    const isImage =
      item.Files.length > 0 && item.Files[0].fileType.includes('image')

    return (
      <View style={styles.messageWrapper}>
        <View
          style={[
            styles.messageRow,
            { flexDirection: isCurrentUser ? 'row-reverse' : 'row' }
          ]}
        >
          {shouldShowAvatar ? (
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={{
                  uri:
                    item.avatar ||
                    'https://techhomearchive.s3.ap-southeast-1.amazonaws.com/defautavatar.jpg'
                }}
              />
            </View>
          ) : (
            !isCurrentUser && <View style={styles.avatarContainer} />
          )}

          <View
            style={[
              styles.messageContainer,
              isCurrentUser ? styles.userMessage : styles.assistantMessage,
              isFirstInSequence &&
                (isCurrentUser
                  ? styles.userFirstMessage
                  : styles.assistantFirstMessage),
              isLastInSequence &&
                (isCurrentUser
                  ? styles.userLastMessage
                  : styles.assistantLastMessage),
              !isFirstInSequence && !isLastInSequence && styles.middleMessage
            ]}
          >
            <Text
              style={[
                styles.messageText,
                isCurrentUser && styles.userMessageText
              ]}
            >
              {item.content}
            </Text>
            {isImage &&
              item.Files.map((file) => (
                <Image
                  key={file.fileId}
                  source={{ uri: file.fileUrl }}
                  style={{ width: 100, height: 100 }}
                />
              ))}
            <Text
              style={[
                styles.timeText,
                isCurrentUser ? styles.userTimeText : styles.assistantTimeText
              ]}
            >
              {formatTime(item.sentAt)}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Trò chuyện</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="ellipsis-v" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={messages}
        keyExtractor={(item) => item.messageId.toString()}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        renderItem={renderMessage}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachmentButton}>
          <FontAwesomeIcon name="camera" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.attachmentButton}>
          <EntypoIcon name="attachment" size={20} color="#666" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
          multiline
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled
          ]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Icon
            name="paper-plane"
            size={20}
            color={inputText.trim() ? 'white' : '#A5A5A5'}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9'
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
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
  headerButton: {
    padding: 5
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15
  },
  chatContent: {
    paddingVertical: 15
  },
  messageWrapper: {
    marginVertical: 2
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 1
  },
  avatarContainer: {
    width: 34,
    marginRight: 8,
    alignItems: 'center'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  messageContainer: {
    maxWidth: '75%',
    padding: 12,
    paddingBottom: 8,
    borderRadius: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1
  },
  userMessage: {
    backgroundColor: '#26938E',
    marginLeft: 40
  },
  assistantMessage: {
    backgroundColor: 'white'
  },
  userFirstMessage: {
    borderBottomRightRadius: 5
  },
  userLastMessage: {
    borderTopRightRadius: 5
  },
  assistantFirstMessage: {
    borderBottomLeftRadius: 5
  },
  assistantLastMessage: {
    borderTopLeftRadius: 5
  },
  middleMessage: {
    borderRadius: 5
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    color: '#333',
    marginBottom: 4
  },
  userMessageText: {
    color: 'white'
  },
  timeText: {
    fontSize: 11,
    alignSelf: 'flex-end'
  },
  userTimeText: {
    color: 'rgba(255,255,255,0.7)'
  },
  assistantTimeText: {
    color: '#999'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)'
  },
  attachmentButton: {
    padding: 8,
    marginRight: 5
  },
  input: {
    flex: 1,
    fontSize: 15,
    maxHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginRight: 10,
    color: '#333'
  },
  sendButton: {
    backgroundColor: '#26938E',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendButtonDisabled: {
    backgroundColor: '#E5E5E5'
  }
})

export default ChatMessage
