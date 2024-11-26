import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Checkbox } from 'react-native-paper'

interface BillItem {
  billId: string
  billName: string
  billDate: string
  billAmount: string
}

interface TableBillProps {
  data: BillItem[]
  onSelectionChange: (selectedItems: BillItem[]) => void // Hàm callback truyền từ cha
}

const TableBill: React.FC<TableBillProps> = ({ data, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean
  }>({})

  // Cập nhật trạng thái của checkbox
  const toggleCheckBox = (id: string) => {
    setSelectedItems((prev) => {
      const newSelectedItems = { ...prev, [id]: !prev[id] }
      onSelectionChange(getSelectedItems(newSelectedItems)) // Gọi callback mỗi khi có sự thay đổi
      return newSelectedItems
    })
  }

  // Lấy danh sách các mục đã chọn
  const getSelectedItems = (selectedItems: { [key: string]: boolean }) => {
    return data.filter((item) => selectedItems[item.billId]) // Lọc các mục đã được chọn
  }

  // Định dạng ngày
  const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };
  const renderItem = ({ item }: { item: BillItem }) => (
    <View style={styles.row}>
      <Text style={[styles.feeType, styles.text]}>{item.billName}</Text>
      <Text style={[styles.month, styles.text]}>
        {formatDate(item.billDate)}
      </Text>
      <Text style={[styles.amount, styles.text]}>{formatCurrency(item.billAmount)}</Text>
      <View>
        <Checkbox
          color="#32AE63"
          uncheckedColor="#BDBDBD"
          status={selectedItems[item.billId] ? 'checked' : 'unchecked'}
          onPress={() => toggleCheckBox(item.billId)}
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
        keyExtractor={(item) => item.billId} // Thay thế keyExtractor thành billId thay vì id
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

export default TableBill
