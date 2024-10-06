import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Checkbox } from 'react-native-paper'

interface BillItem {
  id: string
  feeType: string
  month: string
  amount: string
}

const data: BillItem[] = [
  { id: '1', feeType: 'Phí điện', month: '09/2024', amount: '1.000.000' },
  { id: '2', feeType: 'Phí nước', month: '09/2024', amount: '300.000' },
  { id: '3', feeType: 'Phí dịch vụ', month: '09/2024', amount: '500.000' }
]

const TableBill: React.FC = () => {
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
      <Text style={[styles.feeType, styles.text]}>{item.feeType}</Text>
      <Text style={[styles.month, styles.text]}>{item.month}</Text>
      <Text style={[styles.amount, styles.text]}>{item.amount}</Text>
      <View>
        <Checkbox
          color="#32AE63"
          uncheckedColor="#BDBDBD"
          status={selectedItems[item.id] ? 'checked' : 'unchecked'}
          onPress={() => toggleCheckBox(item.id)}
        />
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.feeType}>Loại phí</Text>
        <Text style={styles.month}>Tháng</Text>
        <Text style={styles.amount}>Thành tiền</Text>
        <Text style={styles.headerCell}></Text>
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
    width: '40%'
  },
  month: {
    width: '25%'
  },
  amount: {
    width: '25%'
  },
  text: {
    color: 'black',
    fontWeight: '500'
  }
})

export default TableBill
