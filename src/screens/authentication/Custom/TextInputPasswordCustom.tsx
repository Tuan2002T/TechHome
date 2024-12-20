import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle
} from 'react-native'
import { TextInput } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface TextInputPasswordCustomProps {
  label?: string
  placeholder?: string
  placeholderTextColor?: string
  value: string
  onChangeText: (text: string) => void
  style?: StyleProp<ViewStyle>
  [key: string]: any
}

const TextInputPasswordCustom: React.FC<TextInputPasswordCustomProps> = ({
  placeholder = 'Nhập mật khẩu',
  placeholderTextColor = '#A9A9A9',
  value,
  onChangeText,
  style,
  ...rest
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.textinputContainer, style]}>
        <TextInput
          label={placeholder}
          mode="outlined"
          style={[styles.textinput, style]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          outlineStyle={{ borderWidth: 0 }}
          activeOutlineColor="#A9A9A9"
          cursorColor="#A9A9A9"
          theme={{
            colors: {
              primary: '#A9A9A9 !important',
              text: '#A9A9A9 !important',
              placeholder: '#A9A9A9 !important'
            }
          }}
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

export default TextInputPasswordCustom
