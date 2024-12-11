import React from 'react'
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from 'react-native'
import Video from 'react-native-video'

const ImageViewerModal = ({ isVisible, imageUri, onClose, type }) => {
  const defaultUri =
    'https://dichvuphotoshop.net/wp-content/uploads/2021/04/texture-la-gi.jpg'

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <View style={styles.closeIcon}>
            <Text style={styles.closeText}>×</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.modalContent}>
          {type === 'image' ? (
            <Image
              resizeMode="contain"
              style={styles.modalImage}
              source={{
                uri: imageUri || defaultUri
              }}
            />
          ) : (
            <Video
              source={{ uri: imageUri }}
              style={styles.videoPlayer}
              controls={true}
              resizeMode="cover"
            />
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '95%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalImage: {
    width: '100%',
    height: '100%'
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10
  },
  closeIcon: {
    backgroundColor: '#ffffff',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  videoPlayer: {
    width: '100%',
    height: '100%'
  }
})

export default ImageViewerModal
