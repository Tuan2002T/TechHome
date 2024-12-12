import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { NavigationProp } from '@react-navigation/native'
import { createBill } from '../../../../api/API/bill'
import { bookingService } from '../../../../api/API/bookingService'
import { useSelector } from 'react-redux'
import SpinnerLoading from '../../../../Spinner/spinnerloading'
import Notification from '../../../../Modal/Notification/notification'
import { createPayment } from '../../../../api/API/payment'
import { getAllBuildingServices } from '../../../../api/API/service'

interface Service {
  id: number
  name: string
  description: string
  price: string
  contact: string
  availability: string
  location: string
  estimatedTime: string
  warranty: string
  notes: string
}

interface ServiceInfoRow {
  icon: string
  title: string
  value: string
}

interface BookServiceProps {
  navigation: NavigationProp<any>
  route: {
    params: {
      item: Service
    }
  }
}

export default function BookService({ navigation, route }: BookServiceProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [notification, setNotification] = useState('')
  const closeNotification = () => {
    setError(false)
    setLoading(false)
    navigation.navigate('Payment')
  }
  const { userData } = useSelector((state: any) => state.auth)

  const [service, setService] = React.useState<Service>(route.params.item)
  const [data, setData] = React.useState<Service[]>([])

  useEffect(() => {
    getAllService()
  }, [])
  const getAllService = async () => {
    try {
      const response = await getAllBuildingServices(userData.token)
      response.buildingServices.map((item: Service) => {
        console.log('Item:', item.serviceId)

        if (item.serviceId == service.id) {
          service.price = item.servicePrice
        }
      })
      setData(response.buildingServices)
    } catch (error) {
      console.error(error)
    }
  }

  const handleBookingService = async () => {
    setLoading(true)
    try {
      const bookingResponse = await bookingService(userData.token, service.id)
      console.log('Booking Response:', bookingResponse)

      try {
        const data = {
          billIds: [bookingResponse.bill.billId]
        }
        const paymentResponse = await createPayment(userData.token, data)
        console.log('Payment Response:', paymentResponse)

        if (paymentResponse) {
          navigation.navigate('Payment', { response: paymentResponse })
          setNotification('Đặt dịch vụ thành công')
        } else {
          setError(true)
          setNotification('Tạo thanh toán thất bại')
        }
      } catch (paymentError) {
        console.error('Payment Error:', paymentError)
        setError(true)
        setNotification('Tạo thanh toán thất bại')
      }
    } catch (bookingError) {
      console.error('Booking Error:', bookingError)
      setError(true)
      setNotification('Đặt dịch vụ thất bại')
    } finally {
      setLoading(false)
    }
  }
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }
  const ServiceInfoRow = ({ icon, title, value }: ServiceInfoRow) => (
    <View style={styles.infoRow}>
      <FeatherIcon
        name={icon}
        size={20}
        color="#32AE63"
        style={styles.infoIcon}
      />
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoTitle}>{title}:</Text>
        <Text style={styles.info}>{value}</Text>
      </View>
    </View>
  )

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <SpinnerLoading loading={loading} />
      <Notification
        loading={error}
        message={notification}
        onClose={closeNotification}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết dịch vụ</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <FeatherIcon name="package" size={50} color="#32AE63" />
        </View>

        <Text style={styles.title}>{service.name}</Text>
        <Text style={styles.price}>{formatCurrency(service.price)}</Text>

        <Text style={styles.description}>{service.description}</Text>

        <View style={styles.infoContainer}>
          <ServiceInfoRow
            icon="phone"
            title="Liên hệ"
            value={service.contact}
          />
          <ServiceInfoRow
            icon="clock"
            title="Giờ làm việc"
            value={service.availability}
          />
          <ServiceInfoRow
            icon="map-pin"
            title="Địa điểm"
            value={service.location}
          />
          <ServiceInfoRow
            icon="calendar"
            title="Thời gian dự kiến"
            value={service.estimatedTime}
          />
          <ServiceInfoRow
            icon="shield"
            title="Bảo hành"
            value={service.warranty}
          />
          <ServiceInfoRow
            icon="file-text"
            title="Ghi chú"
            value={service.notes}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleBookingService()}
        >
          <Text style={styles.buttonText}>Đặt dịch vụ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f9',
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#32AE63',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20
  },
  backButton: {
    marginRight: 15
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center'
  },
  iconContainer: {
    backgroundColor: '#F0F6F1',
    borderRadius: 50,
    padding: 15,
    marginBottom: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#32AE63',
    textAlign: 'center'
  },
  price: {
    fontSize: 20,
    color: '#32AE63',
    marginBottom: 15
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#888'
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5
  },
  infoIcon: {
    marginRight: 15
  },
  infoTextContainer: {
    flex: 1
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 3
  },
  info: {
    fontSize: 14,
    color: '#555'
  },
  button: {
    backgroundColor: '#32AE63',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
