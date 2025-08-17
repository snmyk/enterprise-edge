import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import RewardsSection from '@/components/RewardsSection';
import CollectionPoints from '@/components/CollectionPoints';
import RecentReports from '@/components/RecentReports';

export default function RewardsScreen() {
  // Manage points state at the parent level so both Header and RewardsSection can access it
  const [currentPoints, setCurrentPoints] = useState(1250);

  const handlePointsUpdate = (newPoints: number) => {
    setCurrentPoints(newPoints);
  };

  return (
    <SafeAreaView style={styles.container}>
        <Header currentPoints={currentPoints} />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <RewardsSection 
            currentPoints={currentPoints}
            onPointsUpdate={handlePointsUpdate}
          />
          <CollectionPoints  />
          <RecentReports />
        </View>
      </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});