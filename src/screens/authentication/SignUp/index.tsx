import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TextInputCustom from '../Custom/TextInputCustom.tsx'
import TextInputPasswordCustom from '../Custom/TextInputPasswordCustom.tsx'
import { Checkbox } from 'react-native-paper'
import ButtonCustom from '../Custom/ButtonCustom.tsx'
import { getResidentNoActiveByIdcard } from '../../../api/API/user.js'
import SpinnerLoading from '../../../Spinner/spinnerloading.js'
import Notification from '../../../Notification/notification.js'
import { useTranslation } from 'react-i18next'

function SignUp({ navigation }) {
  const { t, i18n } = useTranslation()

  const [idcard, setIdcard] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const closeNotification = () => {
    setError(false)
  }
  const handleActivateAccount = async () => {
    setLoading(true)
    try {
      const residentData = await getResidentNoActiveByIdcard(idcard)
      if (residentData) {
        navigation.navigate('ActiveAccount', { residentData })
      } else {
        Alert.alert('Thông báo1', 'Không tìm thấy tài khoản')
        setError(true)
      }
    } catch (error) {
      setLoading(false)
      setError(true)
    }
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
      <Text style={styles.title}>{t('active.title')}</Text>
      <Text style={styles.text}>{t('active.title1')}</Text>

      <TextInputCustom
        placeholder={t('active.code')}
        value={idcard}
        onChangeText={setIdcard}
      />
      <ButtonCustom
        onPress={handleActivateAccount}
        title={t('active.button')}
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

export default SignUp
