import { View, Text, StyleSheet, TouchableWithoutFeedback, TextInput, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

import { icons } from '@/constants';

const SearchInput = ({value, placeholder, handleChangeText, ...props}) => {
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

      
    <View style={[styles.border, isFocused ? styles.borderFocused : null]}>
      <TextInput 
          style={styles.text}
          placeholder="Search for a video topic"
          placeholderTextColor='#7B7B8B'
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
      />
        
      <TouchableOpacity onPress={handleShowPassword}>
        <Image source={icons.search} resizeMode='contain' style={styles.icon}/>
      </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({


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
    borderColor: '#FF9C01',
    // marginLeft: 24
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    flex: 1,
    fontFamily: 'Poppins-Regular',
    // marginTop: 30
  },

  icon: {
    width: 24,
    height: 24
  }
})


export default SearchInput