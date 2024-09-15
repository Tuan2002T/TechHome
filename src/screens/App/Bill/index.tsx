import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import SwitchSelector from 'react-native-switch-selector'
import ButtonCustom from '../../authentication/Custom/ButtonCustom'

function Bill({ navigation }) {
  const options = [
    {
      label: 'Thanh toán',
      value: '1',
      testID: 'switch-one',
      accessibilityLabel: 'switch-one'
    },
    {
      label: 'Đã thanh toán',
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
          onPress={(value) => console.log(`Call onPress with value: ${value}`)}
          style={styles.switchSelector}
        />
      </View>
      <View style={styles.pay}>
        <View>
          <Text style={{ color: '#94989B', marginBottom: 10 }}>
            Tổng nợ dư: 1.000.000đ
          </Text>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Tạm tính: 300.000đ
          </Text>
        </View>
        <ButtonCustom
          title="Thanh toán"
          buttonStyle={{
            width: 140,
            height: 40,
            borderRadius: 100,
            backgroundColor: '#26938E'
          }}
          titleStyle={{ color: 'white', fontSize: 15 }}
        />
      </View>
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
    flex: 1,
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
  pay: {
    width: '100%',
    height: 80,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  }
})

export default Bill
