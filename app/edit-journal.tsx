
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import Button from '@/components/Button';

type Journal = {
  id?: string;
  title?: string;
  content?: string;
  category?: string;
  date?: string;
};

const EditJournal = () => {
  const { id, title, content, category, date }: Journal = useLocalSearchParams();
  const router = useRouter();
  const [journal, setJournal] = useState<Journal | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (id) {
//       axios
//         .get<Journal>(`https://api.example.com/journals/${id}`)
//         .then((response) => {
//           setJournal(response.data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError(err.message);
//           setLoading(false);
//         });
//     }
//   }, [id]);

  const onSave = () => {
    // if (journal) {
    //   axios
    //     .put(`https://api.example.com/journals/${id}`, journal)
    //     .then(() => {
    //       router.push('view-journal', { id });
    //     })
    //     .catch((err) => {
    //       setError(err.message);
    //     });
    // }
  };

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

//   if (!journal) {
//     return (
//       <View style={styles.error}>
//         <Text style={styles.errorText}>Journal not found</Text>
//       </View>
//     );
//   }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setJournal({ ...journal, title: text })}
      />

      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={(text) => setJournal({ ...journal, content: text })}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={(text) => setJournal({ ...journal, category: text })}
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={(text) => setJournal({ ...journal, date: text })}
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
