import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import ButtonCustom from '../../authentication/Custom/ButtonCustom'
import { Button } from '@rneui/base'
import {
  AirConditioner,
  LightningBolt,
  MenuSquared,
  TV,
  Water
} from '../Component/FacilitiesComponent.tsx'

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
const numColumns = 4
function Service({ navigation }) {
  const renderItem = ({ item }: { item: { icon: JSX.Element } }) => (
    <View style={styles.item}>{item.icon}</View>
  )
  const options = [
    {
      label: 'Thanh toán',
      value: '1',
      testID: 'switch-one',
      accessibilityLabel: 'switch-one'
    },
    {
      label: 'Lịch sử giao dịch',
      value: '1.5',
      testID: 'switch-one-thirty',
      accessibilityLabel: 'switch-one-thirty'
    }
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hearderText}>Hoá đơn</Text>
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

export default Service
