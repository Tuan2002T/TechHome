import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Button
} from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { showMessage } from 'react-native-flash-message'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { createAdvertisement } from '../../../api/API/advertisement'
import { useSelector } from 'react-redux'

const Advertisement: React.FC = () => {
  const navigation = useNavigation()
  const { userData } = useSelector((state: any) => state.auth)
  const [advertisementName, setAdvertisementName] = useState('')
  const [advertisementContent, setAdvertisementContent] = useState('')
  const [adverLocation, setAdverLocation] = useState('')
  const [advertisementImage, setAdvertisementImage] = useState<any>(null)

  const chonHinhAnh = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage)
      } else {
        setAdvertisementImage(response.assets ? response.assets[0] : null)
      }
    })
  }

  const onSubmit = async () => {
    if (
      !advertisementName ||
      !advertisementContent ||
      !advertisementImage ||
      !adverLocation
    ) {
      showMessage({
        message: 'Tất cả các trường là bắt buộc!',
        type: 'danger'
      })
      return
    }

    try {
      const formData = new FormData()
      formData.append('advertisementName', advertisementName)
      formData.append('advertisementContent', advertisementContent)
      formData.append('adverLocation', adverLocation)
      formData.append('file', {
        uri: advertisementImage.uri,
        type: advertisementImage.type,
        name: advertisementImage.fileName
      })

      const response = await createAdvertisement(userData.token, formData)

      if (response) {
        showMessage({
          message: 'Bài quảng cáo đã được tạo thành công!',
          type: 'success'
        })

        navigation.goBack()
      } else {
        showMessage({
          message: data.message || 'Đã có lỗi xảy ra!',
          type: 'danger'
        })
      }
    } catch (error) {
      console.error(error)
      showMessage({
        message: 'Đã có lỗi xảy ra!',
        type: 'danger'
      })
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            paddingLeft: 20
          }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Tạo bài quảng cáo</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên bài quảng cáo"
          value={advertisementName}
          onChangeText={setAdvertisementName}
        />
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Nội dung bài quảng cáo"
          value={advertisementContent}
          onChangeText={setAdvertisementContent}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Điểm điểm quảng cáo"
          value={adverLocation}
          onChangeText={setAdverLocation}
        />

        <TouchableOpacity onPress={chonHinhAnh} style={styles.imagePicker}>
          <Icon name="image" size={30} color="#007BFF" />
          <Text style={styles.imageText}>Chọn ảnh từ thư viện</Text>
        </TouchableOpacity>

        {advertisementImage && (
          <Image
            source={{ uri: advertisementImage.uri }}
            style={styles.imagePreview}
          />
        )}

        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitButtonText}>Thêm bài quảng cáo</Text>
        </TouchableOpacity>

        <Text style={styles.infoText}>
          Lưu ý: Dịch vụ quảng cáo sẽ không được đăng ngay mà cần sự duyệt của
          quản trị viên.
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
    backgroundColor: '#0056b3',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#333'
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top'
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#e0f7ff',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  imageText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#0056b3'
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  infoText: {
    fontSize: 14,
    color: 'red',
    marginTop: 15,
    textAlign: 'center'
  }
})

export default Advertisement
