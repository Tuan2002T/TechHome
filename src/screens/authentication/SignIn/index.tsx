import React, { useEffect, useState } from 'react'
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TextInputCustom from '../Custom/TextInputCustom.tsx'
import TextInputPasswordCustom from '../Custom/TextInputPasswordCustom.tsx'
import { Checkbox } from 'react-native-paper'
import ButtonCustom from '../Custom/ButtonCustom.tsx'
import { useDispatch } from 'react-redux'
import { login, residentApartmentInfo } from '../../../redux/Thunk/userThunk.js'
import SpinnerLoading from '../../../Spinner/spinnerloading.js'
import { useTranslation } from 'react-i18next'
import Notification from '../../../Modal/Notification/notification.tsx'
import { CommonActions, NavigationProp } from '@react-navigation/native'
import requestUserPermission from '../../../FireBase/NotificationPush.js'
import { socket } from '../../../Socket/socket.js'
import DropDown from '../Custom/DropDownPicker.tsx'
import { setRememberMe } from '../../../redux/Slice/userSlice.js'
import { updateTokenFCM } from '../../../api/API/user.js'

interface SignInData {
  username: string
  password: string
}
interface SignInProps {
  navigation: NavigationProp<any>
}

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch()
  const [signInData, setSignInData] = useState<SignInData>({
    username: 'leminhcuong',
    password: 'pass3'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [notification, setNotification] = useState('')
  const [selectedFruit, setSelectedFruit] = useState(null)
  const [fcmToken, setFcmToken] = useState('')

  const { t } = useTranslation()

  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await dispatch(login(signInData)).unwrap()
      const token = response.token

      await dispatch(residentApartmentInfo(token)).unwrap()
      if (fcmToken) {
        const fcm = await updateTokenFCM(token, fcmToken)
      }

      dispatch(setRememberMe(checked))
      socket.emit('userOnline', response.user.userId)

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Tabs' }]
        })
      )
    } catch (error) {
      setError(true)
      setNotification('Đăng nhập thất bại')
    } finally {
      setLoading(false)
    }
  }

  const closeNotification = () => {
    setError(false)
    setLoading(false)
  }

  useEffect(() => {
    console.log('123')

    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Yêu cầu quyền gửi thông báo',
            message: 'Ứng dụng cần quyền để gửi thông báo cho bạn.',
            buttonPositive: 'Đồng ý'
          }
        )

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Quyền thông báo đã được cấp')
          const fcmToken = await requestUserPermission()
          setFcmToken(fcmToken)
        } else {
          console.log('Quyền thông báo đã bị từ chối')
        }
      }
    }

    requestNotificationPermission()
  }, [])

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
      <Text style={styles.title}>{t('login.title')}</Text>

      <TextInputCustom
        placeholder={t('login.username')}
        value={signInData.username}
        onChangeText={(text) =>
          setSignInData({ ...signInData, username: text })
        }
      />
      <TextInputPasswordCustom
        placeholder={t('login.password')}
        value={signInData.password}
        onChangeText={(text) =>
          setSignInData({ ...signInData, password: text })
        }
      />
      <View style={styles.checkbox}>
        <View style={styles.checkbox1}>
          <Checkbox
            color="#999999"
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
          />
          <Text style={styles.text}>{t('login.remember')}</Text>
        </View>
        <Text
          onPress={() => navigation.navigate('ForgotPassword')}
          style={{ textDecorationLine: 'underline', color: '#999999' }}
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
  },
  text: {
    color: '#999999'
  }
})

export default SignIn
