import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { useSelector } from 'react-redux'
import { getServiceBookingsByServiceProviders } from '../../../api/API/bookingService'

const BillItem = ({ item }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.billName}>{item.billName}</Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.billStatus === 'UNPAID' ? '#FFE5E5' : '#E5FFE5'
            }
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: item.billStatus === 'UNPAID' ? '#FF4444' : '#44FF44' }
            ]}
          >
            {item.billStatus === 'UNPAID' ? 'Chưa thanh toán' : 'Đã thanh toán'}
          </Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.row}>
          <Text style={styles.label}>Số tiền:</Text>
          <Text style={styles.amount}>{formatCurrency(item.billAmount)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Ngày:</Text>
          <Text style={styles.value}>{formatDate(item.billDate)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Khách hàng:</Text>
          <Text style={styles.value}>{item.fullname}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{item.email}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>SĐT:</Text>
          <Text style={styles.value}>{item.phonenumber}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const BillListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const { userData } = useSelector((state: any) => state.auth)
  const [bills, setBills] = useState([])

  const getAllBills = async () => {
    try {
      const response = await getServiceBookingsByServiceProviders(
        userData.token
      )
      setBills(response.data) // Assuming response.data is the array of bills
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (userData?.token) {
      getAllBills()
    }
  }, [userData]) // Only re-fetch when userData changes

  const filteredBills = bills.filter((bill) =>
    bill.billName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalBills = filteredBills.length
  const unpaidBills = filteredBills.filter(
    (bill) => bill.billStatus === 'UNPAID'
  ).length

  const totalUnpaidAmount = filteredBills.reduce((sum, bill) => {
    if (bill.billStatus === 'UNPAID') {
      return sum + parseFloat(bill.billAmount)
    }
    return sum
  }, 0)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>Quay lại</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Danh sách hóa đơn</Text>
          <Text></Text>
        </View>

        <TextInput
          style={styles.searchBar}
          placeholder="Tìm kiếm theo tên món"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Tổng số: {totalBills}</Text>
          <Text style={styles.statsText}>Chưa thanh toán: {unpaidBills}</Text>
        </View>
        <Text style={styles.totalUnpaid}>
          Tổng tiền chưa thanh toán:{' '}
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(totalUnpaidAmount)}
        </Text>
      </View>

      <FlatList
        data={filteredBills}
        renderItem={({ item }) => <BillItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  backButton: {
    // top: 16,
  },
  backText: {
    fontSize: 16,
    color: '#007BFF'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginRight: 30
  },
  searchBar: {
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    fontSize: 16
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  statsText: {
    fontSize: 14,
    color: '#666666'
  },
  totalUnpaid: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4444',
    marginTop: 8
  },
  listContainer: {
    padding: 16
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  billName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600'
  },
  cardContent: {
    gap: 8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    fontSize: 14,
    color: '#666666',
    flex: 1
  },
  value: {
    fontSize: 14,
    color: '#333333',
    flex: 2,
    textAlign: 'right'
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    flex: 2,
    textAlign: 'right'
  }
})

export default BillListScreen
