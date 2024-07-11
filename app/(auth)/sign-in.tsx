import { View, Text, StyleSheet, Dimensions, ScrollView, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'

import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignIn = () => {
  const screenHeight = Dimensions.get('window').height;
  const minHeight = screenHeight * 0.85; // 85% of the screen height
  
  const { setUser, setIsLoggedIn } = useGlobalContext()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true)

    try {
      await signIn(form.email, form.password)
      const result = await getCurrentUser()
      setUser(result)
      setIsLoggedIn(true)
      // console.log(result)

      router.replace('/home')
      
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }

  }

  return (
    <SafeAreaView style={{backgroundColor: '#161622', height: '100%'}}>
      <ScrollView>
        <View style={[styles.view, {minHeight: minHeight}]}>
          <Image source={images.logo} style={styles.logo} resizeMode='contain'/>

          <Text style={[{color: 'white'}, styles.text]}>Log in to Aora</Text>
          <FormField 
            title="Email"
            value={form.email} 
            handleChangeText={(e) => setForm({ ...form, email: e})}
            keyboardType="email-adress"/>

          <FormField 
            title="Password"
            value={form.password} 
            handleChangeText={(e) => setForm({ ...form, password: e})}
          />

          <CustomButton title="Sign In" handlePress={submit} isLoading={isSubmitting}/>

          <View style={styles.sign_up}>
            <Text style={styles.sign_up_text}>
              Don't have an account?
            </Text>

            <Link href="/sign-up" style={styles.link}> Sign Up</Link>

          </View>



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
  },

  sign_up: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 20,
    gap: 10
  },

  sign_up_text: {
    color: '#F3F4F6',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    lineHeight: 28
  }, 

  link: {
    fontSize: 15,
    lineHeight: 28,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF9C01'
  }
})


export default SignIn