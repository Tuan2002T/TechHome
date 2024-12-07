import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TextInputCustom from '../../Custom/TextInputCustom.tsx'
import ButtonCustom from '../../Custom/ButtonCustom.tsx'
import TextInputPasswordCustom from '../../Custom/TextInputPasswordCustom.tsx'
import { activeResident } from '../../../../api/API/user.js'
import SpinnerLoading from '../../../../Spinner/spinnerloading.js'
import Notification from '../../../../Modal/Notification/notification.tsx'
import { CommonActions } from '@react-navigation/native'

function ActiveAccount({ navigation, route }) {
  const residentData = route.params?.residentData
  console.log(route.params?.residentData)

  const [idcard, setIdcard] = useState('')
  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState('')
  const [error, setError] = useState(false)

  const closeNotification = () => {
    setError(false)
  }

  useEffect(() => {
    if (residentData) {
      setIdcard(residentData.idcard)
      setFullname(residentData.fullname)
      setPhonenumber(residentData.phonenumber)
      setEmail(residentData.email)
      setUsername(residentData.username)
    }
  }, [residentData])

  const handleActivate = async () => {
    const activeData = {
      residentId: residentData.residentId,
      email,
      username: username,
      fullname,
      idcard,
      phonenumber,
      password
    }
    console.log(activeData)
    setLoading(true)
    try {
      const result = await activeResident(activeData)

      setLoading(false)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Authentication' }]
        })
      )
    } catch (error) {
      setNotification('Kích hoạt tài khoản không thành công')
      setError(true)
    } finally {
      setLoading(false)
    }
  }
  return (
    <View style={styles.container}>
      <SpinnerLoading loading={loading} />
      <Notification
        loading={error}
        onClose={closeNotification}
        message={notification}
      />
      <MaterialIcons
        onPress={() => navigation.goBack()}
        style={styles.buttonLeft}
        name="keyboard-arrow-left"
        size={38}
        color="#000000"
      />
      <Text style={styles.title}>Kích hoạt tài khoản</Text>
      <Text style={styles.text}>Nhập thông tin tài khoản mật khẩu</Text>

      <TextInputCustom
        placeholder="Nhập tên"
        value={fullname}
        onChangeText={setFullname}
      />
      <TextInputCustom
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        editable={true}
      />
      <TextInputCustom
        placeholder="Nhập CMND/CCCD"
        value={idcard}
        onChangeText={setIdcard}
        editable={false}
      />

      <TextInputCustom
        placeholder="Nhập số điện thoại"
        value={phonenumber}
        onChangeText={setPhonenumber}
        editable={false}
      />
      <TextInputCustom
        placeholder="Nhập email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInputPasswordCustom value={password} onChangeText={setPassword} />

      <ButtonCustom title="Xác nhận" onPress={() => handleActivate()} />
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
  }
})

export default ActiveAccount
