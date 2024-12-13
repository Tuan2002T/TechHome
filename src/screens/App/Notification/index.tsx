import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  getAllNotification,
  readAllNotification,
  readNotification
} from '../../../api/API/notification'
import { useSelector } from 'react-redux'
import { NavigationProp } from '@react-navigation/native'
import SpinnerLoading from '../../../Spinner/spinnerloading'
import PullToRefresh from 'react-native-pull-to-refresh'
interface NotificationData {
  notificationId: string
  notificationTitle: string
  notificationBody: string
  createdAt: string
  ResidentNotifications: {
    status: boolean
  }
}

interface NotificationProps {
  navigation: NavigationProp<any>
}

const Notification: React.FC<NotificationProps> = ({ navigation }) => {
  const { userData } = useSelector((state: any) => state.auth)
  const [notificationsData, setNotificationsData] = useState<
    NotificationData[]
  >([])
  const [loading, setLoading] = useState(false)
  const handleRefresh = async () => {
    fetchNotifications()
  }
  useEffect(() => {
    fetchNotifications()
  }, [userData.token])
  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const response = await getAllNotification(userData.token)
      setNotificationsData(response)
      checkReadNotifications(response)
      setLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const checkReadNotifications = (notifications: NotificationData[]) => {
    try {
      notifications.forEach((notification) => {
        if (notification.ResidentNotifications.status === true) {
          setReadNotifications((prev) => [...prev, notification.notificationId])
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const [readNotifications, setReadNotifications] = useState<string[]>([])

  const toggleRead = async (id: string) => {
    const notification = notificationsData.find(
      (notification) => notification.notificationId === id
    )

    if (notification?.ResidentNotifications.status) {
      return
    }

    if (!readNotifications.includes(id)) {
      try {
        await readedNotification(id)
        setReadNotifications((prev) => [...prev, id])
      } catch (error) {
        console.error('Error marking notification as read:', error)
      }
    }
  }

  const readedNotification = (id: string) => {
    try {
      readNotification(userData.token, id)
    } catch (error) {
      console.log(error)
    }
  }

  const readedAllNotifications = () => {
    try {
      readAllNotification(userData.token)
    } catch (error) {
      console.log(error)
    }
  }

  const markAllAsRead = () => {
    const allRead = notificationsData.every(
      (notification) => notification.ResidentNotifications.status === true
    )

    if (allRead) {
      const allIds = notificationsData.map(
        (notification) => notification.notificationId
      )
      setReadNotifications(allIds)
    } else {
      readedAllNotifications()
      const allIds = notificationsData.map(
        (notification) => notification.notificationId
      )
      setReadNotifications(allIds)
    }
  }

  const getDateLabel = (date: string) => {
    const today = new Date()
    const notificationDate = new Date(date)

    if (
      notificationDate.getFullYear() === today.getFullYear() &&
      notificationDate.getMonth() === today.getMonth() &&
      notificationDate.getDate() === today.getDate()
    ) {
      return 'Hôm nay'
    } else if (
      notificationDate.getFullYear() === today.getFullYear() &&
      notificationDate.getMonth() === today.getMonth() &&
      notificationDate.getDate() === today.getDate() - 1
    ) {
      return 'Hôm qua'
    } else {
      return notificationDate.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })
    }
  }

  const renderNotifications = () => {
    return notificationsData.reduce((acc, notification) => {
      const dateLabel = getDateLabel(notification.createdAt)
      const notificationView = (
        <TouchableOpacity
          key={notification.notificationId}
          style={styles.notificationItem}
          onPress={() => toggleRead(notification.notificationId)}
        >
          <View style={styles.notificationContent}>
            <Ionicons
              name={
                readNotifications.includes(notification.notificationId)
                  ? 'checkmark-done'
                  : 'checkmark-sharp'
              }
              size={20}
              color={
                readNotifications.includes(notification.notificationId)
                  ? '#4CAF50'
                  : '#999'
              }
            />
            <View style={styles.notificationTextContainer}>
              <Text
                style={[
                  styles.notificationTitle,
                  readNotifications.includes(notification.notificationId) &&
                    styles.read
                ]}
              >
                {notification.notificationTitle}
              </Text>
              <Text style={styles.notificationDescription}>
                {notification.notificationBody}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
      if (!acc[dateLabel]) {
        acc[dateLabel] = []
      }
      acc[dateLabel].push(notificationView)
      return acc
    }, {} as Record<string, JSX.Element[]>)
  }

  const notificationsGrouped = renderNotifications()

  return (
    // <PullToRefresh onRefresh={handleRefresh}>
    <SafeAreaView style={styles.container}>
      <SpinnerLoading loading={loading} />
      <View style={styles.header}>
        <FontAwesome6Icon
          name="arrow-left"
          size={25}
          color="#FFFFFF"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headertitle}>Thông báo</Text>
        <Text style={{ color: '#F7F7F7' }}> </Text>
      </View>
      <ScrollView style={styles.scrollbar}>
        {Object.entries(notificationsGrouped).map(([date, notifications]) => (
          <View key={date}>
            <Text style={styles.dateLabel}>{date}</Text>
            {notifications}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
        <Ionicons name="checkmark-done" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
    // </PullToRefresh>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#FBA2D0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  headertitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  scrollbar: {
    flex: 1,
    width: '100%'
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#26938E',
    marginVertical: 10,
    marginLeft: 15
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  notificationTextContainer: {
    marginLeft: 10,
    flex: 1
  },
  notificationTitle: {
    fontSize: 16,
    color: '#333'
  },
  notificationDescription: {
    fontSize: 14,
    color: '#777'
  },
  read: {
    color: '#777'
  },
  markAllButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FBA2D0',
    borderRadius: 30,
    padding: 10,
    elevation: 5
  }
})

export default Notification
