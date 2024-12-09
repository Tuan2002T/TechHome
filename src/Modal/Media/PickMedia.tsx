import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Modal } from 'react-native'

interface PickMediaProps {
  open: boolean
  onClose: () => void
  onCameraPress: () => void
  onGalleryPress: () => void
  onVideoPress: () => void
}

const PickMedia = ({
  open,
  onClose,
  onCameraPress,
  onVideoPress,
  onGalleryPress
}: PickMediaProps) => {
  return (
    <Modal
      transparent
      visible={open}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Chọn Ảnh, Video hoặc Mở Camera</Text>
          <TouchableOpacity
            style={[styles.option, styles.cameraButton]}
            onPress={onVideoPress}
          >
            <Text style={styles.optionText}>Quay Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, styles.cameraButtonImage]}
            onPress={onCameraPress}
          >
            <Text style={styles.optionText}>Chụp ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, styles.galleryButton]}
            onPress={onGalleryPress}
          >
            <Text style={styles.optionText}>Chọn từ Thư Viện</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '70%',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  option: {
    paddingVertical: 15,
    width: '70%',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5
  },
  cameraButton: {
    backgroundColor: '#4CAF50'
  },
  cameraButtonImage: {
    backgroundColor: '#FFC107'
  },
  galleryButton: {
    backgroundColor: '#2196F3'
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500'
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    width: '50%',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5
  },
  closeButtonText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500'
  }
})

export default PickMedia
