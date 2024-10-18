import React from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'

function SpinnerLoading({ loading }) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={loading} // Chỉ hiển thị Modal khi loading = true
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Circle size={50} color="white" />
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
    },
  });

export default SpinnerLoading
