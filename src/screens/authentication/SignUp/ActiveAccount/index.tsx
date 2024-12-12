import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, Alert, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TextInputCustom from '../../Custom/TextInputCustom.tsx'
import ButtonCustom from '../../Custom/ButtonCustom.tsx'
import TextInputPasswordCustom from '../../Custom/TextInputPasswordCustom.tsx'
import { activeResident } from '../../../../api/API/user.js'
import SpinnerLoading from '../../../../Spinner/spinnerloading.js'
import Notification from '../../../../Modal/Notification/notification.tsx'
import { CommonActions } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

function ActiveAccount({ navigation, route }) {
  const { t } = useTranslation()
  const residentData = route.params?.residentData

  const [idcard, setIdcard] = useState('')
  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleActivate = async () => {
    if (!fullname || !username || !email || !password) {
      setErrorMessage('All fields are required')
      return
    }

    if (!isEmailValid(email)) {
      setErrorMessage('Please enter a valid email address')
      return
    }

    const activeData = {
      residentId: residentData.residentId,
      email,
      username: username,
      fullname,
      idcard,
      phonenumber,
      password
    }
    setLoading(true)
    try {
      const result = await activeResident(activeData)

      setLoading(false)
      setNotification('Kích hoạt tài khoản thành công')
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
    <ScrollView contentContainerStyle={styles.scrollView}>
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
      <Text style={styles.title}>{t('active.activeAccount.title')}</Text>
      <Text style={styles.text}>{t('active.activeAccount.title1')}</Text>

      <TextInputCustom
        placeholder={t('active.activeAccount.fullname')}
        value={fullname}
        onChangeText={setFullname}
      />
      <TextInputCustom
        placeholder={t('active.activeAccount.username')}
        value={username}
        onChangeText={setUsername}
        editable={true}
      />
      <TextInputCustom
        placeholder={t('active.activeAccount.idcard')}
        value={idcard}
        onChangeText={setIdcard}
        editable={false}
      />
      <TextInputCustom
        placeholder={t('active.activeAccount.phone')}
        value={phonenumber}
        onChangeText={setPhonenumber}
        editable={false}
      />
      <TextInputCustom
        placeholder={t('active.activeAccount.email')}
        value={email}
        onChangeText={setEmail}
      />
      <TextInputPasswordCustom
        placeholder={t('active.activeAccount.password')}
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <ButtonCustom
        title={t('active.activeAccount.button')}
        onPress={() => handleActivate()}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollView: {
    paddingBottom: 20,
    backgroundColor: 'white',
    flexGrow: 1
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10
  }
})

export default ActiveAccount
