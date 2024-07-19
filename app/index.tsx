import { StatusBar } from "expo-status-bar";
import { StyleSheet, Modal, Text, View, ScrollView, Dimensions, Image } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { images } from '../constants'
import * as Device from 'expo-device'
import { useEffect, useState } from "react";

export default function App() {
  const windowWidth = Dimensions.get('screen').width
  const windowHeight = Dimensions.get('screen').height
  const [deviceName, setDeviceName] = useState('');
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const getDeviceName = async () => {
      try {
        let device = Device.osName
        console.log(device);
        if (device == 'Android' || device == "iOS") setIsMobile(true)
        setDeviceName(device);
      } catch (error) {
        console.error(error);
      }
    };
    getDeviceName();
  }, []);


  return (
    <SafeAreaView style={[styles.container, {height: windowHeight}]}>
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View style={[styles.view]}>
          <Image source={images.logo} style={styles.logo} resizeMode="contain"/>
          { isMobile ? (
            <Image source={images.cards} style={styles.card}/>
          ) : (
            <Image source={images.profile} style={[styles.card, {borderRadius: 50}]}/>
          )
          }
          

          <View style={{marginTop: 24, position:'relative'}}>
            <Text style={styles.text}>Discover Endless Possibilites with { ' '} 
              <Text style={{color:'#FF8E01'}}>Aora</Text>
            </Text>
          </View>

          <Image source={images.path} style={styles.path} resizeMode="contain"/>

          <Text style={styles.mini_text}>Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>
          
          <CustomButton title="Continue with Email" handlePress={() => router.push('/sign-in')}></CustomButton>

          <StatusBar backgroundColor="#161622" style="light"></StatusBar>
        </View>
        {isMobile ? (
            <View style={{alignItems: 'center'}}>
              <Text style={{color:'white'}}>THIS IS A MOBILE DEVICE</Text>
            </View>
          ) : (
            <View style={{alignItems: 'center'}}>
              <Text style={{color:'white'}}>THIS IS A DESKTOP DEVICE</Text>
            </View>
          )}
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161622',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    
    
  },

  view: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 4,
    width: '100%'
  },

  logo: {
    width: 130,
    height: 80
  },

  card: {
    maxWidth: 500,
    height: 300,
    width: '100%'
  },

  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: "Poppins-Bold",
  },

  path: {
    height: 15,
    width: 200,
    bottom: 235,
    right: -26,
    position: 'absolute'
  },

  link_style: {
    textDecorationLine: "underline",
    color: "blue",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },

  mini_text: {
    fontFamily: "Poppins-Regular",
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 7
  }
}); 