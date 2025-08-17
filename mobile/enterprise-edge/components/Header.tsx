import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Coins, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';


interface HeaderProps {
  currentPoints: number;
}

export default function Header({ currentPoints }: HeaderProps) {
  const router = useRouter();

  const handleProfilePress = () => {
    router.push('/(tabs)/ProfileScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>♻️</Text>
        </View>
        <View>
          <Text style={styles.appName}>EcoReport</Text>
          <Text style={styles.subtitle}>Waste Management System</Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <View style={styles.pointsContainer}>
          <Coins size={16} color="#F59E0B" />
          <Text style={styles.pointsText}>{currentPoints}</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
          <User size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});