import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../../components/Header';
import BottomNavigation from '../../../components/BottomNavigation';

const PointsPage = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.pageTitle}>My Points</Text>

        {/* Current Points Display */}
        <View style={styles.pointsCard}>
          <MaterialIcons name="monetization-on" size={48} color="#FFD700" />
          <Text style={styles.pointsValue}>1,250</Text>
          <Text style={styles.pointsLabel}>Total Points</Text>
        </View>

        {/* Points History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <ScrollView style={styles.activityList}>
            <View style={styles.activityItem}>
              <MaterialIcons name="photo-camera" size={24} color="#4CAF50" />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Photo Report</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
              <Text style={styles.activityPoints}>+50 pts</Text>
            </View>

            <View style={styles.activityItem}>
              <MaterialIcons name="mic" size={24} color="#2196F3" />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Voice Report</Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
              <Text style={styles.activityPoints}>+30 pts</Text>
            </View>

            <View style={styles.activityItem}>
              <MaterialIcons name="location-on" size={24} color="#FF9800" />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Location Added</Text>
                <Text style={styles.activityTime}>3 days ago</Text>
              </View>
              <Text style={styles.activityPoints}>+20 pts</Text>
            </View>
          </ScrollView>
        </View>
      </View>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  pointsCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  pointsLabel: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  activityList: {
    flex: 1,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  activityInfo: {
    flex: 1,
    marginLeft: 15,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  activityPoints: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
});

export default PointsPage;
