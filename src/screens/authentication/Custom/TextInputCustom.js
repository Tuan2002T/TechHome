import React from 'react'
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
import { TextInput } from 'react-native-paper'

function TextInputCustom({
  placeholder = 'Số điện thoại hoặc email',
  placeholderTextColor = '#A9A9A9',
  value,
  onChangeText,
  style,
  ...rest
}) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.textinputContainer, style]}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          mode="outlined"
          style={[styles.textinput, style]} // Kết hợp style từ props
          value={value}
          onChangeText={onChangeText}
          underlineColor="transparent"
          outlineColor="transparent"
          activeOutlineColor="transparent"
          cursorColor="#A9A9A9"
          cursorWidth={1}
          {...rest}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  textinputContainer: {
    flex: 0,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  textinput: {
    width: 350,
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    fontSize: 14
  }
})

export default TextInputCustom
