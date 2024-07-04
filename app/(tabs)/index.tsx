import { Image, StyleSheet, Platform, View, FlatList, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const journals = [
  { id: '1', title: 'Journal 1' },
  { id: '2', title: 'Journal 2' },
  { id: '3', title: 'Journal 3' },
  // Add more journals as needed
];

export default function HomeScreen() {

  const renderItem = ({ item }: any) => (
    <View style={styles.journalContainer}>
      <ThemedText style={styles.journalTitle}>{item.title}</ThemedText>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>Edit</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
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
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
      <FlatList
        data={journals}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
