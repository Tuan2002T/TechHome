import React, { useState } from 'react'
import { StyleSheet, StyleProp, ViewStyle } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

interface DropdownItem {
  label: string
  value: string
}

interface DropDownProps {
  placeholder?: string
  placeholderTextColor?: string
  value: string | null
  onValueChange: (value: string) => void
  items?: DropdownItem[]
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  zIndex?: number
  zIndexInverse?: number
  maxHeight?: number
  disabled?: boolean
}

const DropDown: React.FC<DropDownProps> = ({
  placeholder = 'Select an option',
  placeholderTextColor = 'gray',
  value,
  onValueChange,
  items = [],
  style,
  containerStyle,
  zIndex = 1000,
  zIndexInverse = 3000,
  maxHeight = 200,
  disabled = false,
  ...rest
}) => {
  const [open, setOpen] = useState(false)
  const [dropdownItems, setDropdownItems] = useState(items)

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={dropdownItems}
      setOpen={setOpen}
      setValue={(callback) => {
        const selectedValue = callback(value)
        onValueChange(selectedValue as string)
      }}
      setItems={setDropdownItems}
      placeholder={placeholder}
      placeholderStyle={{ color: placeholderTextColor }}
      style={[styles.dropdown, style]}
      zIndex={zIndex}
      disabled={disabled}
      zIndexInverse={zIndexInverse}
      autoScroll={true}
      dropDownContainerStyle={{
        maxHeight: maxHeight,
        borderColor: '#E0E0E0'
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 1000
  },
  dropdown: {
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10
  }
})

export default DropDown
