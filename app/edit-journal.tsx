
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import Button from '@/components/Button';
import { API_URL } from './context/AuthContext';

type Journal = {
  id?: string;
  title?: string;
  content?: string;
  categoryName?: string;
  createdAt?: string;
};

const EditJournal = () => {
  const { id, title, content, categoryName, createdAt }: Journal = useLocalSearchParams();
  const router = useRouter();
  const [newTitle, setTitle] = useState(title);
  const [newContent, setContent] = useState(content);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onSave = () => {
    updateJournal(id!, newTitle, newContent);
  };

  const updateJournal = async (id: string, title?: string, content?: string) => {
    try {
      const result = await axios.put(`${API_URL}/journal`, { id, title, content });
      console.log("update journal", result.data);
      alert(result.data.message);
      router.replace('/')
    } catch (error: any) {
      console.error("error journal", error.response.data)
      return { error: true, msg: error.response.data }
    }
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={newTitle}
        onChangeText={(text) => setTitle(text)}
      />

      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={newContent}
        onChangeText={(text) => setContent(text)}
        multiline
        numberOfLines={4}
      />

      <Button title="Update" onPress={onSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default EditJournal;
