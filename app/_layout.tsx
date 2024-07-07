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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

  }, [loaded, authState]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* <NavigationContainer independent={true}> */}
          <Stack screenOptions={{ headerShown: false}}>
            {authState?.authenticated ? (
                <Stack.Screen name="(tabs)"  options={{headerRight: () => <Button title="logout" onPress={onLogout}/>}}/>
                // <Stack.Screen name="+not-found" />
            ) : (
                <Stack.Screen name="login"  />
            )}
          </Stack>
        {/* </NavigationContainer> */}

      </ThemeProvider>
    </AuthProvider>

  );
}
