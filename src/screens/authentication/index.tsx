import { Button } from '@rneui/themed';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import SwitchSelector from 'react-native-switch-selector';

function Authentication({ navigation }) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const languageOptions = [
    { label: "Vi", value: "vi" },
    { label: "En", value: "en" },
  ];

  return (
    <View style={styles.container}>
      <Image source={require('../../img/Logo.png')} />
      <Text style={styles.slogan}>{t('welcome')}</Text>
      <Button
        title={t('button.login')}
        buttonStyle={styles.button}
        titleStyle={styles.titlebutton}
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      />
      <Button
        title={t('button.active')}
        buttonStyle={styles.buttonactive}
        titleStyle={styles.titlebuttonactive}
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      />

      <SwitchSelector
        options={languageOptions}
        initial={0} 
        onPress={value => changeLanguage(value)}
        textColor={'#7a44cf'}
        selectedColor={'white'}
        buttonColor={'#7a44cf'}
        borderColor={'#7a44cf'}
        style={styles.switchSelector}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slogan: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#F8671F',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 300,
    position: 'absolute',
  },
  button: {
    backgroundColor: '#26938E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 200,
    width: 325,
    height: 60,

  },
  titlebutton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonactive: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    width: 325,
    height: 60,
    borderWidth: 1,
  },
  titlebuttonactive: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchSelector: {
    marginTop: 20,
    width: 50,
  },
});

export default Authentication;
