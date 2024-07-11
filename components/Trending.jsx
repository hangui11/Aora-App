import { View, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from '@/constants'
import { Video, ResizeMode } from 'expo-av'

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1.1 }
}

const zoomOut = {
  0: { scale: 1.1 },
  1: { scale: 0.9 }
}

const TrendingItem = ( { activeItem, item } ) => {
  const [play, setPlay] = useState(false);
  // console.log(item.video);
  // always return a View
  return (
    <Animatable.View style={{marginRight: 20}} animation={activeItem == item.$id ? zoomIn : zoomOut} duration={500}>
      { play ? (
          <Video
            source={{uri: item.video}}
            style= {styles.video}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={ (status) => {
              if (status.didJustFinish) {
                setPlay(false)
              }
            }}
          />
        ) : (
          <TouchableOpacity 
            style={{position: 'relative', justifyContent:'center', alignItems: 'center'}} 
            activeOpacity={0.7} 
            onPress={ () => setPlay(true)}
          >
            <ImageBackground 
              source={{uri:item.thumbnail}} 
              style={styles.image_background}
              resizeMode='cover'
            />

            <Image source={icons.play} style={{position:'absolute', width: 48, height: 48}}/>
          </TouchableOpacity>
      )}
    </Animatable.View>
  )
}


const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0])

  const viewableItemsChanges = ( { viewableItems} ) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
            <TrendingItem activeItem={activeItem} item={item}/>
        )}
        onViewableItemsChanged={viewableItemsChanges}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
        contentOffset={{x: 140}}
        horizontal
    />
  )
}

const styles = StyleSheet.create({
  image_background: {
    width: 208, 
    height: 288, 
    marginVertical:20, 
    overflow:'hidden', 
    borderRadius: 35,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10, // Solo para Android
  },

  video: {
    width:208,
    height:288,
    borderRadius: 35,
    marginTop: 12,
    backgroundColor: 'white',
    opacity: 0.1
  }
})

export default Trending
