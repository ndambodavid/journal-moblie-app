import { Image, StyleSheet, Platform, View, FlatList, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/Button';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';

export default function HomeScreen() {
  const [journals, setJournals] = useState();

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const result = await axios.get(`${API_URL}/journal`);
        console.log("result journals", result.data);
        setJournals(result.data.data)
      } catch (error: any) {
        console.error("error journal", error.response.data)
        return { error: true, msg: error.response.data }
      }
    }
  
    fetchJournals();
  }, [])
  

  const renderItem = ({ item }: any) => (
    <View style={styles.journalContainer}>
      <ThemedText style={styles.journalTitle}>{item.title}</ThemedText>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}
          onPress={() => router.push({ pathname: "edit-journal", params: item })}>
          <ThemedText style={styles.buttonText}>Edit</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => router.push({ pathname: "view-journal", params: item })}>
          <ThemedText style={styles.buttonText}>View</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">My Journals</ThemedText>
        {/* <HelloWave /> */}
        <Button title="add" onPress={() => router.push("create-journal")} />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <FlatList
          data={journals}
          renderItem={renderItem}
          keyExtractor={item => item?.id}
          scrollEnabled={false}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

// const styles = StyleSheet.create({

// });

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    // height: 178,
    // width: 290,
    // bottom: 0,
    // left: 0,
    position: 'absolute',
  },
  //
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  journalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  journalTitle: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#007BFF',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
  },
});
