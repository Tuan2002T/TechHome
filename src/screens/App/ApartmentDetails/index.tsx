import { Tab, TabView } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationProp } from '@react-navigation/native'
import { getResidentApartmentInfo } from '../../../api/API/info '
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

interface Vehicle {
  id: string
  number: string
  type: string
}

interface Resident {
  id: string
  phone: string
  idCard: string
  fullname: string
}

interface Apartment {
  id: string
  type: string
  number: string
  residents: Resident[]
}

interface Floor {
  id: string
  number: number
}

interface Building {
  id: string
  name: string
  address: string
}

interface ApartmentDetails {
  apartment: Apartment
  floor: Floor
  building: Building
  vehicle: Vehicle
}

interface ApartmentDetailsProps {
  navigation: NavigationProp<any>
}

const ApartmentDetails: React.FC<ApartmentDetailsProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const { userData } = useSelector((state: any) => state.auth)
  const apartmentDetailsData = useSelector(
    (state: any) => state.apartmentDetails.apartmentDetails
  )
  const [apartmentDetails, setApartmentDetails] = useState<ApartmentDetails>()

  useEffect(() => {
    setApartmentDetails(apartmentDetailsData)
  }, [])

  const handleDeleteMember = (name) => {
    console.log(`Xóa thành viên: ${name}`)
  }

  const handleDeleteVehicle = (vehicle) => {
    console.log(`Xóa phương tiện: ${vehicle}`)
  }

  console.log(apartmentDetails)

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
        <Text style={styles.headerText}>{t('screen.home.aparment.title')}</Text>
      </View>

      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={styles.indicator}
      >
        <Tab.Item
          title={t('screen.home.aparment.select.aparmentProfile')}
          titleStyle={styles.tabTitle}
        />
        <Tab.Item
          title={t('screen.home.aparment.select.vehicle')}
          titleStyle={styles.tabTitle}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.tabViewItem}>
          <View>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="apartment" size={30} color="#26938E" />
                <Text style={styles.cardText}>
                  {t('screen.home.aparment.aparmentProfile.title')}
                </Text>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardBodyContent}>
                  <Text style={styles.cardBodyContentTitle}>
                    {t('screen.home.aparment.aparmentProfile.apartmentNumber')}:
                  </Text>
                  <Text style={styles.cardBodyContentText}>
                    {apartmentDetails?.apartment.number}
                  </Text>
                </View>
                <View style={styles.cardBodyContent}>
                  <Text style={styles.cardBodyContentTitle}>
                    {t('screen.home.aparment.aparmentProfile.aparmentType')}:
                  </Text>
                  <Text style={styles.cardBodyContentText}>
                    {apartmentDetails?.apartment.type}
                  </Text>
                </View>
                <View style={styles.cardBodyContent}>
                  <Text style={styles.cardBodyContentTitle}>
                    {t('screen.home.aparment.aparmentProfile.bulding')}:
                  </Text>
                  <Text style={styles.cardBodyContentText}>
                    {apartmentDetails?.building.name}
                  </Text>
                </View>
                <View style={styles.cardBodyContent}>
                  <Text style={styles.cardBodyContentTitle}>
                    {t('screen.home.aparment.aparmentProfile.floor')}:
                  </Text>
                  <Text style={styles.cardBodyContentText}>
                    {' '}
                    {apartmentDetails?.floor.number}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <FeatherIcon name="users" size={25} color="#26938E" />
                <Text style={styles.cardText}> </Text>
              </View>
              <View style={styles.cardBody}>
                {apartmentDetails?.apartment.residents.map((resident) => (
                  <View style={styles.memberCard} key={resident.id}>
                    <Text style={styles.memberName}>{resident.fullname}</Text>
                    <Text style={styles.memberRole}>{resident.idCard}</Text>
                    <Text style={styles.memberPhone}>{resident.phone}</Text>
                    <TouchableOpacity
                      onPress={() => handleDeleteMember(resident.fullname)}
                    >
                      <Ionicons name="trash-outline" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </TabView.Item>

        <TabView.Item style={styles.tabViewItem}>
          <View>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <MaterialIcons
                  name="directions-car"
                  size={30}
                  color="#26938E"
                />
                <Text style={styles.cardText}>
                  {t('screen.home.aparment.vehicle.title')}
                </Text>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardBodyContent}>
                  <Text style={styles.cardBodyContentTitle}>
                    {t('screen.home.aparment.vehicle.vehicleType')}:
                  </Text>
                  <Text style={styles.cardBodyContentText}>
                    {apartmentDetails?.vehicle.type}
                  </Text>
                </View>
                <View style={styles.cardBodyContent}>
                  <Text style={styles.cardBodyContentTitle}>
                    {t('screen.home.aparment.vehicle.licensePlate')}:
                  </Text>
                  <Text style={styles.cardBodyContentText}>
                    {apartmentDetails?.apartment.number}
                  </Text>
                </View>
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
