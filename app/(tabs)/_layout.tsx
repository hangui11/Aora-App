import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View style={styles.icon}>
      <Image 
        source={icon}
        resizeMode='contain'
        tintColor={color}
        style={styles.image}
      />

      <Text style={[{color: color}, focused ? styles.focusedText : styles.text]}> { name } </Text>

    </View>
  )
}


const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor:  '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 80
          }
      }}>
        <Tabs.Screen name="home"
          options={{
            title:'HOME', 
            headerShown: false, 
            tabBarIcon: ( {color, focused}) => (
              <TabIcon icon={icons.home} color={color} name="HOME" focused={focused}/>)
          }}>
        </Tabs.Screen>

        <Tabs.Screen name="bookmark"
          options={{
            title:'BOOKMARK', 
            headerShown: false, 
            tabBarIcon: ( {color, focused}) => (
              <TabIcon icon={icons.home} color={color} name="BOOKMARK" focused={focused}/>)
          }}>
        </Tabs.Screen>  

        <Tabs.Screen name="profile"
          options={{
            title:'PROFILE', 
            headerShown: false, 
            tabBarIcon: ( {color, focused}) => (
              <TabIcon icon={icons.profile} color={color} name="PROFILE" focused={focused}/>)
          }}>
        </Tabs.Screen>

        <Tabs.Screen name="create"
          options={{
            title:'CREATE', 
            headerShown: false, 
            tabBarIcon: ( {color, focused}) => (
              <TabIcon icon={icons.home} color={color} name="CREATE" focused={focused}/>)
          }}>
        </Tabs.Screen>

        

      </Tabs>
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20
  },

  text: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular'
  },

  focusedText: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold'
  },

  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2
  }


})

export default TabsLayout