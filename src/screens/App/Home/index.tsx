import React from 'react'
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { Button } from '@rneui/base'

import { useSelector } from 'react-redux'
import FloatingActionComponent from '../Component/FloatingActionComponent.tsx'
import SpendingChartComponent from './SpendingChart/SpendingChartComponent.tsx'
import { NavigationProp } from '@react-navigation/native'

interface HomeProps {
  navigation: NavigationProp<any>
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { userData, status, error } = useSelector((state: any) => state.auth)

  return (
    <ScrollView style={styles.scrollbar}>
      <StatusBar barStyle="light-content" backgroundColor="#26938E" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name}>Xin chào, Trương Văn Tuấn</Text>
          {/* <Text style={styles.room}>Khu C - Tầng 19 - 100</Text> */}
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
              titleStyle={styles.titlebutton}
              title="Chi tiết"
            />
            <Button
              containerStyle={styles.button}
              type="outline"
              buttonStyle={styles.button}
              titleStyle={styles.titlebutton}
              title="Thanh toán"
            />
          </View>
        </View>

        <View style={styles.floatActions}>
          <FloatingActionComponent
            icon={<FontAwesomeIcon name="home" size={35} color="#26938E" />}
            title="Căn hộ"
            style={{}}
            onPress={() => navigation.navigate('ApartmentDetails')}
          />

          <FloatingActionComponent
            icon={<MaterialIcons name="payment" size={30} color="#FF5722" />}
            title="Thanh toán"
            style={{}}
            onPress={() => navigation.navigate('Bill')}
          />

          <FloatingActionComponent
            icon={<Fontisto name="bell" size={24} color="#FFC107" />}
            title="Thông báo"
            style={{}}
            onPress={() => navigation.navigate('Notification')}
          />

          <FloatingActionComponent
            icon={<FontAwesomeIcon name="send" size={30} color="#673AB7" />}
            title="Gửi ý kiến"
            style={{}}
            onPress={() => navigation.navigate('Feedback')}
          />
        </View>
        <SpendingChartComponent />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollbar: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },
  container: {
    alignItems: 'center'
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
  listContainer: {
    width: '95%'
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  item: {
    width: '22%', // Điều chỉnh giá trị này để thay đổi số cột
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  headerList: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
    color: 'black'
  },
  floatActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20
  }
})

export default Home
