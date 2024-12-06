import { PermissionsAndroid, Platform } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const pickFiles = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [
        DocumentPicker.types.plainText,
        DocumentPicker.types.pdf,
        DocumentPicker.types.audio,
        DocumentPicker.types.zip
      ],
      allowMultiSelection: true
    })
    return res.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      uri: file.uri,
      name: file.name,
      type: file.type,
      size: file.size
    }))
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('Người dùng đã hủy chọn tệp')
      return null
    } else {
      console.error('Lỗi không xác định: ', err)
      throw err
    }
  }
}

export const openCamera = async (type) => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message:
          'This app needs access to your camera to take photos or record videos.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK'
      }
    )

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission denied')
      return null
    }
  }

  try {
    const result = await launchCamera({
      mediaType: type,
      saveToPhotos: true
    })

    if (result.didCancel) {
      console.log('User cancelled camera')
      return null
    } else if (result.errorCode) {
      console.error('Camera error:', result.errorMessage)
      return null
    } else if (result.assets) {
      return result.assets.map((asset) => ({
        uri: asset.uri,
        name: asset.fileName,
        type: asset.type,
        size: asset.fileSize
      }))
    }
  } catch (err) {
    console.error('Unknown error:', err)
    throw err
  }
}

export const pickImagesAndVideos = async () => {
  try {
    const result = await launchImageLibrary({
      mediaType: 'mixed',
      selectionLimit: 0
    })

    if (result.didCancel) {
      console.log('User cancelled picking images/videos')
      return null
    } else if (result.errorCode) {
      console.error('Error picking images/videos:', result.errorMessage)
      return null
    } else if (result.assets) {
      return result.assets.map((asset) => ({
        uri: asset.uri,
        name: asset.fileName,
        type: asset.type,
        size: asset.fileSize
      }))
    }
  } catch (err) {
    console.error('Unknown error:', err)
    throw err
  }
}

export default pickFiles
