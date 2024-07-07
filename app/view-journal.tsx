
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const ViewJournal = () => {
  const { title, content, categoryName, createdAt } = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title</Text>
      <Text style={styles.text}>{title}</Text>

      <Text style={styles.label}>Content</Text>
      <Text style={styles.text}>{content}</Text>

      <Text style={styles.label}>Category</Text>
      <Text style={styles.text}>{categoryName}</Text>

      <Text style={styles.label}>Date</Text>
      <Text style={styles.text}>{createdAt?.toLocaleString()}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default ViewJournal;
