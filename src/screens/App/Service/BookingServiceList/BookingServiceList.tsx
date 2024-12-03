import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions
} from 'react-native'
import { NavigationProp } from '@react-navigation/native'

interface Service {
  id: number
  name: string
  description: string
  price: string
}

interface BookingServiceListProps {
  navigation: NavigationProp<any>
}

const sampleServices: Service[] = [
  {
    id: 1,
    name: 'Dịch vụ sửa chữa điện tử',
    description: 'Chuyên sửa chữa các thiết bị điện tử.',
    price: '500.000đ'
  },
  {
    id: 2,
    name: 'Dịch vụ vệ sinh nhà cửa',
    description: 'Dọn dẹp nhà cửa chuyên nghiệp.',
    price: '300.000đ'
  },
  {
    id: 3,
    name: 'Dịch vụ bảo trì máy lạnh',
    description: 'Kiểm tra và bảo trì máy lạnh định kỳ.',
    price: '400.000đ'
  }
]

export default function BookingServiceList({
  navigation
}: BookingServiceListProps) {
  const renderService = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BookService', { item })}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách dịch vụ</Text>
      <FlatList
        data={sampleServices}
        renderItem={renderService}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f9'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#32AE63',
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  list: {
    paddingHorizontal: 10,
    paddingTop: 10
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: width * 0.9,
    alignSelf: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#32AE63',
    marginBottom: 5
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10
  },
  price: {
    fontSize: 16,
    color: '#32AE63'
  }
})
