import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from './context/AuthContext';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Button from '@/components/Button';
import { ScreenStack } from 'react-native-screens';


const TOKEN_KEY = 'my-jwt';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { authState, onLogout } = useAuth();
  const [token, setToken] = useState<string | null>();

  const logout = async () => {
    await onLogout!()
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      setToken(token)
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }

    }
    loadToken()

  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* <NavigationContainer independent={true}> */}
            <Stack screenOptions={{ headerShown: false}}>
              {token ? (

                <Stack.Screen name="(tabs)" options={{}} />

                // <Stack.Screen name="+not-found" />
              ) : (
                <Stack.Screen name="login" />

              )}
            </Stack>
        {/* </NavigationContainer> */}

      </ThemeProvider>
    </AuthProvider>

  );
}
