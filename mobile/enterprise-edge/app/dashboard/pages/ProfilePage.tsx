import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Profile</Text>

      {/* User Info Card */}
      <View style={styles.userCard}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={48} color="#4CAF50" />
        </View>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>
        <Text style={styles.userLocation}>Cape Town, South Africa</Text>
      </View>

      {/* Profile Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <ScrollView style={styles.optionsList}>
          <TouchableOpacity style={styles.optionItem}>
            <MaterialIcons name="person" size={24} color="#4CAF50" />
            <Text style={styles.optionTitle}>Edit Profile</Text>
            <MaterialIcons name="chevron-right" size={24} color="#9E9E9E" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <MaterialIcons name="notifications" size={24} color="#2196F3" />
            <Text style={styles.optionTitle}>Notifications</Text>
            <MaterialIcons name="chevron-right" size={24} color="#9E9E9E" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <MaterialIcons name="security" size={24} color="#FF9800" />
            <Text style={styles.optionTitle}>Privacy & Security</Text>
            <MaterialIcons name="chevron-right" size={24} color="#9E9E9E" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <MaterialIcons name="help" size={24} color="#9C27B0" />
            <Text style={styles.optionTitle}>Help & Support</Text>
            <MaterialIcons name="chevron-right" size={24} color="#9E9E9E" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <MaterialIcons name="info" size={24} color="#607D8B" />
            <Text style={styles.optionTitle}>About EcoReport</Text>
            <MaterialIcons name="chevron-right" size={24} color="#9E9E9E" />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <MaterialIcons name="logout" size={24} color="#F44336" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  userCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  userLocation: {
    fontSize: 14,
    color: '#888',
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  optionsList: {
    flex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  optionTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
    marginLeft: 10,
  },
});

export default ProfilePage;
