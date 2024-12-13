import React, { useEffect, useState } from 'react'
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'
import { Card, Title } from 'react-native-paper'
import { Calendar, MapPin, ArrowLeft } from 'lucide-react-native'
import { getAllEvents } from '../../../api/API/events'
import { useSelector } from 'react-redux'
import SpinnerLoading from '../../../Spinner/spinnerloading'
import Notification from '../../../Modal/Notification/notification'
import { socket } from '../../../Socket/socket'
import { showMessage } from 'react-native-flash-message'

interface Event {
  eventId: string
  eventName: string
  eventDate: string
  eventLocation: string
  eventDescription: string
}

interface ApartmentDetails {
  building: {
    id: string
  }
}

interface SignInData {
  token: string
}

interface EventCardProps {
  item: Event
  onPress: () => void
}

interface EventsProps {
  navigation: any
}

const EventCard: React.FC<EventCardProps> = ({ item, onPress }) => {
  const formatDate = (date: string): string => {
    const eventDate = new Date(date)
    const day = eventDate.getDate()
    const month = eventDate.getMonth() + 1
    const year = eventDate.getFullYear()
    const hours = eventDate.getHours()
    const minutes = eventDate.getMinutes()
    const time = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`
    return `${day}/${month}/${year} - ${time} `
  }

  const isEventPast = (eventDate: string): boolean => {
    const currentDate = new Date()
    const eventDateTime = new Date(eventDate)
    return eventDateTime < currentDate
  }

  const isPastEvent = isEventPast(item.eventDate) // Check if the event is in the past

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.cardContainer, isPastEvent && styles.fadedCard]}
    >
      <Card style={[styles.eventItem, isPastEvent && styles.fadedCard]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={[styles.eventTitle, isPastEvent && styles.fadedText]}>
              {item.eventName}
            </Title>
          </View>

          <View style={styles.eventDetailsContainer}>
            <View style={styles.eventDetailRow}>
              <Calendar size={20} color="#1a73e8" style={styles.icon} />
              <Text
                style={[styles.eventDetails, isPastEvent && styles.fadedText]}
              >
                {formatDate(item.eventDate)}
              </Text>
            </View>

            <View style={styles.eventDetailRow}>
              <MapPin size={20} color="#4CAF50" style={styles.icon} />
              <Text
                style={[styles.eventDetails, isPastEvent && styles.fadedText]}
              >
                {item.eventLocation}
              </Text>
            </View>
          </View>

          <Text
            style={[styles.eventDescription, isPastEvent && styles.fadedText]}
            numberOfLines={2}
          >
            {item.eventDescription}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  )
}

const Events: React.FC<EventsProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [notification, setNotification] = useState('')
  const closeNotification = () => {
    setError(false)
    setLoading(false)
  }
  const [events, setEvents] = useState<Event[]>([])
  const { userData } = useSelector((state: any) => state.auth)
  const apartmentDetailsData = useSelector(
    (state: any) => state.apartmentDetails.apartmentDetails
  )

  useEffect(() => {
    getEvents()
  }, [])

  useEffect(() => {
    socket.on('notificationEvent', (event) => {
      setEvents((prev) => [event, ...prev])
    })
  }, [socket])

  const getEvents = async () => {
    setLoading(true)
    try {
      const response = await getAllEvents(
        userData.token,
        apartmentDetailsData.building.id
      )
      setLoading(false)
      // Sort the events by eventDate, newest first
      const sortedEvents = response.sort(
        (a: Event, b: Event) =>
          new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
      )
      setEvents(sortedEvents)
    } catch (error) {
      setLoading(false)
      setError(true)
      setNotification('Lấy danh sách sự kiện thất bại')
    }
  }

  const handleEventPress = (event: Event) => {
    console.log('Pressed event:', event.eventName)
  }

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <SpinnerLoading loading={loading} />
      <Notification
        loading={error}
        message={notification}
        onClose={closeNotification}
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#1a73e8" />
        </TouchableOpacity>
        <Text style={styles.title}>Danh sách sự kiện</Text>
      </View>

      <FlatList
        data={events}
        keyExtractor={(item, index) => `${item.eventId}-${index}`}
        renderItem={({ item }) => (
          <EventCard item={item} onPress={() => handleEventPress(item)} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7'
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 16
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a73e8',
    textAlign: 'center'
  },
  cardContainer: {
    marginBottom: 12
  },
  eventItem: {
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  fadedCard: {
    opacity: 1
  },
  cardHeader: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  },
  fadedText: {
    color: '#bbb'
  },
  eventDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 8
  },
  eventDetails: {
    fontSize: 16,
    color: '#666'
  },
  eventDescription: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic'
  }
})

export default Events
