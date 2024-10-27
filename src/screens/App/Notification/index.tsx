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
import { getAllNotification } from '../../../api/API/notification'
import { useSelector } from 'react-redux'

const Notification = ({ navigation }) => {
  const { userData } = useSelector((state) => state.auth)
  const [notificationsData, setNotificationsData] = useState([])

  useEffect(() => {
    const allNotifications = async () => {
      try {
        const response = await getAllNotification(userData.token)
        console.log(response)

        setNotificationsData(response)
      } catch (error) {
        console.log(error)
      }
    }

    const checkReadNotifications = async () => {
      try {
        notificationsData.forEach(async (notification) => {
          if (notification.ResidentNotifications.status === true) {
            setReadNotifications([
              ...readNotifications,
              notification.notificationId
            ])
          }
        })
      } catch (error) {
        console.log(error)
      } finally {
        allNotifications()
      }
    }
    allNotifications()
    checkReadNotifications()
  }, [])

  const [readNotifications, setReadNotifications] = useState([])

  const toggleRead = (id) => {
    if (readNotifications.includes(id)) {
      // setReadNotifications(
      //   readNotifications.filter((notificationId) => notificationId !== id)
      // )
    } else {
      setReadNotifications([...readNotifications, id])
    }
  }

  const markAllAsRead = () => {
    const allIds = notificationsData.map(
      (notification) => notification.notificationId
    )
    setReadNotifications(allIds)
  }

  const getDateLabel = (date) => {
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
    }, {})
  }

  const notificationsGrouped = renderNotifications()

  return (
    <SafeAreaView style={styles.container}>
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
