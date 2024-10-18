import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TextInputCustom from '../Custom/TextInputCustom.tsx'
import TextInputPasswordCustom from '../Custom/TextInputPasswordCustom.tsx'
import { Checkbox } from 'react-native-paper'
import ButtonCustom from '../Custom/ButtonCustom.tsx'
import { useDispatch } from 'react-redux'
import { login } from '../../../redux/Thunk/userThunk.js'
import SpinnerLoading from '../../../Spinner/spinnerloading.js'
import { useTranslation } from 'react-i18next'
import Notification from '../../../Notification/notification.js'

function SignIn({ navigation }) {
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { t, i18n } = useTranslation()
  const handleLogin = async () => {
    setLoading(true)
    try {
      await dispatch(login({ username, password })).unwrap()
      navigation.navigate('Tabs')
    } catch (error) {
      setError(true)
      console.log(error)
    }
  }

  const closeNotification = () => {
    setError(false)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <SpinnerLoading loading={loading} />
      <Notification loading={error} onClose={closeNotification} />
      <MaterialIcons
        onPress={() => navigation.goBack()}
        style={styles.buttonLeft}
        name="keyboard-arrow-left"
        size={38}
        color="#000000"
      />
      <Text style={styles.title}>{t('login.login')}</Text>

      <TextInputCustom
        placeholder={t('login.username')}
        value={username}
        onChangeText={setUsername}
      />
      <TextInputPasswordCustom
        placeholder={t('login.password')}
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.checkbox}>
        <View style={styles.checkbox1}>
          <Checkbox
            color="#999999"
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked)
            }}
          />
          <Text>{t('login.remember')}</Text>
        </View>
        <Text
          onPress={() => navigation.navigate('ForgotPassword')}
          style={{ textDecorationLine: 'underline' }}
        >
          {t('login.forgot')}
        </Text>
      </View>

      <ButtonCustom onPress={handleLogin} title={t('login.button')} />
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
