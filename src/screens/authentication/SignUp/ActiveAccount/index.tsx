import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TextInputCustom from '../../Custom/TextInputCustom'
import ButtonCustom from '../../Custom/ButtonCustom'
import TextInputPasswordCustom from '../../Custom/TextInputPasswordCustom'

function ActiveAccount({ navigation }) {
  const [checked, setChecked] = useState(false)
  return (
    <View style={styles.container}>
      <MaterialIcons
        onPress={() => navigation.goBack()}
        style={styles.buttonLeft}
        name="keyboard-arrow-left"
        size={38}
        color="#000000"
      />
      <Text style={styles.title}>Kích hoạt tài khoản</Text>
      <Text style={styles.text}>Nhập thông tin tài khoản mật khẩu</Text>

      <TextInputCustom placeholder="Nhập CMND/CCCD" />
      <TextInputCustom placeholder="123312312312312" />
      <TextInputCustom placeholder="C4.201" />
      <TextInputCustom placeholder="03343434234" />
      <TextInputCustom placeholder="Nhập email" />
      <TextInputPasswordCustom />
      <ButtonCustom title="Xác nhận" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  buttonLeft: {
    borderRadius: 100,
    borderWidth: 1,
    width: 41,
    marginTop: 75,
    marginLeft: 40
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    color: 'black',
    marginLeft: 40,
    marginTop: 70
  },
  text: {
    fontSize: 12,
    color: '#94989B',
    marginLeft: 40,
    marginBottom: 45
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 20
  },
  checkbox1: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
export default ActiveAccount
