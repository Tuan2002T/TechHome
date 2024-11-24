import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Checkbox } from 'react-native-paper'

interface BillItem {
  billId: string
  billName: string
  billDate: string
  billAmount: string
}
interface TableBillHistoryProps {
  data: BillItem[]
}

const TableBillHistory: React.FC<TableBillHistoryProps> = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean
  }>({})

  const toggleCheckBox = (id: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const renderItem = ({ item }: { item: BillItem }) => (
    <View style={styles.row}>
      <Text style={[styles.feeType, styles.text]}>{item.billName}</Text>
      <Text style={[styles.month, styles.text]}>
        {formatDate(item.billDate)}
      </Text>
      <Text style={[styles.amount, styles.text]}>{item.billAmount}</Text>
      <View>
        <Checkbox
          color="#32AE63"
          uncheckedColor="#BDBDBD"
          status={selectedItems[item.id] ? 'checked' : 'unchecked'}
          onPress={() => toggleCheckBox(item.id)}
          disabled={true}
        />
      </View>
    </View>
  )

  const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  }

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.feeType}>Loại phí</Text>
        <Text style={styles.month}>Tháng</Text>
        <Text style={styles.amount}>Thành tiền</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    width: '35%'
  },
  month: {
    width: '30%'
  },
  amount: {
    width: '25%'
  },
  text: {
    color: 'black',
    fontWeight: '500'
  }
})

export default TableBillHistory
