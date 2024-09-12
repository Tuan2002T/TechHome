import React, { useState } from 'react'
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ButtonCustom from '../../Custom/ButtonCustom'
import TextInputCustom from '../../Custom/TextInputCustom'
import { TextInput } from 'react-native-paper'
import { Button } from '@rneui/base'

function ForgotPassword({ navigation }) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        onPress={() => navigation.goBack()}
        style={styles.buttonLeft}
        name="keyboard-arrow-left"
        size={38}
        color="#000000"
      />
      <Text style={styles.title}>Quên mật khẩu</Text>

      <TextInputCustom placeholder="Nhập số điện thoại hoặc email" />

      <View style={{ flexDirection: 'row', width: '100%' }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.textinputContainer]}>
            <TextInput
              placeholder="Nhập mã xác nhận"
              placeholderTextColor="#A9A9A9"
              mode="outlined"
              style={[styles.textinput]}
              underlineColor="transparent"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              cursorColor="#A9A9A9"
              cursorWidth={1}
            />
          </View>
        </TouchableWithoutFeedback>

        <Button
          title="Gửi OTP"
          buttonStyle={[styles.button]}
          containerStyle={[styles.buttonContainer]}
          titleStyle={[styles.titlebtn]}
        />
      </View>

      <ButtonCustom
        onPress={() => navigation.navigate('NewPassword')}
        title="Tiếp theo"
      />
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
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 40,
    marginTop: 70,
    marginBottom: 45
  },
  textinput: {
    width: 200,
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    fontSize: 14,
    marginHorizontal: 30
  },
  buttonContainer: {
    overflow: 'hidden'
  },
  button: {
    width: 120,
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: '#F5F5F5'
  },
  titlebtn: {
    color: '#94989B',
    fontSize: 16
  }
})
export default ForgotPassword
