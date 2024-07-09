import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TextInput } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/Button';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { CURRENT_USER, useAuth } from '../context/AuthContext';
import { router } from 'expo-router';



export default async function TabTwoScreen() {
  const [id, setId] = useState();
  const [email, setEmail] = useState('email');
  const [password, setPassword] = useState('password');
  const { onLogin, onRegister, onUpdate } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const user = await SecureStore.getItemAsync(CURRENT_USER);
      if (user) {
        setId(JSON.parse(user).id);
        setEmail(JSON.parse(user).email);
        setPassword(JSON.parse(user).password);
      }
    }
    getUser();
  }, []);


  const update = async () => {
    const result = await onUpdate!(id!, email, password);
    if (result && result.error) {
      alert(result.msg);
    }
    if (result.success) {
      alert("user updated successfully")
      router.replace("(tabs)")
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView >
        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <ThemedText style={styles.label}>Password</ThemedText>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Button title="Update" onPress={() => update()} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
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
