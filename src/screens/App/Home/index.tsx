import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import ButtonCustom from '../../authentication/Custom/ButtonCustom.tsx'
import { Button } from '@rneui/base'
import {
  AirConditioner,
  LightningBolt,
  MenuSquared,
  TV,
  Water
} from '../Component/FacilitiesComponent.tsx'
import { useSelector } from 'react-redux'

const data = [
  { id: '1', icon: <TV width={40} height={40} /> },
  { id: '2', icon: <Water width={40} height={40} /> },
  { id: '3', icon: <AirConditioner width={40} height={40} /> },
  { id: '4', icon: <LightningBolt width={40} height={40} /> },
  { id: '5', icon: <TV width={40} height={40} /> },
  { id: '6', icon: <Water width={40} height={40} /> },
  { id: '7', icon: <AirConditioner width={40} height={40} /> },
  { id: '8', icon: <MenuSquared width={40} height={40} /> }
]
const numColumns = 4 // Số cột trong mỗi hàng
function Home() {
  const renderItem = ({ item }: { item: { icon: JSX.Element } }) => (
    <View style={styles.item}>{item.icon}</View>
  )

  const { userData, status, error } = useSelector((state) => state.auth)
  console.log('userData', status, error)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>Xin chào, Trương Văn Tuấn</Text>
        <Text style={styles.room}>Khu C - Tầng 19 - 100</Text>
        <Fontisto
          style={styles.notificationIcon}
          name="bell"
          size={27}
          color="white"
        />
      </View>
      <View style={styles.notification}>
        <Text style={styles.headerNotification}>
          Tổng thanh toán tháng 9/2024
        </Text>
        <Text style={styles.money}>1.000.000 vnđ</Text>
        <View style={styles.cbbutton}>
          <Button
            containerStyle={styles.button}
            type="outline"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.titlebutton}
            title="Chi tiết"
          />
          <Button
            containerStyle={styles.button}
            type="outline"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.titlebutton}
            title="Thanh toán"
          />
        </View>
      </View>
      <View
        style={{
          width: '95%'
        }}
      >
        <Text style={styles.headerList}>Dịch vụ</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns} // Hiển thị số cột
        />
      </View>
      <View
        style={{
          width: '95%'
        }}
      >
        <Text style={styles.headerList}>Tiện ích</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns} // Hiển thị số cột
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7F7F7'
  },
  header: {
    width: '100%',
    height: 180,
    backgroundColor: '#26938E',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center'
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30
  },
  room: {
    color: 'white',
    fontSize: 16,
    marginTop: 5
  },
  notificationIcon: {
    position: 'absolute',
    right: 20,
    top: 50
  },
  notification: {
    width: '90%',
    height: 170,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: -80,
    alignItems: 'center'
  },
  headerNotification: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: 28,
    color: 'rgba(102, 102, 102, 0.40)'
  },
  money: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#26938E',
    marginTop: 10
  },
  cbbutton: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    width: '80%'
  },
  buttonContainer: {
    borderRadius: 100,
    overflow: 'hidden',
    width: 120
  },
  button: {
    width: 120,
    height: 40,
    borderRadius: 100,
    borderColor: '#94989B',
    borderWidth: 1
  },
  titlebutton: {
    color: '#94989B',
    fontSize: 15
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  headerList: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
    color: 'black'
  }
})

export default Home
