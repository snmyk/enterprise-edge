import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import RewardsSection from '@/components/RewardsSection';
import CollectionPoints from '@/components/CollectionPoints';
import RecentReports from '@/components/RecentReports';
import DashBoard from '../dashboard/dashboard';
import BottomNavigation from '@/components/BottomNavigation';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header currentPoints={1250} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <DashBoard />
        </View>
      </ScrollView>
      <BottomNavigation />
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
