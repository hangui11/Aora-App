import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoCard from '@/components/VideoCard';
import EmptyState from '@/components/EmptyState';
import useAppwrite from '@/lib/useAppwrite';
import { getUserPosts, logOut } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import { icons } from '@/constants';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id))
  // console.log(user)
  // console.log(posts)

  const logout = async () => {
    await logOut()
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/sign-in')
    // router.replace('/')
  }

  return (
    <SafeAreaView style={{backgroundColor:'#161622', height: '100%'}}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <TouchableOpacity 
              style={{alignItems: 'flex-end', width:'100%', marginBottom:40}}
              onPress={logout}
            >
              <Image source={icons.logout} resizeMode='contain' style={{width: 24, height: 24}}/>
            </TouchableOpacity>
            <View style={ {width: 64, height: 64, borderRadius: 8, borderColor: '#FF9C01', borderWidth: 1, justifyContent:'center', alignItems:'center' } }>
              <Image source={{uri: user?.avatar}} style={{width:'90%', height:'90%', borderRadius: 8}} resizeMode='cover'/>
            </View>
            
            <View style={{marginTop:20}}>
              <Text style={{color: 'white', textAlign: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 18, lineHeight: 28}}>
                {user?.username}
              </Text>
            </View>

            <View style={{marginTop: 20, flexDirection: 'row'}}>
              <View style={{marginRight: 40}}>
                <Text style={{color: 'white', textAlign: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 20, lineHeight: 28}}>
                  {posts.length || 0}
                </Text>
                <Text style={{fontSize: 14, lineHeight: 20, color: '#CDCDE0', textAlign: 'center', fontFamily: 'Poppins-Regular'}}>
                  Posts
                </Text>
              </View>

              <View>
                <Text style={{color: 'white', textAlign: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 20, lineHeight: 28}}>
                  12.2K
                </Text>
                <Text style={{fontSize: 14, lineHeight: 20, color: '#CDCDE0', textAlign: 'center', fontFamily: 'Poppins-Regular'}}>
                  Followers
                </Text>
              </View>
              
            </View>

          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="No Videos found for this search"/>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    lineHeight: 36,
    color: 'white'
  },

  header: {
    paddingHorizontal: 16,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
    marginTop: 24
  },

  header_component: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 24
  },

  welcome: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 16,
    color: '#CDCDE0'
  },

  name: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 24,
    lineHeight: 32
  }
})

export default Profile