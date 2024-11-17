import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ButtonCustom from '../../../authentication/Custom/ButtonCustom.tsx'
import TextInputPasswordCustom from '../../../authentication/Custom/TextInputPasswordCustom.tsx'
import TextInputCustom from '../../../authentication/Custom/TextInputCustom.tsx'
import { update } from '../../../../api/API/user.js'
import SpinnerLoading from '../../../../Spinner/spinnerloading.js'
import Notification from '../../../../Modal/Notification/notification.js'
import * as ImagePicker from 'react-native-image-picker'
import { useSelector } from 'react-redux'

const EditProfile = ({ navigation, route }) => {
  const { residentData } = route.params || {}

  const { userData } = useSelector((state: any) => state.auth)

  // Initialize formData with residentData or default userData
  const [formData, setFormData] = useState({
    idcard: residentData?.idcard || userData?.resident?.idcard || '',
    fullname: residentData?.fullname || userData?.user?.fullname || '',
    phonenumber:
      residentData?.phonenumber || userData?.resident?.phonenumber || '',
    email: residentData?.email || userData?.user?.email || '',
    password: '',
    file: null
  })

  const [avatar, setAvatar] = useState(userData?.user?.avatar || null)
  const [avatarUpload, setAvatarUpload] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const closeNotification = () => setError(false)

  const handleUpdate = async () => {
    setLoading(true)
    try {
      const result = await update({ ...formData }, userData.token)
      console.log('Result:', result)
      setLoading(false)
      Alert.alert('Thành công', 'Cập nhật hồ sơ thành công')
      navigation.goBack()
    } catch (error) {
      console.error('Error:', error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const selectAvatar = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('Người dùng đã hủy chọn ảnh.')
      } else if (response.errorMessage) {
        console.error('Lỗi chọn ảnh:', response.errorMessage)
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri
        setAvatar(uri)
        formData.file = {
          uri: uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type
        }
      }
    })
  }

  return (
    <View style={styles.container}>
      <SpinnerLoading loading={loading} />
      <Notification loading={error} onClose={closeNotification} />

      <MaterialIcons
        onPress={navigation.goBack}
        style={styles.buttonLeft}
        name="keyboard-arrow-left"
        size={38}
        color="#000"
      />

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.editAvatarButton}
          onPress={selectAvatar}
        >
          <MaterialIcons name="edit" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <TextInputCustom
        placeholder="Nhập tên"
        value={formData.fullname}
        onChangeText={(text) => handleChange('fullname', text)}
      />
      <TextInputCustom
        placeholder="Nhập số điện thoại"
        value={formData.phonenumber}
        onChangeText={(text) => handleChange('phonenumber', text)}
      />
      <TextInputCustom
        placeholder="Nhập email"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInputPasswordCustom
        placeholder="Nhập mật khẩu mới (nếu muốn đổi)"
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        style={{ marginBottom: 20 }}
      />

      <ButtonCustom
        style={styles.saveButton}
        title="Lưu thay đổi"
        onPress={handleUpdate}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingTop: 75
  },
  buttonLeft: {
    borderRadius: 50,
    borderWidth: 1,
    width: 41,
    alignSelf: 'flex-start'
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ccc'
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#007AFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff'
  },
  saveButton: {
    marginTop: 20
  }
})

export default EditProfile
