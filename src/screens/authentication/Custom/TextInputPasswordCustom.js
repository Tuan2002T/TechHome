import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
import { TextInput } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

function TextInputPasswordCustom({
  placeholder = 'Nhập mật khẩu',
  placeholderTextColor = '#A9A9A9',
  value,
  onChangeText,
  style,
  ...rest
}) {
  const [secureTextEntry, setSecureTextEntry] = useState(true)

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
          secureTextEntry={secureTextEntry}
          underlineColor="transparent"
          outlineColor="transparent"
          activeOutlineColor="transparent"
          cursorColor="#A9A9A9"
          cursorWidth={1}
          right={
            <TextInput.Icon
              icon={() => (
                <MaterialIcons
                  name={secureTextEntry ? 'visibility-off' : 'visibility'}
                  size={24}
                  color="#A9A9A9"
                />
              )}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
          }
          {...rest} // Truyền các props khác vào TextInput
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

export default TextInputPasswordCustom
