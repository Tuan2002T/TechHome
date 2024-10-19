import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

function CardComponent({ icon, title, children, style }) {
  return (
    <View style={[styles.card, style]}>
      {icon} {/* Render icon */}
      {title && <Text style={styles.title}>{title}</Text>}{' '}
      {/* Hiển thị title */}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2 // For Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8 // Khoảng cách giữa title và children
  }
})

export default CardComponent
