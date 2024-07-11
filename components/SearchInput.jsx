import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'

import { icons } from '@/constants';
import { router, usePathname } from 'expo-router';

const SearchInput = ({initialQuery}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(initialQuery || '')
  const pathname = usePathname()

  const handleFocusIn = () => {
    setIsFocused(true);
  };

  const handleFocusOut = () => {
    setIsFocused(false);
  };



  return (

      
    <View style={[styles.border, isFocused ? styles.borderFocused : null]}>
      <TextInput 
          style={styles.text}
          placeholder="Search for a video topic"
          placeholderTextColor='#CDCDE0'
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
          onChangeText={(e) => setQuery(e)}
      />
        
      <TouchableOpacity onPress={() => {
        if (! query) return Alert.alert('Missing query', 'Please input something to search results across database')
        if (pathname.startsWith('/search')) router.setParams({ query })
        else router.push(`/search/${query}`)
      }}>
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