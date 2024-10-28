import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {
  AirConditioner,
  Badminton,
  Basketball,
  Broom,
  Gym,
  LightningBolt,
  MenuSquared,
  Playground,
  Pool,
  Tennis,
  TV,
  WashByHand,
  WashingMachine,
  Water,
  Weber
} from '../Component/FacilitiesComponent.tsx'
import { NavigationProp } from '@react-navigation/native'

// Dữ liệu cho các dịch vụ
const data = [
  { id: '1', icon: <TV width={40} height={40} />, name: 'TV' },
  { id: '2', icon: <Water width={40} height={40} />, name: 'Water' },
  {
    id: '3',
    icon: <AirConditioner width={40} height={40} />,
    name: 'Air Conditioner'
  },
  {
    id: '4',
    icon: <LightningBolt width={40} height={40} />,
    name: 'Lightning Bolt'
  },
  { id: '5', icon: <Broom width={40} height={40} />, name: 'Broom' },
  {
    id: '6',
    icon: <WashingMachine width={40} height={40} />,
    name: 'Washing Machine'
  },
  {
    id: '7',
    icon: <WashByHand width={40} height={40} />,
    name: 'Wash by Hand'
  },
  { id: '8', icon: <MenuSquared width={40} height={40} />, name: 'Menu' }
]

const dataUtilities = [
  { id: '1', icon: <Pool width={40} height={40} />, name: 'Pool' },
  { id: '2', icon: <Gym width={40} height={40} />, name: 'Gym' },
  {
    id: '3',
    icon: <Playground width={40} height={40} />,
    name: 'Playground'
  },
  {
    id: '4',
    icon: <Weber width={40} height={40} />,
    name: 'Weber'
  },
  { id: '5', icon: <Tennis width={40} height={40} />, name: 'Tennis' },
  {
    id: '6',
    icon: <Badminton width={40} height={40} />,
    name: 'Badminton'
  },
  {
    id: '7',
    icon: <Basketball width={40} height={40} />,
    name: 'Basketball'
  },
  { id: '8', icon: <MenuSquared width={40} height={40} />, name: 'Menu' }
]

interface ServiceProps {
  navigation: NavigationProp<any>
}

const Service: React.FC<ServiceProps> = ({ navigation }) => {
  const renderItem = (item) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('BookService')}
      >
        {item.icon}
      </TouchableOpacity>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dịch vụ và tiện ích</Text>
      </View>

      {/* Dịch vụ */}
      <View style={{ width: '95%' }}>
        <Text style={styles.headerList}>Dịch vụ</Text>
        <View style={styles.grid}>
          {data.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('BookService')}
              >
                {item.icon}
              </TouchableOpacity>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tiện ích */}
      <View style={{ width: '95%' }}>
        <Text style={styles.headerList}>Tiện ích</Text>
        <View style={styles.grid}>
          {dataUtilities.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('BookService')}
              >
                {item.icon}
              </TouchableOpacity>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7F7F9'
  },
  header: {
    width: '100%',
    height: 150,
    backgroundColor: '#32AE63',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 35
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  itemContainer: {
    alignItems: 'center',
    margin: 5,
    width: '22%'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerList: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
    color: 'black'
  },
  itemText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    color: 'gray'
  }
})

export default Service
