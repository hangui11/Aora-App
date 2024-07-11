import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoCard from '@/components/VideoCard';
import EmptyState from '@/components/EmptyState';
import useAppwrite from '@/lib/useAppwrite';
import { searchPosts } from '@/lib/appwrite';
import SearchInput from '@/components/SearchInput';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query))
  // console.log(query)
  
  // console.log(posts)

  useEffect(() => {
    refetch
  }, [query])
  
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
            <Text style={styles.welcome}>
              Search Results
            </Text>
            <Text style={styles.name}>
              { query }
            </Text>
        
            <SearchInput  initialQuery={query}/>

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

export default Search