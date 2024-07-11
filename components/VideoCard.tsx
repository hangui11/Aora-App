import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { Video, ResizeMode } from 'expo-av'

const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }) => {
    const [play, setPlay] = useState(false)

  return (
    <View style={styles.container}>
        <View style={ {flexDirection: 'row', gap: 12, alignItems: 'flex-start' } }>
            <View style={ {justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1 } }>
                <View style={ {width: 46, height: 46, borderRadius: 8, borderColor: '#FF9C01', borderWidth: 1 } }>
                    <Image source={{ uri: avatar }} style={ { width: '100%', height: '100%', borderRadius: 7}} resizeMode='cover'/>
                </View>

                <View style={ {justifyContent: 'center', flex: 1, marginLeft: 12, rowGap: 4} }>
                    <Text style={ { color: 'white', fontFamily: 'Poppins-SemiBold', fontSize: 14, lineHeight: 20 } } numberOfLines={1}>
                        { title }
                    </Text>
                    <Text style={styles.text} numberOfLines={1}>{ username }</Text>
                </View>
            </View>
            <View style={ { paddingTop: 8 } }>
                <Image source={ icons.menu } style={ { width: 20, height: 20 } } resizeMode='contain'/>
            </View>
        </View>
        { play ? (
            <Video
                source={{uri: video}}
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
                style={{width:'100%', height: 240, position: 'relative', justifyContent: 'center', alignItems: 'center'}}
                activeOpacity={0.7}
                onPress={ () => setPlay(true) }
            >
                <Image source={{ uri: thumbnail }} style={ { width:'100%', height:'100%',  borderRadius: 12, marginTop: 12}} resizeMode='cover'/>
                <Image source={icons.play} style={{width: 48, height: 48, position: 'absolute', resizeMode:'contain'}}/> 
            </TouchableOpacity>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 56,
    },

    text: {
        color: '#CDCDE0',
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Poppins-Regular'
    },

    video: {
        width:'100%',
        height:240,
        borderRadius: 12,
        marginTop: 0
      }


})

export default VideoCard