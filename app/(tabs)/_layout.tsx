import { Tabs, router } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Button from '@/components/Button';
import { useAuth } from '../context/AuthContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {onLogout} = useAuth()

  const logout = async () => {
    const result = await onLogout!()
    if (result && result.error) {
      alert(result.msg);
  }
  if (result.success) {
      router.replace("login")
  }
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        headerRight: () => <Button title="logout" onPress={() => logout()} />
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'menu' : 'menu-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
