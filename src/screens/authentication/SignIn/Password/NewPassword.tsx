import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ButtonCustom from '../../Custom/ButtonCustom.tsx'
import TextInputPasswordCustom from '../../Custom/TextInputPasswordCustom.tsx'
import { forgotPassword } from '../../../../api/API/user.js'
import SpinnerLoading from '../../../../Spinner/spinnerloading.js'
import Notification from '../../../../Notification/notification.js'
import { useTranslation } from 'react-i18next'

function NewPassword({ navigation, route }) {
  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [notification, setNotification] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const closeNotification = () => {
    setError(false)
  }

  const forgot = async () => {
    if (password !== confirmPassword || password === '') {
      setPasswordError(`${t('forgotPassword.newPassword.passwordError')}`)
      return
    }

    setLoading(true)
    setPasswordError('')
    try {
      const p = {
        residentId: String(route.params.data.id),
        password: password,
        otp: route.params.data.otp
      }
      const data = await forgotPassword(p)
      navigation.navigate('SignIn')
    } catch (error) {
      setError(true)
      setNotification(`${t('forgotPassword.newPassword.notificationError')}`)
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
      <Text style={styles.title}>{t('forgotPassword.newPassword.title')}</Text>

      <TextInputPasswordCustom
        placeholder={t('forgotPassword.newPassword.password')}
        value={password}
        onChangeText={setPassword}
      />
      <TextInputPasswordCustom
        placeholder={t('forgotPassword.newPassword.confirmPassword')}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <ButtonCustom
        onPress={forgot}
        title={t('forgotPassword.newPassword.button')}
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
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  }
})

export default NewPassword
