import { Button } from '@rneui/themed'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import SwitchSelector from 'react-native-switch-selector'

function Authentication({ navigation }) {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

  const languageOptions = [
    { label: 'Vi', value: 'vi' },
    { label: 'En', value: 'en' }
  ]

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../img/Logo.png')} />
      <Text style={styles.slogan}>{t('welcome')}</Text>
      <Button
        title={t('button.login')}
        buttonStyle={styles.button}
        titleStyle={styles.titlebutton}
        onPress={() => {
          navigation.navigate('SignIn')
        }}
      />
      <Button
        title={t('button.active')}
        buttonStyle={styles.buttonactive}
        titleStyle={styles.titlebuttonactive}
        onPress={() => {
          navigation.navigate('SignUp')
        }}
      />

      <SwitchSelector
        options={languageOptions}
        initial={0}
        onPress={(value) => changeLanguage(value)}
        textColor={'#26938E'}
        selectedColor={'white'}
        buttonColor={'#26938E'}
        borderColor={'#26938E'}
        backgroundColor={'#E8F5F5'}
        style={styles.switchSelector}
        bold={true}
        height={40}
        fontSize={16}
        valuePadding={5}
        hasPadding={true}
        animationDuration={250}
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
  logo: {
    marginTop: 30,
    marginBottom: 50
  },
  slogan: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#F8671F',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 320,
    position: 'absolute'
  },
  button: {
    backgroundColor: '#26938E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 200,
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
    fontWeight: 'bold'
  },
  switchSelector: {
    position: 'absolute',
    top: 40, // khoảng cách từ phía trên
    right: 20, // khoảng cách từ phía phải
    width: 120,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 25
  }
})

export default Authentication
