
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '@/components/Button';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { API_URL } from './context/AuthContext';
import { router } from 'expo-router';


const CreateJournalEntry = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onSave = () => {
    // Implement save functionality here
    console.log({ title, content, category, date });
    addJournal(title, content, category, date);
  };

  const addJournal = async (title: string, content: string, categoryName: string, date: Date) => {
    try {
      const result = await axios.post(`${API_URL}/journal`, { title, content, categoryName, date });
      console.log("result journal", result.data);
      alert(result.data.message);
      router.replace('/')
    } catch (error: any) {
      console.error("error journal", error.response.data)
      return { error: true, msg: error.response.data }
    }
  }

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        placeholder="Enter content"
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter category"
      />

      <Text style={styles.label}>Date</Text>
      <Text style={styles.label}>{date.toDateString()}</Text>
      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Button title="Save" onPress={onSave} />
    </ThemedView>
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
});

export default CreateJournalEntry;
