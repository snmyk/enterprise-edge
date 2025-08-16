import React from 'react';
import { Tabs } from 'expo-router';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

export default function BottomNavigation() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="PointsScreen"
        options={{
          tabBarIcon: ({ size, color }) =>
            <Ionicons name="location" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="ReportsScreen"
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="filetext1" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="RewardsScreen"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="gift" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}