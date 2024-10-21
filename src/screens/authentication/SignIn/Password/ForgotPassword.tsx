import React, { useState } from 'react'
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ButtonCustom from '../../Custom/ButtonCustom.tsx'
import TextInputCustom from '../../Custom/TextInputCustom.tsx'
import { TextInput } from 'react-native-paper'
import { Button } from '@rneui/base'
import SpinnerLoading from '../../../../Spinner/spinnerloading.js'
import { sendOTP, verifyOTP } from '../../../../api/API/user.js'
import Notification from '../../../../Notification/notification.js'
import { useTranslation } from 'react-i18next'

function ForgotPassword({ navigation }) {
  const { t, i18n } = useTranslation()
  const [to, setTo] = useState('david@example.com')
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(false)
  const [notification, setNotification] = useState('')
  const [dataSend, setDataSend] = useState('')
  const [otp, setOtp] = useState('')

  const closeNotification = () => {
    setError(false)
  }

  const send = async () => {
    setLoading(true)
    setNotification(`${t('forgotPassword.notificationSuccessSendOTP')}`)
    try {
      const data = await sendOTP(to)
      setDataSend(data.response.id)
      setError(true)
    } catch (error) {
      setError(true)
      setNotification(`${t('forgotPassword.notificationErrorSendOTP')}`)
    } finally {
      setLoading(false)
    }
  }

  const verify = async () => {
    setLoading(true)
    try {
      verifyData = {
        id: dataSend,
        otp: otp
      }
      const data = await verifyOTP(verifyData)
      navigation.navigate('NewPassword', { data: verifyData })
    } catch (error) {
      setError(true)
      setNotification(`${t('forgotPassword.notificationErrorOTP')}`)
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
      <Text style={styles.title}>{t('forgotPassword.title')}</Text>

      <TextInputCustom
        placeholder={t('forgotPassword.phoneOrEmail')}
        value={to}
        onChangeText={setTo}
      />

      <View style={{ flexDirection: 'row', width: '100%' }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.textinputContainer]}>
            <TextInput
              placeholder={t('forgotPassword.otp')}
              placeholderTextColor="#A9A9A9"
              mode="outlined"
              style={[styles.textinput]}
              underlineColor="transparent"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              cursorColor="#A9A9A9"
              cursorWidth={1}
              value={otp}
              onChangeText={setOtp}
            />
          </View>
        </TouchableWithoutFeedback>

        <Button
          title={t('forgotPassword.sendOTP')}
          buttonStyle={[styles.button]}
          containerStyle={[styles.buttonContainer]}
          titleStyle={[styles.titlebtn]}
          onPress={() => send()}
        />
      </View>

      <ButtonCustom
        onPress={() => verify()}
        title={t('forgotPassword.button')}
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
