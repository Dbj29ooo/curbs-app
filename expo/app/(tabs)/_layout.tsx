import { Tabs } from 'expo-router';
import { Home, Palette, CalendarPlus, Info, Menu } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Platform, useWindowDimensions } from 'react-native';

import Colors from '@/constants/colors';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const tabBarStyle = useMemo(() => ({
    backgroundColor: Colors.white,
    borderTopColor: Colors.borderLight,
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'web' ? 8 : 10,
    height: Platform.OS === 'web' ? 72 : 84,
    ...(Platform.OS === 'web'
      ? {
          width: Math.min(width - 24, 1180),
          alignSelf: 'center' as const,
          borderRadius: 18,
          marginBottom: 12,
          position: 'absolute' as const,
          left: 0,
          right: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.08,
          shadowRadius: 18,
        }
      : null),
  }), [width]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600' as const,
          marginBottom: Platform.OS === 'web' ? 2 : 6,
        },
        tabBarItemStyle: {
          minHeight: 52,
          paddingVertical: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Designs',
          tabBarIcon: ({ color, size }) => <Palette size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          title: 'Book',
          tabBarIcon: ({ color, size }) => <CalendarPlus size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, size }) => <Info size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => <Menu size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
