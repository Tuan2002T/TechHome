import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ButtonCustom from '../../Custom/ButtonCustom.tsx'
import TextInputPasswordCustom from '../../Custom/TextInputPasswordCustom.tsx'
import { forgotPassword } from '../../../../api/API/user.js'
import SpinnerLoading from '../../../../Spinner/spinnerloading.js'
import Notification from '../../../../Notification/notification.js'

function NewPassword({ navigation, route }) {
  console.log(route.params.data)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const closeNotification = () => {
    setError(false)
  }
  const [notification, setNotification] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const forgot = async () => {
    setLoading(true)
    try {
      const p = {
        residentId: route.params.data.id,
        password: password,
        otp: route.params.data.otp
      }
      const data = await forgotPassword(p)
    } catch (error) {
      setError(true)
      setNotification('Thay đổi mật khẩu thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <SpinnerLoading loading={loading} />
      <Notification
        loading={error}
        message={notification}
        onClose={closeNotification}
      />
      <MaterialIcons
        onPress={() => navigation.goBack()}
        style={styles.buttonLeft}
        name="keyboard-arrow-left"
        size={38}
        color="#000000"
      />
      <Text style={styles.title}>Mật khẩu mới</Text>

      <TextInputPasswordCustom
        placeholder="Nhập mật khẩu mới"
        value={password}
        onChangeText={setPassword}
      />
      <TextInputPasswordCustom
        placeholder="Nhập lại mật khẩu mới"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <ButtonCustom
        onPress={() => navigation.navigate('SignIn')}
        title="Xác nhận"
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
export default NewPassword
