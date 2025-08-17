import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

interface RewardsSectionProps {
  currentPoints: number;
  onPointsUpdate: (newPoints: number) => void;
}

export default function RewardsSection({ currentPoints, onPointsUpdate }: RewardsSectionProps) {
  
  // Reward configurations with dynamic disabled state based on current points
  const rewards = [
    {
      id: 'airtime',
      name: 'Airtime',
      cost: 500,
      icon: '📱', // Replace with actual icon component
      color: '#FF9500',
      backgroundColor: '#FFF3E0',
      disabled: currentPoints < 500,
    },
    {
      id: 'voucher',
      name: 'Voucher',
      cost: 1000,
      icon: '🎁', // Replace with actual icon component
      color: '#007AFF',
      backgroundColor: '#E3F2FD',
      disabled: currentPoints < 1000,
    },
    {
      id: 'groceries',
      name: 'Groceries',
      cost: 1500,
      icon: '🛒', // Replace with actual icon component
      color: '#8E8E93',
      backgroundColor: '#F2F2F7',
      disabled: currentPoints < 1500,
    },
  ];

  const handleRewardRedemption = (reward: typeof rewards[0]) => {
    if (reward.disabled || currentPoints < reward.cost) {
      Alert.alert(
        'Insufficient Points',
        `You need ${reward.cost} points to redeem ${reward.name}. You currently have ${currentPoints} points.`,
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Redeem Reward',
      `Are you sure you want to redeem ${reward.name} for ${reward.cost} points?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Redeem',
          onPress: () => {
            // Deduct points
            const newPoints = currentPoints - reward.cost;
            onPointsUpdate(newPoints);
            
            // Show success message
            Alert.alert(
              'Success!',
              `You have successfully redeemed ${reward.name}! Your new balance is ${newPoints} points.`,
              [{ text: 'OK' }]
            );
            
            // Here you would typically also:
            // 1. Send API call to backend to record the redemption
            // 2. Generate voucher code or trigger airtime top-up
            // 3. Add to user's rewards history
          },
        },
      ]
    );
  };

  const calculateProgress = () => {
    const nextRewardCost = 1500; // Next reward threshold
    return (currentPoints / nextRewardCost) * 100;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Rewards</Text>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsIcon}>🪙</Text>
          <Text style={styles.pointsText}>{currentPoints} pts</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.progressText}>Progress to next reward</Text>
        <Text style={styles.progressSubText}>{currentPoints}/1500</Text>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${Math.min(calculateProgress(), 100)}%` }
            ]} 
          />
        </View>
      </View>

      <View style={styles.rewardsGrid}>
        {rewards.map((reward) => (
          <TouchableOpacity
            key={reward.id}
            style={[
              styles.rewardCard,
              { backgroundColor: reward.backgroundColor },
              reward.disabled && styles.rewardCardDisabled
            ]}
            onPress={() => handleRewardRedemption(reward)}
            disabled={reward.disabled}
          >
            <View style={[styles.rewardIcon, { backgroundColor: reward.color }]}>
              <Text style={styles.rewardIconText}>{reward.icon}</Text>
            </View>
            <Text style={[styles.rewardName, reward.disabled && styles.rewardNameDisabled]}>
              {reward.name}
            </Text>
            <Text style={[styles.rewardCost, reward.disabled && styles.rewardCostDisabled]}>
              {reward.cost} pts
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF9500',
  },
  progressSection: {
    marginBottom: 24,
  },
  progressText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  progressSubText: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 4,
  },
  rewardsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rewardCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  rewardCardDisabled: {
    opacity: 0.5,
  },
  rewardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  rewardIconText: {
    fontSize: 24,
  },
  rewardName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  rewardNameDisabled: {
    color: '#8E8E93',
  },
  rewardCost: {
    fontSize: 12,
    color: '#8E8E93',
  },
  rewardCostDisabled: {
    color: '#C7C7CC',
  },
});