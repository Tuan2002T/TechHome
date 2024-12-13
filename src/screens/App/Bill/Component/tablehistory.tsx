import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Checkbox } from 'react-native-paper'

interface BillItem {
  billId: string
  billName: string
  billDate: string
  billAmount: string
  billStatus: string
}
interface TableBillHistoryProps {
  data: BillItem[]
}

const TableBillHistory: React.FC<TableBillHistoryProps> = ({ data }) => {
  const { t } = useTranslation()
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean
  }>({})

  const toggleCheckBox = (id: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }
  const translateBillStatus = (status) => {
    const statusTranslations = {
      UNPAID: 'Chưa thanh toán',
      PAID: 'Đã thanh toán',
      CANCELLED: 'Đã hủy'
    }
    return statusTranslations[status]
  }
  const renderItem = ({ item }: { item: BillItem }) => (
    <View style={styles.row}>
      <Text style={[styles.feeType, styles.text]}>{item.billName}</Text>
      <Text style={[styles.month, styles.text]}>
        {formatDate(item.billDate)}
      </Text>
      <Text style={[styles.amount, styles.text]}>
        {formatCurrency(item.billAmount)}
      </Text>
      <Text style={[styles.amount, styles.text]}>
        {translateBillStatus(item.billStatus)}
      </Text>
      {/* <View>
        <Checkbox
          color="#32AE63"
          uncheckedColor="#BDBDBD"
          status={selectedItems[item.billId] ? 'checked' : 'unchecked'}
          onPress={() => toggleCheckBox(item.billId)}
          disabled={true}
        />
      </View> */}
    </View>
  )

  const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  }

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.feeType}>{t('screen.bill.table.type')}</Text>
        <Text style={styles.month}>{t('screen.bill.table.month')}</Text>
        <Text style={styles.amount}>{t('screen.bill.table.amount')}</Text>

        <Text style={styles.status}>Trạng thái</Text>
      </View>
      <FlatList
        nestedScrollEnabled={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.billId}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9',
    marginTop: 10
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: '#F7F7F9',
    marginHorizontal: 20
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 16
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 7,
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 5
  },
  feeType: {
    width: '28%',
    color: 'gray'
  },
  month: {
    width: '27%',
    color: 'gray'
  },
  amount: {
    width: '25%',
    color: 'gray'
  },
  status: {
    width: '25%',
    color: 'gray'
  },
  text: {
    color: 'black',
    fontWeight: '500'
  }
})

export default TableBillHistory
