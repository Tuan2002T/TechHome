import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SwitchSelector from 'react-native-switch-selector'
import ButtonCustom from '../../authentication/Custom/ButtonCustom'
import { getAllBills } from '../../../api/API/bill'
import { useSelector } from 'react-redux'
import { NavigationProp } from '@react-navigation/native'
import TableBill from './Component/table'
import TableBillHistory from './Component/tablehistory'

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
  const { userData } = useSelector((state: any) => state.auth)
  const [bills, setBills] = useState<BillItem[]>([])
  const [history, setHistory] = useState<BillItem[]>([])
  const [selectedOption, setSelectedOption] = useState('1')

  const [selectedItems, setSelectedItems] = useState<BillItem[]>([])

  const handleSelectionChange = (items: BillItem[]) => {
    console.log(items)

    setSelectedItems(items)
  }

  const options = [
    { label: 'Thanh toán', value: '1' },
    { label: 'Lịch sử giao dịch', value: '1.5' }
  ]

  const getBills = async () => {
    try {
      const response = await getAllBills(userData.token)
      const unpaidBills = response.filter(
        (item) => item.billStatus === 'UNPAID'
      )
      const paidBills = response.filter((item) => item.billStatus === 'PAID')

      setBills(unpaidBills)
      setHistory(paidBills)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBills()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hearderText}>Hoá đơn</Text>
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
            Tổng nợ dư: 1.000.000đ
          </Text>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Tạm tính: 300.000đ
          </Text>
        </View>
        <ButtonCustom
          onPress={() => navigation.navigate('Payment')}
          title="Thanh toán"
          buttonStyle={styles.payButton}
          titleStyle={{ color: 'white', fontSize: 15 }}
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
