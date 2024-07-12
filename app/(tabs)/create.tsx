import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton'
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router'
import { createVideo } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const Create = () => {

  const { user } = useGlobalContext()

  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync
    ({
      type: selectType === 'image' ? ['image/png', 'image/jpg', 'image/jpeg'] : ['video/mp4', 'video/gif']
    })

    if (! result.canceled) {
      if (selectType === 'image') setForm({...form, thumbnail: result.assets[0]})
    
      if (selectType === 'video') setForm({...form, video: result.assets[0]})
        console.log(result.assets[0])
    } 

  }
  const submit = async() => {
    if (!form.prompt  || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert('Please fill in all the fileds')
    }

    setUploading(true)

    try{
      await createVideo({...form, userId: user.$id})

      Alert.alert('Success', 'Post uploaded successfully')
      router.push('/home')
    } catch(error) {
      Alert.alert('Error', error.message)
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })
      setUploading(false)
    }

  }

  return (
    <SafeAreaView style={{ backgroundColor: '#161622', height:'100%'}}>
      <ScrollView style={{ paddingHorizontal: 20, marginVertical: 24 }}>
        <Text style={{ color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 24}}>
          Upload Video
        </Text>

        <FormField 
          title='Video Title'
          value={form.title} 
          placeholder='Give your video a catch title...'
          handleChangeText={(e) => setForm({...form, title: e})}
        />

        <View style={{marginTop: 42}}>
          <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', color: '#CDCDE0'}}>
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video != null ? (
              <Video
                source={{uri: form.video.uri}} 
                style={{width:'100%', height: 64*4, borderRadius: 16}}
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View style={{width: '100%', height: 160, paddingHorizontal: 16, backgroundColor: '#1E1E2D', borderRadius: 24, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: 56, height: 56, borderStyle: 'dashed', borderColor: '#FF9001', borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={icons.upload} resizeMode='contain' style={{width: '50%', height: '50%'}}/>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 42}}>
          <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', color: '#CDCDE0'}}>
            Thumbnail Image
          </Text>
          
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail != null ? (
              <Image
                source={{uri: form.thumbnail.uri}}
                resizeMode='cover'
                style={{width: '100%', height: 64*4, borderRadius: 16}}
              />
            ) : (
              <View style={{width: '100%', height: 64, paddingHorizontal: 16, backgroundColor: '#1E1E2D', borderRadius: 24, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#232533', flexDirection: 'row'}}>
                <Image source={icons.upload} resizeMode='contain' style={{width: 20, height: 20, marginRight: 10}}/>
                <Text style={{fontFamily: 'Poppins-Medium', color: '#CDCDE0', fontSize: 14}}>Choose a File</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField 
          title='AI Prompt'
          value={form.prompt} 
          placeholder='The prompt you used to create this video'
          handleChangeText={(e) => setForm({...form, prompt: e})}
        />
        <View style={{marginTop: 15}}>
          <CustomButton
            title='Submit & Publish'
            handlePress={submit}
            isLoading={uploading}
          />
        </View>
        


      </ScrollView>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({

})

export default Create