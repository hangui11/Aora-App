import { TouchableOpacity, View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'


const CustomButton = ({ title, handlePress, isLoading}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
        style={[styles.button, isLoading ? {opacity:0.5} : {opacity:1}]}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
        
  )
}


const styles = StyleSheet.create({
    button: {
        marginTop: 17,
        borderRadius: 20,
        backgroundColor: '#FF9C01',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 64,
        width: '100%',
    },

    text: {
        fontFamily: 'Poppins-SemiBold',
        color: '#161622',
        fontSize: 18
    }
})

export default CustomButton