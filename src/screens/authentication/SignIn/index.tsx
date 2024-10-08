import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TextInputCustom from '../Custom/TextInputCustom.tsx'
import TextInputPasswordCustom from '../Custom/TextInputPasswordCustom.tsx'
import { Checkbox } from 'react-native-paper'
import ButtonCustom from '../Custom/ButtonCustom.tsx'
import { useDispatch } from 'react-redux'
import { login } from '../../../redux/Thunk/userThunk.js'

function SignIn({ navigation }) {
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch()
  const [username, setUsername] = useState('mikej')
  const [password, setPassword] = useState('pass3')

  const handleLogin = async () => {
    try {
      await dispatch(login({ username, password })).unwrap()
      navigation.navigate('Tabs')
    } catch (error) {
      // Xử lý lỗi
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <MaterialIcons
        onPress={() => navigation.goBack()}
        style={styles.buttonLeft}
        name="keyboard-arrow-left"
        size={38}
        color="#000000"
      />
      <Text style={styles.title}>Đăng Nhập</Text>

      <TextInputCustom value={username} onChangeText={setUsername} />
      <TextInputPasswordCustom value={password} onChangeText={setPassword} />
      <View style={styles.checkbox}>
        <View style={styles.checkbox1}>
          <Checkbox
            color="#999999"
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked)
            }}
          />
          <Text>Nhớ mật khẩu</Text>
        </View>
        <Text
          onPress={() => navigation.navigate('ForgotPassword')}
          style={{ textDecorationLine: 'underline' }}
        >
          Quên mật khẩu
        </Text>
      </View>

      <ButtonCustom
        onPress={handleLogin} // Gọi hàm handleLogin khi nhấn nút
        title="Đăng nhập"
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

export default SignIn
