import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SwitchSelector from 'react-native-switch-selector'
import ButtonCustom from '../../authentication/Custom/ButtonCustom'
import { getAllBills } from '../../../api/API/bill'
import { useSelector } from 'react-redux'
import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import TableBill from './Component/table'
import TableBillHistory from './Component/tablehistory'
import { createPayment } from '../../../api/API/payment'
import SpinnerLoading from '../../../Spinner/spinnerloading'
import Notification from '../../../Modal/Notification/notification'
import { useTranslation } from 'react-i18next'
import { socket } from '../../../Socket/socket'

interface BillProps {
  navigation: NavigationProp<any>
}

interface BillItem {
  billId: string
  billStatus: string
  billAmount: number
  billDate: string
  billName: string
  serviceBookingId: string
}

const Bill: React.FC<BillProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [notification, setNotification] = useState('')

  const closeNotification = () => {
    setError(false)
    setLoading(false)
  }
  const { userData } = useSelector((state: any) => state.auth)
  const [bills, setBills] = useState<BillItem[]>([])
  const [history, setHistory] = useState<BillItem[]>([])
  const [selectedOption, setSelectedOption] = useState('1')
  const [total, setTotal] = useState(0)
  const [sumTotal, setSumTotal] = useState(0)
  const [selectedItems, setSelectedItems] = useState<BillItem[]>([])

  useEffect(() => {
    socket.on('webhookPayment', (message) => {
      getBills()
    })
  }, [socket])

  const handleSelectionChange = (items: BillItem[]) => {
    if (items !== selectedItems) {
      setTotal(
        items.reduce((acc, item) => acc + Number(item.billAmount || 0), 0)
      )
      setSelectedItems(items)
    }
  }

  const options = [
    { label: t('screen.bill.select.payment'), value: '1' },
    { label: t('screen.bill.select.history'), value: '1.5' }
  ]

  const getBills = async () => {
    setLoading(true)
    try {
      const response = await getAllBills(userData.token)
      const unpaidBills = response.filter(
        (item) => item.billStatus === 'UNPAID'
      )
      const paidBills = response.filter((item) => item.billStatus === 'PAID')

      const totalUnpaid = unpaidBills.reduce(
        (acc, item) => acc + Number(item.billAmount || 0),
        0
      )
      setSumTotal(totalUnpaid)
      setBills(unpaidBills)
      setHistory(paidBills)
      setLoading(false)
    } catch (error) {
      setError(true)
      setNotification('Lấy danh sách hóa đơn thất bại')
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBills()
  }, [])

  useFocusEffect(
    useCallback(() => {
      getBills()
      return () => {}
    }, [])
  )

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const handleCreatePayment = async () => {
    setLoading(true)
    try {
      const data = { billIds: selectedItems.map((item) => item.billId) }
      const response = await createPayment(userData.token, data)
      console.log(response)

      setLoading(false)
      if (response) {
        navigation.navigate('Payment', { response })
      } else {
        setError(true)
        setNotification('Tạo thanh toán thất bại')
      }
    } catch (error) {
      setError(true)
      setNotification('Tạo thanh toán thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <SpinnerLoading loading={loading} />
      <Notification
        loading={error}
        message={notification}
        onClose={closeNotification}
      />
      <View style={styles.header}>
        <Text style={styles.hearderText}>{t('screen.bill.title')}</Text>
      </View>
      <View style={styles.content}>
        <SwitchSelector
          options={options}
          textColor={'black'}
          buttonColor={'#32AE63'}
          selectedColor={'white'}
          borderColor={'#32AE63'}
          borderRadius={12}
          valuePadding={3}
          hasPadding
          initial={0}
          onPress={(value) => {
            setSelectedOption(value)
          }}
          style={styles.switchSelector}
        />
      </View>
      {selectedOption === '1' ? (
        <TableBill data={bills} onSelectionChange={handleSelectionChange} />
      ) : (
        <TableBillHistory data={history} />
      )}
      <View style={styles.pay}>
        <View>
          <Text style={{ color: '#94989B', marginBottom: 10 }}>
            {t('screen.bill.total')}:{formatCurrency(sumTotal)}
          </Text>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            {t('screen.bill.provisional')}: {formatCurrency(total)}
          </Text>
        </View>
        <ButtonCustom
          onPress={() => handleCreatePayment()}
          title={t('screen.bill.button')}
          buttonStyle={styles.payButton}
          titleStyle={{ color: 'white', fontSize: 15 }}
          disabled={selectedItems.length === 0}
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
    justifyContent: 'center'
  },
  hearderText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 35
  },
  content: {
    alignItems: 'center'
  },
  switchSelector: {
    width: '90%',
    borderWidth: 0.3,
    borderColor: '#32AE63',
    borderRadius: 100,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 20
  },
  pay: {
    width: '100%',
    height: 80,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  payButton: {
    width: 140,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#26938E'
  }
})

export default Bill
