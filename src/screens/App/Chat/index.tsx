import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function Chat() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Chat</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  header: {
    width: '100%',
    height: 180,
    backgroundColor: '#26938E',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  }
})

export default Chat
