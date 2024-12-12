import React, { useEffect, useState } from 'react'
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Button } from '@rneui/base'

import { useSelector } from 'react-redux'
import FloatingActionComponent from '../Component/FloatingActionComponent.tsx'
import SpendingChartComponent from './SpendingChart/SpendingChartComponent.tsx'
import { NavigationProp } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { getAllBills } from '../../../api/API/bill.js'
import { createPayment } from '../../../api/API/payment.js'
import Notification from '../../../Modal/Notification/notification.tsx'
import SpinnerLoading from '../../../Spinner/spinnerloading.js'
import { socket } from '../../../Socket/socket.js'
import { showMessage } from 'react-native-flash-message'

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

  useEffect(() => {
    getTotalBills()
  }, [])
  useEffect(() => {
    socket.on('notification', (message) => {
      showMessage({
        message: 'Bạn có thông báo mới',
        description: 'Tin nhắn từ phòng chat',
        type: 'success'
      })
    })

    socket.on('notificationPayment', (message) => {
      showMessage({
        message: 'Bạn có thông báo mới',
        description: 'Thanh toán hóa đơn thanh công',
        type: 'success'
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
        <View style={styles.header}>
          <Text style={styles.name}>
            {t('screen.home.welcome')}, {userData.user.fullname}
          </Text>
        </View>
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

        <View style={styles.floatActions}>
          <FloatingActionComponent
            icon={<FontAwesomeIcon name="home" size={35} color="#26938E" />}
            title={t('screen.home.button.home')}
            style={{}}
            onPress={() => navigation.navigate('ApartmentDetails')}
          />

          <FloatingActionComponent
            icon={<MaterialIcons name="event" size={33} color="#FF5722" />}
            title={t('screen.home.button.event')}
            style={{}}
            onPress={() => navigation.navigate('Events')}
          />

          <FloatingActionComponent
            icon={<Fontisto name="bell" size={24} color="#FFC107" />}
            title={t('screen.home.button.notification')}
            style={{}}
            onPress={() => navigation.navigate('Notification')}
          />

          <FloatingActionComponent
            icon={<FontAwesomeIcon name="send" size={30} color="#673AB7" />}
            title={t('screen.home.button.sendFeedback')}
            style={{}}
            onPress={() => navigation.navigate('Feedback')}
          />
        </View>
        <SpendingChartComponent />
      </View>
    </ScrollView>
  )
}

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
  }
})

export default Home
