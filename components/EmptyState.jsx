import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({ title, subtitle} ) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24}}>
        <Image source={images.empty} style={{ width: 270, height: 215 }} resizeMode='contain'/>
        <Text style={styles.title}>
            { title }
        </Text>
        <Text style={styles.subtitle}>
            { subtitle }
        </Text>

        <CustomButton
            title="Create Video"
            handlePress={() => router.push('/create')}
        />
    </View>
  )
}
const styles = StyleSheet.create({
    subtitle: {
      fontFamily: 'Poppins-Medium',
      fontSize: 14,
      lineHeight: 16,
      color: '#CDCDE0'
    },
  
    title: {
      marginTop: 2,
      fontFamily: 'Poppins-SemiBold',
      color: 'white',
      fontSize: 20,
      lineHeight: 32,
      textAlign: 'center'
    }
})

export default EmptyState