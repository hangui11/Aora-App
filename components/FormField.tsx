import { View, Text, StyleSheet, TouchableWithoutFeedback, TextInput, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

import { icons } from '@/constants';

const FormField = ({title, value, placeholder, handleChangeText, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false)

  const handleFocusIn = () => {
    setIsFocused(true);
  };

  const handleFocusOut = () => {
    setIsFocused(false);
  };

  const handleShowPassword = () => {
    setShowPassword(! showPassword)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ title }</Text>
      
      <View style={[styles.border, isFocused ? styles.borderFocused : null]}>
        <TextInput 
          style={styles.text}
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7B7B8B'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
        />

        { title === 'Password' && (
          <TouchableOpacity onPress={handleShowPassword}>
            <Image source={! showPassword ? icons.eye : icons.eyeHide} resizeMode='contain' style={styles.icon}/>
          </TouchableOpacity>
        )}
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },

  title: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
    color: '#CDCDE0',
    fontFamily: 'Poppins-Medium'
  },

  border: {
    borderColor: '#232533',
    height: 64,
    borderWidth: 2,
    width: '100%',
    paddingHorizontal: 8,
    backgroundColor: '#1E1E2D',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2
  },

  borderFocused: {
    borderColor: '#FF9C01'
  },

  text: {
    flex: 1,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight:24
  },

  icon: {
    width: 30,
    height: 30
  }
})


export default FormField