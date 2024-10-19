import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

function FloatingActionComponent({ icon, title, style, onPress }) {
  return (
    <TouchableOpacity style={[styles.floatingAction, style]} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      {title && <Text style={styles.title}>{title}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  floatingAction: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF', // Đổi màu nền thành trắng
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3, // Tăng độ đậm của bóng
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5, // Tăng độ cao của bóng
    width: '45%',
    marginBottom: 10
  },
  iconContainer: {
    padding: 12,
    borderRadius: 50
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center'
  }
})

export default FloatingActionComponent
