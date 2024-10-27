import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function BookService() {
  // Dữ liệu giả mẫu để hiển thị, sẽ thay thế bằng dữ liệu thật sau khi truyền
  const service = {
    name: 'Dọn dẹp',
    price: 200000,
    description: 'Dịch vụ dọn dẹp căn hộ hàng ngày cho khách hàng.'
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{service.name}</Text>
      <Text style={styles.price}>{service.price.toLocaleString()} VND</Text>
      <Text style={styles.description}>{service.description}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => alert(`Đã đặt dịch vụ: ${service.name}`)}
      >
        <Text style={styles.buttonText}>Đặt dịch vụ</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f9'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  price: {
    fontSize: 20,
    color: '#32AE63',
    marginBottom: 20
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#888'
  },
  button: {
    backgroundColor: '#32AE63',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
})
