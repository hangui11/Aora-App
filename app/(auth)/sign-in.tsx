import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '@/constants'
const SignIn = () => {
  const screenHeight = Dimensions.get('window').height;
  const minHeight = screenHeight * 0.85; // 85% of the screen height
  return (
    <SafeAreaView style={{backgroundColor: '#161622', height: screenHeight}}>
      <ScrollView>
        <View style={[styles.view]}>
          <Image source={images.logo} style={styles.logo} resizeMode='contain'/>

          <Text style={[{color: 'white'}, styles.text]}>Log in to Aora</Text>
        </View> 
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginVertical: 6,
    height: '100%'
  },

  logo: {
    height: 100,
    width: 120
  },

  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    marginTop: 10
  }
})


export default SignIn