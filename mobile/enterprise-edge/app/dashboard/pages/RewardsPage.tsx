import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import RewardsSection from '@/components/RewardsSection';
import CollectionPoints from '@/components/CollectionPoints';
import RecentReports from '@/components/RecentReports';

const RewardsPage = () => {
  return (
    <View style={styles.container}>
      <RewardsSection />
      <CollectionPoints />
      <RecentReports />
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
  pointsStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
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
  rewardsList: {
    flex: 1,
  },
  rewardCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  airtimeCard: {
    backgroundColor: '#FFF8E1',
  },
  voucherCard: {
    backgroundColor: '#E3F2FD',
  },
  groceriesCard: {
    backgroundColor: '#E8F5E8',
  },
  movieCard: {
    backgroundColor: '#F3E5F5',
  },
  rewardName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  rewardCost: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  rewardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default RewardsPage;
