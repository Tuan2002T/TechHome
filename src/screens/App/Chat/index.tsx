import React, { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import SwitchSelector from 'react-native-switch-selector'
import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import { getAllChats } from '../../../api/API/chat'
import { useSelector } from 'react-redux'
import SpinnerLoading from '../../../Spinner/spinnerloading'
import Notification from '../../../Modal/Notification/notification'
import { useTranslation } from 'react-i18next'

interface ChatList {
  chatId: number
  chatName: string
  chatType: string
  chatDate: string
}
interface ChatListProps {
  navigation: NavigationProp<any>
}

const ChatList: React.FC<ChatListProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [notification, setNotification] = useState('')
  const closeNotification = () => {
    setError(false)
    setLoading(false)
  }

  const [selectedOption, setSelectedOption] = useState('common')
  const [chats, setChats] = useState<ChatList[]>([])
  const { userData } = useSelector((state: any) => state.auth)

  useFocusEffect(
    useCallback(() => {
      console.log('Tab Chat đã được focus')
      getChats()
      return () => {
        console.log('Tab Chat mất focus')
      }
    }, [])
  )

  useEffect(() => {
    getChats()
  }, [userData.token])

  const getChats = async () => {
    setLoading(true)
    try {
      const response = await getAllChats(userData.token)
      setChats(response)
    } catch (error) {
      setError(true)
      setNotification('Lấy danh sách cuộc trò chuyện thất bại')
    } finally {
      setLoading(false)
    }
  }
  const filteredChats = chats?.length
    ? chats.filter((chat) =>
        selectedOption === 'common'
          ? chat.chatType === 'apartment' || chat.chatType === 'bot'
          : chat.chatType === 'admin'
      )
    : []

  const options = [
    { label: t('screen.chat.select.all'), value: 'common' },
    { label: t('screen.chat.select.admin'), value: 'admin' }
  ]

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (item.chatType === 'bot') {
          console.log(item.chatType === 'bot')
          navigation.navigate('ChatBot', {
            chatId: item.chatId,
            chatType: item.chatType
          })
        } else {
          navigation.navigate('ChatMessage', {
            chatId: item.chatId,
            chatType: item.chatType
          })
        }
      }}
      style={styles.chatItem}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.chatName[0]}</Text>
        </View>
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatTitle}>{item.chatName}</Text>
          <Text style={styles.chatTime}>
            {new Date(item.chatDate).toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {t('screen.chat.newMessage')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <SpinnerLoading loading={loading} />
      <Notification
        loading={error}
        message={notification}
        onClose={closeNotification}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('screen.chat.title')}</Text>
      </View>

      <View style={styles.content}>
        <SwitchSelector
          options={options}
          initial={0}
          onPress={(value) => setSelectedOption(value)}
          textColor={'#32AE63'}
          selectedColor={'white'}
          buttonColor={'#32AE63'}
          borderColor={'#32AE63'}
          hasPadding
          style={styles.switchSelector}
        />

        <FlatList
          data={filteredChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.chatId.toString()}
          style={styles.chatList}
        />
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
    width: '100%',
    height: 150,
    backgroundColor: '#32AE63',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5
  },
  headerText: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20
  },
  switchSelector: {
    width: '90%',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 25,
    overflow: 'hidden'
  },
  chatList: {
    width: '100%',
    paddingHorizontal: 20
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2
  },
  avatarContainer: {
    marginRight: 15
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#32AE63',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  chatInfo: {
    flex: 1
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  chatTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333'
  },
  chatTime: {
    fontSize: 13,
    color: '#888'
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 10
  },
  unreadBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  speedDial: {
    backgroundColor: '#32AE63',
    borderRadius: 30
  },
  speedDialAction: {
    backgroundColor: '#32AE63',
    borderRadius: 25
  }
})

export default ChatList
