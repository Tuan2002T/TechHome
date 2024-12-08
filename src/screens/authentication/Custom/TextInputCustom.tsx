import React from 'react'
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle
} from 'react-native'
import { TextInput } from 'react-native-paper'

interface TextInputCustomProps {
  placeholder?: string
  placeholderTextColor?: string
  value: string
  onChangeText: (text: string) => void
  style?: StyleProp<ViewStyle>
  [key: string]: any
}

const TextInputCustom: React.FC<TextInputCustomProps> = ({
  placeholder = 'Số điện thoại hoặc email',
  placeholderTextColor = '#A9A9A9',
  value,
  onChangeText,
  style,
  ...rest
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.textinputContainer, style]}>
        <TextInput
          label={placeholder}
          mode="outlined"
          style={[styles.textinput, style]}
          value={value}
          onChangeText={onChangeText}
          outlineStyle={{ borderWidth: 0 }}
          activeOutlineColor="#A9A9A9"
          cursorColor="#A9A9A9"
          theme={{
            colors: {
              primary: '#A9A9A9',
              text: '#A9A9A9',
              placeholder: '#A9A9A9'
            }
          }}
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
