// ButtonCustom.js
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from '@rneui/themed'

function ButtonCustom({
  title,
  onPress,
  buttonStyle,
  containerStyle,
  titleStyle,
  icon,
  iconRight,
  disabled,
  loading,
  ...restProps
}: any) {
  return (
    <View style={styles.buttoncustom}>
      <Button
        title={title}
        type="outline"
        buttonStyle={[styles.button, buttonStyle]}
        containerStyle={[styles.buttonContainer, containerStyle]}
        titleStyle={[styles.title, titleStyle]}
        onPress={onPress}
        disabled={disabled}
        loading={loading}
        icon={icon}
        iconRight={iconRight}
        {...restProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttoncustom: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: 'white',
    // marginTop: 46
  },
  buttonContainer: {
    borderRadius: 100,
    overflow: 'hidden'
  },
  button: {
    width: 200,
    height: 45,
    borderRadius: 100,
    borderColor: '#94989B',
    borderWidth: 1
  },
  title: {
    color: '#94989B',
    fontSize: 16
  }
})

export default ButtonCustom
