import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Smartphone, Gift, ShoppingBag, Coins } from 'lucide-react-native';

export default function RewardsSection() {
  const rewards = [
    { id: 1, name: 'Airtime', points: 500, icon: Smartphone, color: '#F59E0B' },
    { id: 2, name: 'Voucher', points: 1000, icon: Gift, color: '#3B82F6' },
    { id: 3, name: 'Groceries', points: 1500, icon: ShoppingBag, color: '#10B981' },
  ];

  const currentPoints = 1250;
  const nextRewardPoints = 1500;
  const progress = currentPoints / nextRewardPoints;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Rewards</Text>
        <View style={styles.pointsContainer}>
          <Coins size={16} color="#F59E0B" />
          <Text style={styles.pointsText}>{currentPoints} pts</Text>
        </View>
      </View>
      
      <View style={styles.progressSection}>
        <Text style={styles.progressLabel}>Progress to next reward</Text>
        <Text style={styles.progressText}>{currentPoints}/{nextRewardPoints}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      <View style={styles.rewardsGrid}>
        {rewards.map((reward) => {
          const IconComponent = reward.icon;
          const isAvailable = currentPoints >= reward.points;
          
          return (
            <TouchableOpacity
              key={reward.id}
              style={[
                styles.rewardCard,
                { backgroundColor: isAvailable ? reward.color + '20' : '#F3F4F6' }
              ]}
            >
              <View style={[
                styles.iconContainer,
                { backgroundColor: isAvailable ? reward.color : '#9CA3AF' }
              ]}>
                <IconComponent size={24} color="#FFFFFF" />
              </View>
              <Text style={[
                styles.rewardName,
                { color: isAvailable ? '#111827' : '#9CA3AF' }
              ]}>
                {reward.name}
              </Text>
              <Text style={[
                styles.rewardPoints,
                { color: isAvailable ? '#6B7280' : '#9CA3AF' }
              ]}>
                {reward.points} pts
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginBottom: 8,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F59E0B',
  },
  progressSection: {
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  rewardsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  rewardCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  rewardName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  rewardPoints: {
    fontSize: 12,
    fontWeight: '400',
  },
});