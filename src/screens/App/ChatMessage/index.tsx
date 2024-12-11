import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Linking
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import {
  deleteMessage,
  getAllMessagesByChatId,
  sendMessages
} from '../../../api/API/chat'
import { useSelector } from 'react-redux'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { socket } from '../../../Socket/socket'
import pickFile, {
  openCamera,
  pickImagesAndVideos
} from '../../../file/PickFile'
import PickMedia from '../../../Modal/Media/PickMedia'
import Video from 'react-native-video'
import SpinnerLoading from '../../../Spinner/spinnerloading'
import Notification from '../../../Modal/Notification/notification'
import MessageActionModal from '../../../Modal/ActionMessage/ActionMessage'
import Clipboard from '@react-native-clipboard/clipboard'
import ImageViewerModal from '../Component/ImageViewerModal'

interface Files {
  id: string
  fileId: number
  fileName: string
  fileType: string
  fileUrl: string
  fileSize: number
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
  route: RouteProp<{ params: { chatId: number; chatType: String } }, 'params'>
}

const ChatMessage: React.FC<ChatMessageProps> = ({ navigation, route }) => {
  const { userData } = useSelector((state: any) => state.auth)
  const [messages, setMessages] = useState<Messages[]>([])
  const [inputText, setInputText] = useState('')
  const flatListRef = useRef<any>(null)
  const [isPickMediaOpen, setPickMediaOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [notification, setNotification] = useState('')
  const [listMedia, setListMedia] = useState<Files[]>([])
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(20)

  const closeNotification = () => {
    setError(false)
    setLoading(false)
  }

  const openPickMedia = () => {
    setPickMediaOpen(true)
  }

  const closePickMedia = () => {
    setPickMediaOpen(false)
  }

  const handleCameraPress = async () => {
    try {
      const response = await openCamera('photo')
      if (response) {
        sendMessageForMedia(response[0])
        closePickMedia()
      } else {
        console.log('No media captured or user cancelled.')
      }
    } catch (error) {
      console.error('Error while opening the camera:', error)
    }
  }

  const handleVideoPress = async () => {
    try {
      const response = await openCamera('video')
      if (response && response.length > 0) {
        sendMessageForMedia(response[0])
        closePickMedia()
      } else {
        console.log('No video was selected or user canceled the action')
      }
    } catch (error) {
      console.error('Error opening camera:', error)
    }
  }

  const handleGalleryPress = async () => {
    const response = await pickImagesAndVideos()
    sendMessageForMedia(response[0])
    closePickMedia()
  }

  const handlePickFile = async () => {
    const file = await pickFile()
    if (!file) return
    setListMedia((prevList) => [...prevList, file[0]])
  }

  const removeQueueMedia = (id) => {
    setListMedia((prevList) => prevList.filter((item) => item.id !== id))
  }

  useEffect(() => {
    socket.emit('joinChat', route.params.chatId)

    getMessages()
  }, [])
  const getMessages = async () => {
    setLoading(true)
    try {
      const response = await getAllMessagesByChatId(
        userData.token,
        route.params.chatId,
        offset,
        limit
      )
      setMessages(response.messages)
      setLoading(false)
    } catch (error) {
      setError(true)
      setNotification('Lấy tin nhắn thất bại')
    } finally {
      setLoading(false)
    }
  }
  const getMessagesAdd = async (offset, limit) => {
    try {
      const response = await getAllMessagesByChatId(
        userData.token,
        route.params.chatId,
        offset,
        limit
      )
      setMessages((prevMessages) => [...prevMessages, ...response.messages])
    } catch (error) {
      setNotification('Lấy tin nhắn thất bại')
    } finally {
    }
  }
  useEffect(() => {
    socket.on('receiveMessage', (message: Messages) => {
      setMessages((prevMessages) => [...prevMessages, message])
      // flatListRef.current.scrollToEnd({ animated: true })
    })
    socket.on('deleteMessage', (messageId) => {
      setMessages((prevMessages) =>
        prevMessages.filter((item) => item.messageId !== messageId)
      )
    })
  }, [socket])
  const sendMessageForMedia = async (media: Files) => {
    const message = {
      inputText,
      files: [media]
    }
    try {
      const response = await sendMessages(
        userData.token,
        route.params.chatId,
        message
      )

      if (response) {
        socket.emit('sendMessage', response, route.params.chatId)
        setMessages((prevMessages) => [...prevMessages, response])
        setInputText('')
        setListMedia([])
        // flatListRef.current.scrollToEnd({ animated: true })
      } else {
        setError(true)
        setNotification('Gửi tin nhắn thất bại')
      }
    } catch (error) {
      setError(true)
      setNotification('Gửi tin nhắn thất bại')
    } finally {
    }
  }
  const sendMessage = async () => {
    const message = {
      inputText,
      files: listMedia
    }
    try {
      const response = await sendMessages(
        userData.token,
        route.params.chatId,
        message
      )

      if (response) {
        setMessages((prevMessages) => [...prevMessages, response])

        socket.emit('sendMessage', response, route.params.chatId)
        setInputText('')
        setListMedia([])
        // flatListRef.current.scrollToEnd({ animated: true })
      } else {
        setError(true)
        setNotification('Gửi tin nhắn thất bại')
      }
    } catch (error) {
      setError(true)
      setNotification('Gửi tin nhắn thất bại')
    } finally {
    }
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // flatListRef.current.scrollToEnd({ animated: true })
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

  const handleFilePress = (fileUrl: string) => {
    Linking.openURL(fileUrl)
  }

  const renderFileContent = useCallback((file: Files) => {
    if (file.fileType.includes('image')) {
      return (
        <Image
          source={{ uri: file.fileUrl }}
          style={styles.messageImage}
          resizeMode="cover"
        />
      )
    } else if (file.fileType.includes('video')) {
      return (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: file.fileUrl }}
            style={styles.videoPlayer}
            controls={false}
            paused={true}
            resizeMode="cover"
          />
          <View style={styles.videoOverlay}>
            <MaterialIcon name="play-circle-filled" size={50} color="white" />
          </View>
        </View>
      )
    } else {
      return (
        <TouchableOpacity
          style={styles.documentContainer}
          onPress={() => handleFilePress(file.fileUrl)}
        >
          <AntDesignIcon name="filetext1" size={24} color="#666" />
          <Text style={styles.documentText} numberOfLines={1}>
            {file.fileName}
          </Text>
        </TouchableOpacity>
      )
    }
  }, [])

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

    const handlePress = () => {
      if (item.Files.length > 0) {
        if (item.Files[0].fileType.includes('image')) {
          openImageViewer(item.Files[0].fileUrl, 'image')
        } else if (item.Files[0].fileType.includes('video')) {
          openImageViewer(item.Files[0].fileUrl, 'video')
        }
      }
    }

    const handleLongPress = () => {
      setModalVisible(true)
      setMessageAction(item.messageId)
      toggleModal()
    }

    return (
      <TouchableOpacity
        onLongPress={handleLongPress}
        onPress={handlePress}
        style={styles.messageWrapper}
      >
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
            {item.content && (
              <Text
                style={[
                  styles.messageText,
                  isCurrentUser && styles.userMessageText
                ]}
              >
                {item.content}
              </Text>
            )}

            {item.Files && item.Files.length > 0 && (
              <View style={styles.filesContainer}>
                {item.Files.map((file) => renderFileContent(file))}
              </View>
            )}

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
      </TouchableOpacity>
    )
  }

  const [modalVisible, setModalVisible] = useState(false)
  const [mesageAction, setMessageAction] = useState()

  const toggleModal = () => setModalVisible(!modalVisible)
  const closeModal = () => setModalVisible(false)

  const handleDeleteMessage = async () => {
    try {
      const response = await deleteMessage(userData.token, mesageAction)

      setMessages((prevMessages) =>
        prevMessages.filter((item) => item.messageId !== mesageAction)
      )

      socket.emit('deleteMessage', route.params.chatId, mesageAction)

      closeModal()
    } catch (error) {
      console.error('Lỗi khi xóa tin nhắn:', error)
    }
  }

  const checkMessage = () => {
    closeModal()
  }

  const saveMessage = () => {
    Clipboard.setString(
      messages.filter((item) => item.messageId === mesageAction)[0].content
    )
    closeModal()
  }

  const [isImageViewerVisible, setImageViewerVisible] = useState(false)
  const [imageUri, setImageUri] = useState('')
  const [typeViewer, setTypeViewer] = useState('')

  const openImageViewer = (uri: string, type: string) => {
    setImageUri(uri)
    setTypeViewer(type)
    setImageViewerVisible(true)
  }

  const closeImageViewer = () => {
    setImageViewerVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#26938E" />
      <SpinnerLoading loading={loading} />
      <Notification
        loading={error}
        message={notification}
        onClose={closeNotification}
      />
      <PickMedia
        open={isPickMediaOpen}
        onClose={closePickMedia}
        onCameraPress={handleCameraPress}
        onVideoPress={handleVideoPress}
        onGalleryPress={handleGalleryPress}
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack()
            socket.emit('outChat', route.params.chatId)
          }}
        >
          <Icon name="chevron-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {route.params.chatType === 'bot'
            ? 'Trợ lý chung cư'
            : route.params.chatType === 'apartment'
            ? 'Trò chuyện chung'
            : route.params.chatType === 'admin'
            ? 'Quản lý chung cư'
            : 'Xin chào, ' + userData.user.fullname}
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FileList', { chatId: route.params.chatId })
          }}
          style={styles.headerButton}
        >
          <Icon name="ellipsis-v" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        // onContentSizeChange={() => {
        //   flatListRef.current.scrollToEnd({ animated: true })
        // }}
        showsVerticalScrollIndicator={false}
        data={messages}
        keyExtractor={(item) => item.messageId.toString()}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        renderItem={renderMessage}
        onStartReached={() => {
          console.log('onStartReached')
          // setOffset(offset + limit)
          // if (offset === 0) return
          // getMessagesAdd(offset + limit, limit)
        }}
        onStartReachedThreshold={0.1}
      />

      <FlatList
        style={{
          padding: 8,
          maxHeight: 50,
          borderRadius: 8,
          backgroundColor: 'transparent',
          position: 'absolute',
          bottom: 70,
          left: 0,
          right: 0,
          zIndex: 10
        }}
        horizontal
        data={listMedia}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              marginHorizontal: 4,
              paddingHorizontal: 8
            }}
          >
            <Text
              key={index}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 16,
                color: 'black',
                padding: 8,
                borderRadius: 8,
                marginHorizontal: 4
              }}
            >
              {item.name}
            </Text>
            <AntDesignIcon
              onPress={() => removeQueueMedia(item.id)}
              name="closecircle"
              size={16}
              color="black"
            />
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        {route.params && route.params.chatType != 'bot' && (
          <>
            <TouchableOpacity
              style={styles.attachmentButton}
              onPress={() => openPickMedia()}
            >
              <FontAwesomeIcon name="camera" size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.attachmentButton}
              onPress={() => handlePickFile()}
            >
              <EntypoIcon name="attachment" size={20} color="#666" />
            </TouchableOpacity>
          </>
        )}
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
            !inputText.trim() &&
              listMedia.length === 0 &&
              styles.sendButtonDisabled
          ]}
          onPress={sendMessage}
          disabled={!inputText.trim() && listMedia.length === 0}
        >
          <Icon
            name="paper-plane"
            size={20}
            color={
              inputText.trim() || listMedia.length >= 0 ? 'white' : '#A5A5A5'
            }
          />
        </TouchableOpacity>
      </View>
      <MessageActionModal
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        closeModal={closeModal}
        deleteMessage={handleDeleteMessage}
        checkMessage={checkMessage}
        saveMessage={saveMessage}
        userId={
          messages.filter((item) => item.messageId === mesageAction)[0]
            ?.senderId
        }
      />
      <ImageViewerModal
        isVisible={isImageViewerVisible}
        imageUri={
          imageUri ||
          'https://techhomearchive.s3.ap-southeast-1.amazonaws.com/defautavatar.jpg'
        }
        onClose={closeImageViewer}
        type={typeViewer}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9'
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
    shadowRadius: 1,
    gap: 4
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginVertical: 4
  },
  filesContainer: {
    marginTop: 4,
    gap: 8
  },
  documentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 8,
    borderRadius: 8,
    gap: 8
  },
  documentText: {
    flex: 1,
    fontSize: 14,
    color: '#666'
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
  queue: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    overflow: 'hidden'
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
  },
  videoContainer: {
    width: 200,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden'
  },
  videoPlayer: {
    width: '100%',
    height: '100%'
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})

export default ChatMessage
