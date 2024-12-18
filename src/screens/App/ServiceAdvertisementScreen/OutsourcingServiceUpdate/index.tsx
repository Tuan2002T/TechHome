import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { showMessage } from 'react-native-flash-message'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import { updateOutsourcingService } from '../../../../api/API/outsourcingService'

const LOAI_DICH_VU = ['Đồ ăn', 'Đồ uống', 'Khác']

const OutsourcingServiceUpdate: React.FC = ({ navigation, route }) => {
  const { userData } = useSelector((state: any) => state.auth)
  const [outsourcingServiceName, setOutsourcingServiceName] = useState('')
  const [outsourcingServiceDescription, setOutsourcingServiceDescription] =
    useState('')
  const [outsourcingServicePrice, setOutsourcingServicePrice] = useState('')
  const [outsourcingServiceLocation, setOutsourcingServiceLocation] =
    useState('')
  const [outsourcingServiceType, setOutsourcingServiceType] = useState('')
  const [outsourcingServiceImage, setOutsourcingServiceImage] =
    useState<any>(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (route.params?.item) {
      const {
        outsourcingServiceName,
        outsourcingServiceDescription,
        outsourceServicePrice,
        outsourceServiceLocation,
        outsourcingServiceType,
        outsourcingServiceImage
      } = route.params.item

      if (outsourcingServiceType === 'FOOD') {
        setOutsourcingServiceType('Đồ ăn')
      } else if (outsourcingServiceType === 'DRINKS') {
        setOutsourcingServiceType('Đồ uống')
      } else {
        setOutsourcingServiceType('Khác')
      }

      setOutsourcingServiceName(outsourcingServiceName)
      setOutsourcingServiceDescription(outsourcingServiceDescription)
      setOutsourcingServicePrice(outsourceServicePrice)
      setOutsourcingServiceLocation(outsourceServiceLocation)
      setOutsourcingServiceImage(outsourcingServiceImage)
    }
  }, [route.params?.item])

  const chooseImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage)
      } else {
        setOutsourcingServiceImage(response.assets ? response.assets[0] : null)
      }
    })
  }

  const onSubmit = async () => {
    if (
      !outsourcingServiceName ||
      !outsourcingServiceDescription ||
      !outsourcingServicePrice ||
      !outsourcingServiceLocation ||
      !outsourcingServiceType ||
      !outsourcingServiceImage
    ) {
      showMessage({
        message: 'Vui lòng điền đầy đủ thông tin!',
        type: 'danger'
      })
      return
    }

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('outsourcingServiceName', outsourcingServiceName)
      formData.append(
        'outsourcingServiceDescription',
        outsourcingServiceDescription
      )

      let serviceType = 'OTHER'
      if (outsourcingServiceType === 'Đồ ăn') {
        serviceType = 'FOOD'
      } else if (outsourcingServiceType === 'Đồ uống') {
        serviceType = 'DRINKS'
      }

      formData.append('outsourceServicePrice', outsourcingServicePrice)
      formData.append('outsourceServiceLocation', outsourcingServiceLocation)
      formData.append('outsourcingServiceType', serviceType)
      if (outsourcingServiceImage.uri) {
        const uri =
          Platform.OS === 'android'
            ? outsourcingServiceImage.uri
            : outsourcingServiceImage.uri.replace('file://', '')
        formData.append('file', {
          uri: uri,
          type: outsourcingServiceImage.type,
          name: outsourcingServiceImage.fileName
        })
      }

      const response = await updateOutsourcingService(
        userData.token,
        route.params.item.outsourcingServiceId,
        formData
      )
      if (response) {
        showMessage({
          message: 'Dịch vụ đã được thêm thành công!',
          type: 'success'
        })
        navigation.goBack()
      }
    } catch (error) {
      console.error(error)
      showMessage({
        message: 'Có lỗi xảy ra! Vui lòng thử lại.',
        type: 'danger'
      })
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Cập nhập dịch vụ</Text>
        <Text></Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Tên Dịch Vụ"
        value={outsourcingServiceName}
        onChangeText={setOutsourcingServiceName}
      />

      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Mô Tả Dịch Vụ"
        value={outsourcingServiceDescription}
        onChangeText={setOutsourcingServiceDescription}
        multiline
        numberOfLines={4}
      />

      <TextInput
        style={styles.input}
        placeholder="Giá Dịch Vụ"
        value={outsourcingServicePrice}
        keyboardType="numeric"
        onChangeText={setOutsourcingServicePrice}
      />

      <TextInput
        style={styles.input}
        placeholder="Địa Chỉ Dịch Vụ"
        value={outsourcingServiceLocation}
        onChangeText={setOutsourcingServiceLocation}
      />

      <Text style={styles.label}>Chọn Loại Dịch Vụ:</Text>
      <View style={styles.pickerContainer}>
        {LOAI_DICH_VU.map((loai, index) => (
          <TouchableOpacity
            key={index}
            style={styles.pickerItem}
            onPress={() => setOutsourcingServiceType(loai)}
          >
            <Text
              style={
                outsourcingServiceType === loai
                  ? styles.selectedItem
                  : styles.itemText
              }
            >
              {loai}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={chooseImage} style={styles.imagePicker}>
        <Icon name="image" size={30} color="#007BFF" />
        <Text style={styles.imageText}>Chọn Hình Ảnh</Text>
      </TouchableOpacity>

      {outsourcingServiceImage && (
        <Image
          source={{
            uri: outsourcingServiceImage.uri || outsourcingServiceImage
          }}
          style={styles.imagePreview}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Cập nhập</Text>
      </TouchableOpacity>

      <Text style={styles.noticeText}>
        Lưu ý: Dịch vụ sẽ không được đăng ngay mà cần admin duyệt trước.
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#0056b3',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    height: 70
  },
  backButton: {
    padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginLeft: 80
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16
  },
  textarea: {
    textAlignVertical: 'top',
    height: 120
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333'
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15
  },
  pickerItem: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    margin: 5,
    borderRadius: 5
  },
  selectedItem: {
    backgroundColor: '#007BFF',
    color: '#fff',
    fontWeight: 'bold'
  },
  itemText: {
    color: '#000'
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  imageText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#007BFF'
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
  noticeText: {
    fontSize: 14,
    color: '#ff4500',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic'
  }
})

export default OutsourcingServiceUpdate
