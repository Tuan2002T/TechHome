import React, { useEffect, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import SwitchSelector from 'react-native-switch-selector'
import { SpeedDial } from '@rneui/themed'
import { NavigationProp } from '@react-navigation/native'
import { getAllChats } from '../../../api/API/chat'
import { useSelector } from 'react-redux'

interface ChatListProps {
  navigation: NavigationProp<any>
}

const ChatList: React.FC<ChatListProps> = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('common')
  const [open, setOpen] = useState(false)
  const { userData, status, error } = useSelector((state: any) => state.auth)

  useEffect(() => {
    const getChats = async () => {
      const response = await getAllChats(userData.token)
      console.log(response)
    }
    getChats()
  }, [])

  const commonChats = [
    {
      id: '1',
      title: 'Chat chung cư',
      lastMessage: 'Thông báo về lịch bảo trì thang máy tháng 10',
      time: '12:00',
      unread: 3
    },
    {
      id: '2',
      title: 'Phòng 1503',
      lastMessage: 'Nhờ bảo vệ hỗ trợ đưa xe lên hầm',
      time: '11:30',
      unread: 0
    }
  ]

  const adminChats = [
    {
      id: '1',
      title: 'Ban quản lý',
      lastMessage: 'Cảm ơn bạn đã phản ánh. Chúng tôi sẽ xử lý ngay',
      time: '14:20',
      unread: 1
    }
  ]

  const options = [
    { label: 'Chung', value: 'common' },
    { label: 'Ban quản lý', value: 'admin' }
  ]

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatMessage')}
      style={styles.chatItem}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.title[0]}</Text>
        </View>
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatTitle}>{item.title}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tin nhắn</Text>
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
          data={selectedOption === 'common' ? commonChats : adminChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          style={styles.chatList}
        />
      </View>

      {/* <SpeedDial
        isOpen={open}
        icon={{ name: 'message', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        buttonStyle={styles.speedDial}
      >
        <SpeedDial.Action
          icon={{ name: 'report-problem', color: '#fff' }}
          title="Gửi phản ánh"
          onPress={() => console.log('Send feedback')}
          buttonStyle={styles.speedDialAction}
        />
      </SpeedDial> */}
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
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
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
