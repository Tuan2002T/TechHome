import { Button } from '@rneui/themed'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

function Authentication({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../img/Logo.png')} />
      <Text style={styles.slogan}>Ứng dụng dành cho cư dân</Text>
      <Button
        title="Đăng nhập"
        buttonStyle={styles.button}
        titleStyle={styles.titlebutton}
        onPress={() => {
          navigation.navigate('SignIn')
        }}
      />
      <Button
        title="Kích hoạt tài khoản"
        buttonStyle={styles.buttonactive}
        titleStyle={styles.titlebuttonactive}
        onPress={() => {
          navigation.navigate('SignUp')
        }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  image: {
    width: 200,
    height: 200
  },
  slogan: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#F8671F',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    bottom: 50,
    marginBottom: 180
  },
  button: {
    backgroundColor: '#26938E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    width: 325,
    height: 60
  },
  titlebutton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonactive: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    width: 325,
    height: 60,
    borderWidth: 1
  },
  titlebuttonactive: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: '#26938E'
  }
})
export default Authentication
