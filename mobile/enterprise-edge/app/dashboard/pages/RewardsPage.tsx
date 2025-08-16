import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const RewardsPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Rewards</Text>

      {/* Current Points Status */}
      <View style={styles.pointsStatus}>
        <MaterialIcons name="monetization-on" size={32} color="#FFD700" />
        <Text style={styles.pointsText}>1,250 points available</Text>
      </View>

      {/* Available Rewards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        <ScrollView style={styles.rewardsList}>
          <TouchableOpacity style={[styles.rewardCard, styles.airtimeCard]}>
            <MaterialIcons name="phone-iphone" size={32} color="#FF9800" />
            <Text style={styles.rewardName}>Airtime</Text>
            <Text style={styles.rewardCost}>500 pts</Text>
            <Text style={styles.rewardDescription}>R50 airtime voucher</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.rewardCard, styles.voucherCard]}>
            <MaterialIcons name="card-giftcard" size={32} color="#2196F3" />
            <Text style={styles.rewardName}>Voucher</Text>
            <Text style={styles.rewardCost}>1000 pts</Text>
            <Text style={styles.rewardDescription}>R100 shopping voucher</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.rewardCard, styles.groceriesCard]}>
            <MaterialIcons name="shopping-bag" size={32} color="#4CAF50" />
            <Text style={styles.rewardName}>Groceries</Text>
            <Text style={styles.rewardCost}>1500 pts</Text>
            <Text style={styles.rewardDescription}>R150 grocery voucher</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.rewardCard, styles.movieCard]}>
            <MaterialIcons name="movie" size={32} color="#9C27B0" />
            <Text style={styles.rewardName}>Movie Ticket</Text>
            <Text style={styles.rewardCost}>800 pts</Text>
            <Text style={styles.rewardDescription}>Cinema movie ticket</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
