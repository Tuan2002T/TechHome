import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { View, StyleSheet, Modal } from 'react-native'

interface NotificationProps {
  loading: boolean
  message: string
  onClose: () => void
}

function Notification({ loading, message, onClose }: NotificationProps) {
  return (
    <Modal transparent={true} animationType="fade" visible={loading}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.message}>{message}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: -20
  },
  container: {
    width: '70%',
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999999'
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#D3D3D3'
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  }
})

export default Notification
