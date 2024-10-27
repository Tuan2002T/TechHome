import React, { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import ButtonCustom from '../../authentication/Custom/ButtonCustom'
import {
  AirConditioner,
  LightningBolt,
  MenuSquared,
  TV,
  Water
} from '../Component/FacilitiesComponent.tsx'

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
  { id: '5', icon: <TV width={40} height={40} />, name: 'TV' },
  { id: '6', icon: <Water width={40} height={40} />, name: 'Water' },
  {
    id: '7',
    icon: <AirConditioner width={40} height={40} />,
    name: 'Air Conditioner'
  },
  { id: '8', icon: <MenuSquared width={40} height={40} />, name: 'Menu' }
]
const numColumns = 4

function Service({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('BookService')}
    >
      {item.icon}
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hearderText}>Dịch vụ và tiện ích</Text>
      </View>

      <View style={{ width: '95%' }}>
        <Text style={styles.headerList}>Dịch vụ</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
        />
      </View>
      <View style={{ width: '95%' }}>
        <Text style={styles.headerList}>Tiện ích</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
        />
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
  hearderText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 35
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

export default Service
