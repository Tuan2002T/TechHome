import { Tab, TabView } from '@rneui/themed'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

function ApartmentDetails({ navigation }) {
  const [index, setIndex] = useState(0)

  // Hàm xóa thành viên
  const handleDeleteMember = (name) => {
    console.log(`Xóa thành viên: ${name}`)
  }

  // Hàm xóa phương tiện
  const handleDeleteVehicle = (vehicle) => {
    console.log(`Xóa phương tiện: ${vehicle}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesignIcon
          name="arrowleft"
          size={25}
          color="black"
          style={styles.iconleft}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Chi tiết căn hộ</Text>
      </View>

      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={styles.indicator}
      >
        <Tab.Item title="Thông tin căn hộ" titleStyle={styles.tabTitle} />
        <Tab.Item title="Phương tiện" titleStyle={styles.tabTitle} />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.tabViewItem}>
          <View>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="apartment" size={30} color="#26938E" />
                <Text style={styles.cardText}>Thông tin căn hộ</Text>
              </View>
              <View style={styles.cardBody}>
                {/* Chi tiết thông tin căn hộ */}
                <View style={styles.cardBodyContent}>
                  <Text style={styles.cardBodyContentTitle}>Mã căn hộ:</Text>
                  <Text style={styles.cardBodyContentText}>ID12321</Text>
                </View>
                <View style={styles.cardBodyContent}>
                  <Text style={styles.cardBodyContentTitle}>Loại căn hộ:</Text>
                  <Text style={styles.cardBodyContentText}>Studio</Text>
                </View>
                <View style={styles.cardBodyContent}>
                  <Text style={styles.cardBodyContentTitle}>Toà nhà:</Text>
                  <Text style={styles.cardBodyContentText}>B</Text>
                </View>
                <View style={styles.cardBodyContent}>
                  <Text style={styles.cardBodyContentTitle}>Tầng:</Text>
                  <Text style={styles.cardBodyContentText}>19</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <FeatherIcon name="users" size={25} color="#26938E" />
                <Text style={styles.cardText}>Thành viên</Text>
              </View>
              <View style={styles.cardBody}>
                {/* Card cho từng thành viên */}
                <View style={styles.memberCard}>
                  <Text style={styles.memberName}>Nguyễn Văn A</Text>
                  <Text style={styles.memberRole}>Chủ hộ</Text>
                  <Text style={styles.memberPhone}>0901234567</Text>
                  <TouchableOpacity
                    onPress={() => handleDeleteMember('Nguyễn Văn A')}
                  >
                    <Ionicons name="trash-outline" size={20} color="red" />
                  </TouchableOpacity>
                </View>
                <View style={styles.memberCard}>
                  <Text style={styles.memberName}>Nguyễn Thị B</Text>
                  <Text style={styles.memberRole}>Vợ</Text>
                  <Text style={styles.memberPhone}>0901234568</Text>
                  <TouchableOpacity
                    onPress={() => handleDeleteMember('Nguyễn Thị B')}
                  >
                    <Ionicons name="trash-outline" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TabView.Item>

        <TabView.Item style={styles.tabViewItem}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="directions-car" size={30} color="#26938E" />
              <Text style={styles.cardText}>Phương tiện đăng ký</Text>
            </View>
            <View style={styles.cardBody}>
              {/* Card cho từng phương tiện */}
              <View style={styles.vehicleCard}>
                <Text style={styles.vehicleName}>Xe hơi</Text>
                <Text style={styles.vehicleType}>Loại: SUV</Text>
                <Text style={styles.vehiclePlate}>Biển số: 1234AB</Text>
                <TouchableOpacity onPress={() => handleDeleteVehicle('Xe hơi')}>
                  <Ionicons name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
              </View>

              <View style={styles.vehicleCard}>
                <Text style={styles.vehicleName}>Xe máy</Text>
                <Text style={styles.vehicleType}>Loại: Sport</Text>
                <Text style={styles.vehiclePlate}>Biển số: 5678CD</Text>
                <TouchableOpacity onPress={() => handleDeleteVehicle('Xe máy')}>
                  <Ionicons name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TabView.Item>
      </TabView>
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
    height: 70,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconleft: {
    marginRight: 10
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  indicator: {
    backgroundColor: 'black',
    height: 3,
    width: '50%'
  },
  tabViewItem: {
    width: '100%',
    padding: 20
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
  cardBody: {
    marginTop: 20,
    alignItems: 'center'
  },
  cardBodyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10
  },
  cardBodyContentTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  cardBodyContentText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  },
  memberCard: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  memberName: {
    width: '40%',
    fontSize: 16,
    fontWeight: 'bold'
  },
  memberRole: {
    width: '20%',
    fontSize: 14,
    color: '#555'
  },
  memberPhone: {
    width: '30%',
    fontSize: 14,
    color: '#333'
  },
  vehicleCard: {
    width: '90%',
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  vehicleName: {
    width: '20%',
    fontSize: 16,
    fontWeight: 'bold'
  },
  vehicleType: {
    width: '20%',
    fontSize: 14,
    color: '#555'
  },
  vehiclePlate: {
    width: '30%',
    fontSize: 14,
    color: '#333'
  }
})

export default ApartmentDetails
