import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SwitchSelector from 'react-native-switch-selector'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'

function Chat({ navigation }) {
  // Khai báo state để lưu lựa chọn của SwitchSelector
  const [selectedOption, setSelectedOption] = useState('1')

  const options = [
    {
      label: 'Chờ xác nhận',
      value: '1',
      testID: 'switch-one',
      accessibilityLabel: 'switch-one'
    },
    {
      label: 'Lịch sử đánh giá',
      value: '1.5',
      testID: 'switch-one-thirty',
      accessibilityLabel: 'switch-one-thirty'
    }
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hearderText}>Ý kiến đánh giá</Text>
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
          initial={0} // Chọn giá trị đầu tiên
          onPress={(value) => setSelectedOption(value)} // Cập nhật state khi lựa chọn thay đổi
          style={styles.switchSelector}
          height={50}
          animationDuration={200}
        />
        {/* Hiển thị nội dung tùy theo giá trị được chọn */}
        {selectedOption === '1' && (
          <View style={styles.contentSection}>
            <Text>Nội dung cho "Chờ xác nhận"</Text>
            {/* Thêm các phần nội dung khác ở đây */}
          </View>
        )}
        {selectedOption === '1.5' && (
          <View style={styles.contentSection}>
            <Text>Nội dung cho "Lịch sử đánh giá"</Text>
            {/* Thêm các phần nội dung khác ở đây */}
          </View>
        )}
      </View>
      <IoniconsIcon name="add" size={35} color="white" style={styles.btnAdd} />
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
  contentSection: {
    marginTop: 30, // Khoảng cách từ selector xuống nội dung
    padding: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3
  },
  btnAdd: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#32AE63',
    padding: 10,
    borderRadius: 50
  }
})

export default Chat
