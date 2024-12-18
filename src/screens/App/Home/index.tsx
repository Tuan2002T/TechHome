import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import Swiper from 'react-native-swiper'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Button } from '@rneui/base'

import { useSelector } from 'react-redux'
import FloatingActionComponent from '../Component/FloatingActionComponent.tsx'
import SpendingChartComponent from './SpendingChart/SpendingChartComponent.tsx'
import {
  CommonActions,
  NavigationProp,
  useFocusEffect
} from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { getAllBills } from '../../../api/API/bill.js'
import { createPayment } from '../../../api/API/payment.js'
import Notification from '../../../Modal/Notification/notification.tsx'
import SpinnerLoading from '../../../Spinner/spinnerloading.js'
import { socket } from '../../../Socket/socket.js'
import { showMessage } from 'react-native-flash-message'
import { getAllAdvertisements } from '../../../api/API/advertisement.js'

interface HomeProps {
  navigation: NavigationProp<any>
}

interface BillProps {
  billId: string
  billAmount: number
  billDate: string
  billStatus: string
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [notification, setNotification] = useState('')
  const closeNotification = () => {
    setError(false)
    setLoading(false)
  }
  const { userData } = useSelector((state: any) => state.auth)
  const [total, setTotal] = useState(0)
  const [billIds, setBillIds] = useState<Number[]>([])
  const [advertisements, setAdvertisements] = useState([])

  useEffect(() => {
    getTotalBills()
    getAdvertisement()
  }, [])

  useEffect(() => {
    socket.on('notification', (message) => {
      showMessage({
        message: 'Bạn có thông báo mới',
        description: 'Tin nhắn từ phòng chat',
        type: 'success'
      })
    })
    socket.on('notificationNotification', (notification) => {
      showMessage({
        message: 'Bạn có thông báo mới',
        type: 'info',
        duration: 3000
      })
    })
    socket.on('notificationComplaint', (complaint) => {
      showMessage({
        message: 'Ý kiến của bạn đã được xử lý',
        type: 'info',
        duration: 3000
      })
    })
    socket.on('notificationEvent', (event) => {
      showMessage({
        message: 'Sự kiện mới được tạo',
        type: 'info',
        duration: 3000
      })
    })
  }, [socket])

  const getTotalBills = async () => {
    try {
      const response = await getAllBills(userData.token)
      let total = 0
      let billIds: Number[] = []
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      response.forEach((bill: any) => {
        const billDate = new Date(bill.billDate)
        const billMonth = billDate.getMonth()
        const billYear = billDate.getFullYear()

        if (
          bill.billStatus === 'UNPAID' &&
          billMonth === currentMonth &&
          billYear === currentYear
        ) {
          total += Number(bill.billAmount)
          billIds.push(bill.billId)
        }
      })
      setBillIds(billIds)
      setTotal(total)
    } catch (error) {
      console.error(error)
    }
  }

  const getAdvertisement = async () => {
    try {
      const response = await getAllAdvertisements(userData.token)
      const data = response.advertisements

      const randomAdvertisements = data
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)

      setAdvertisements(randomAdvertisements)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCreatePayment = async () => {
    setLoading(true)
    try {
      const data = { billIds: billIds }
      const response = await createPayment(userData.token, data)
      console.log(response)

      setLoading(false)
      if (response) {
        navigation.navigate('Payment', { response })
      } else {
        setError(true)
        console.log(t('screen.notification.payment.create.error'))

        setNotification(t('notification.payment.create.error'))
      }
    } catch (error) {
      setError(true)
      setNotification(t('notification.payment.create.error'))
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const isServiceProvider = userData?.resident?.role === 'SERVICEPROVIDER'

  return (
    <ScrollView style={styles.scrollbar}>
      <StatusBar barStyle="light-content" backgroundColor="#26938E" />
      <SpinnerLoading loading={loading} />
      <Notification
        loading={error}
        message={notification}
        onClose={closeNotification}
      />
      <View style={styles.container}>
        <View
          style={[!isServiceProvider ? styles.header : styles.headerSerive]}
        >
          <Text style={styles.name}>
            {t('screen.home.welcome')}, {userData.user.fullname}
          </Text>
        </View>

        {!isServiceProvider && (
          <View style={styles.notification}>
            <Text style={styles.headerNotification}>
              {t('screen.home.totalBills')}
              {new Date().getMonth() + 1}/{new Date().getFullYear()}
            </Text>
            <Text style={styles.money}>{formatCurrency(total)}</Text>
            <View style={styles.cbbutton}>
              <Button
                containerStyle={styles.button}
                type="outline"
                buttonStyle={styles.button}
                titleStyle={styles.titlebutton}
                title={t('screen.home.buttonDetail')}
              />
              <Button
                onPress={handleCreatePayment}
                containerStyle={styles.button}
                type="outline"
                disabled={total === 0}
                buttonStyle={
                  total === 0
                    ? { ...styles.button, backgroundColor: '#74747474' }
                    : styles.button
                }
                titleStyle={styles.titlebutton}
                title={t('screen.home.buttonPay')}
              />
            </View>
          </View>
        )}

        {!isServiceProvider && (
          <View style={styles.swiperContainer}>
            <Swiper
              style={styles.wrapper}
              showsButtons={false}
              autoplay={true}
              showsPagination={false}
              autoplayTimeout={3}
              dotColor="rgba(255,255,255,0.3)"
              activeDotColor="#ffffff"
              paginationStyle={styles.paginationStyle}
            >
              {advertisements[0] && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AdvertisementDetail', {
                      advertisement: advertisements[0]
                    })
                  }
                  style={styles.slide}
                >
                  <Image
                    source={{
                      uri: advertisements[0]?.advertisementImage
                    }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={styles.slideTextContainer}>
                    <Text style={styles.slideText}>
                      {advertisements[0]?.advertisementName}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              {advertisements[1] && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AdvertisementDetail', {
                      advertisement: advertisements[1]
                    })
                  }
                  style={styles.slide}
                >
                  <Image
                    source={{
                      uri: advertisements[1]?.advertisementImage
                    }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={styles.slideTextContainer}>
                    <Text style={styles.slideText}>
                      {advertisements[1]?.advertisementName}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              {advertisements[2] && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AdvertisementDetail', {
                      advertisement: advertisements[2]
                    })
                  }
                  style={styles.slide}
                >
                  <Image
                    source={{
                      uri: advertisements[2]?.advertisementImage
                    }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={styles.slideTextContainer}>
                    <Text style={styles.slideText}>
                      {advertisements[2]?.advertisementName}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              {advertisements[3] && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AdvertisementDetail', {
                      advertisement: advertisements[3]
                    })
                  }
                  style={styles.slide}
                >
                  <Image
                    source={{
                      uri: advertisements[3]?.advertisementImage
                    }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={styles.slideTextContainer}>
                    <Text style={styles.slideText}>
                      {advertisements[3]?.advertisementName}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              {advertisements[4] && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AdvertisementDetail', {
                      advertisement: advertisements[4]
                    })
                  }
                  style={styles.slide}
                >
                  <Image
                    source={{
                      uri: advertisements[4]?.advertisementImage
                    }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={styles.slideTextContainer}>
                    <Text style={styles.slideText}>
                      {advertisements[4]?.advertisementName}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => navigation.navigate('AdvertisementList')}
                style={styles.slide}
              >
                <View style={styles.slideTextSeeMore}>
                  <Text style={styles.slideTextSeeMoreText}>
                    Xem thêm quảng cáo
                  </Text>
                </View>
              </TouchableOpacity>
            </Swiper>
          </View>
        )}

        <View style={styles.floatActions}>
          {!isServiceProvider && (
            <>
              <FloatingActionComponent
                icon={<FontAwesomeIcon name="home" size={35} color="#26938E" />}
                title={t('screen.home.button.home')}
                onPress={() => navigation.navigate('ApartmentDetails')}
              />
              <FloatingActionComponent
                icon={<MaterialIcons name="event" size={33} color="#FF5722" />}
                title={t('screen.home.button.event')}
                onPress={() => navigation.navigate('Events')}
              />
              <FloatingActionComponent
                icon={<Fontisto name="bell" size={24} color="#FFC107" />}
                title={t('screen.home.button.notification')}
                onPress={() => navigation.navigate('Notification')}
              />
              <FloatingActionComponent
                icon={<FontAwesomeIcon name="send" size={30} color="#673AB7" />}
                title={t('screen.home.button.sendFeedback')}
                onPress={() => navigation.navigate('Feedback')}
              />
            </>
          )}
          {isServiceProvider && (
            <>
              <FloatingActionComponent
                icon={
                  <MaterialIcons name="add-box" size={35} color="#26938E" />
                }
                title="Thêm dịch vụ"
                onPress={() =>
                  navigation.navigate('AddOutsourcingServiceScreen')
                }
              />
              <FloatingActionComponent
                icon={
                  <MaterialCommunityIcons
                    name="advertisements"
                    size={33}
                    color="#FF5722"
                  />
                }
                title="Thêm quảng cáo"
                onPress={() => navigation.navigate('Advertisement')}
              />
              <FloatingActionComponent
                icon={
                  <FontAwesome5
                    name="clipboard-list"
                    size={30}
                    color="#FFC107"
                  />
                }
                title="Đơn hàng"
                onPress={() => navigation.navigate('Notification')}
              />
              <FloatingActionComponent
                icon={
                  <FontAwesomeIcon name="th-list" size={30} color="#673AB7" />
                }
                title="Dich vụ và quảng cáo của bạn"
                onPress={() =>
                  navigation.navigate('ServiceAdvertisementScreen')
                }
              />
            </>
          )}
        </View>

        {!isServiceProvider && <SpendingChartComponent />}
      </View>
    </ScrollView>
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  scrollbar: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },
  container: {
    alignItems: 'center'
  },
  header: {
    width: '100%',
    height: 180,
    backgroundColor: '#26938E',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center'
  },
  headerSerive: {
    width: '100%',
    height: 130,
    backgroundColor: '#26938E',
    alignItems: 'center'
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30
  },
  room: {
    color: 'white',
    fontSize: 16,
    marginTop: 5
  },
  notificationIcon: {
    position: 'absolute',
    right: 20,
    top: 50
  },
  notification: {
    width: '90%',
    height: 170,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: -80,
    alignItems: 'center'
  },
  headerNotification: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: 28,
    color: 'rgba(102, 102, 102, 0.40)'
  },
  money: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#26938E',
    marginTop: 10
  },
  cbbutton: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    width: '80%'
  },
  buttonContainer: {
    borderRadius: 100,
    overflow: 'hidden',
    width: 120
  },
  button: {
    width: 120,
    height: 40,
    borderRadius: 100,
    borderColor: '#94989B',
    borderWidth: 1
  },
  titlebutton: {
    color: '#94989B',
    fontSize: 15
  },
  listContainer: {
    width: '95%'
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  item: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  headerList: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
    color: 'black'
  },
  floatActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20
  },
  swiperContainer: {
    height: 200,
    marginTop: 20,
    width: width - 30,
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 15
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  image: {
    width: width - 30,
    height: 200,
    borderRadius: 15
  },
  slideTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  slideTextSeeMore: {
    width: width - 30,
    height: 200,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center'
  },
  slideTextSeeMoreText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  slideText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  paginationStyle: {
    bottom: 10
  }
})

export default Home
