import { View, Text, FlatList, StyleSheet, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'


const Home = () => {

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)

    setRefreshing(false)
  }

  return (
    <SafeAreaView style={{backgroundColor:'#161622', height: '100%'}}>
      <FlatList
        data={[{id: 1}, {id: 2}, {id: 3}]}
        // data = {[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.text}>{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <View style={styles.header_component}>
              <View>
                <Text style={styles.welcome}>
                  Welcome Back
                </Text>
                <Text style={styles.name}>
                  JSMatery
                </Text>
              </View>

              <View style={{marginTop: 6}}>
                <Image
                  source={images.logoSmall}
                  style={{width:36, height:40}}
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput/>

            <View style={{width:'100%', flex: 1, paddingTop: 30, paddingBottom: 40}}>
              <Text style={{color: '#CDCDE0', marginBottom: 18, fontFamily: 'Poppins-Regular', fontSize: 18, lineHeight: 28}}>
                Latest Videos
              </Text>

              <Trending posts={[{id: 1}, {id: 2}, {id: 3}] ?? []}/>
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="Be the first one to upload the video"/>
        )}
        refreshControl={<RefreshControl></RefreshControl>}
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
    marginVertical: 24,
    paddingHorizontal: 16,
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

export default Home