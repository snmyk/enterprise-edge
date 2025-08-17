import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Camera, Mic, Edit3, AlertTriangle, MapPin, Clock, TrendingUp, Award, Calendar, Filter } from 'lucide-react-native';
import Header from '../../components/Header';

export default function ReportsScreen() {
  const router = useRouter();

  const reportTypes = [
    {
      id: 'photo',
      title: 'Photo Report',
      description: 'Take a photo of the waste issue',
      icon: Camera,
      color: '#10B981',
      bgColor: '#ECFDF5',
      count: 12,
    },
    {
      id: 'voice',
      title: 'Voice Report',
      description: 'Record audio description',
      icon: Mic,
      color: '#3B82F6',
      bgColor: '#EFF6FF',
      count: 8,
    },
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Overflowing Bin',
      location: 'Main Street',
      time: '2 hours ago',
      status: 'In Progress',
      statusColor: '#F59E0B',
      type: 'Photo',
      typeIcon: Camera,
      typeColor: '#10B981',
      points: 50,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
    },
    {
      id: 2,
      title: 'Broken Container',
      location: 'Park Avenue',
      time: '1 day ago',
      status: 'Resolved',
      statusColor: '#10B981',
      type: 'Voice',
      typeIcon: Mic,
      typeColor: '#3B82F6',
      points: 75,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    },

    {
      id: 3,
      title: 'Recycling Bin Full',
      location: 'Downtown Mall',
      time: '1 week ago',
      status: 'Resolved',
      statusColor: '#10B981',
      type: 'Photo',
      typeIcon: Camera,
      typeColor: '#10B981',
      points: 60,
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400',
    },
  ];

  const stats = {
    totalReports: 35,
    resolvedReports: 28,
    pendingReports: 7,
    totalPoints: 1250,
    streak: 12,
  };

  const handleReportTypePress = (type: string) => {
    if (type === 'photo') {
      router.push('/dashboard/pages/PhotoReportPage');
    } else if (type === 'voice') {
      router.push('/dashboard/pages/VoiceReportPage');
    }
  };

  const handleReportPress = (report: any) => {
    // Navigate to report details
    console.log('Report pressed:', report.id);
  };

  const handleViewAll = () => {
    // Navigate to all reports view
    router.push('/dashboard/pages/AllReportsPage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header currentPoints={1250} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <TrendingUp size={24} color="#10B981" />
              </View>
              <Text style={styles.statNumber}>{stats.totalReports}</Text>
              <Text style={styles.statLabel}>Total Reports</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Award size={24} color="#F59E0B" />
              </View>
              <Text style={styles.statNumber}>{stats.totalPoints}</Text>
              <Text style={styles.statLabel}>Points Earned</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Calendar size={24} color="#3B82F6" />
              </View>
              <Text style={styles.statNumber}>{stats.streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>

          {/* Report Types Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Report Types</Text>
            <View style={styles.reportTypesGrid}>
              {reportTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={styles.reportTypeCard}
                  onPress={() => handleReportTypePress(type.id)}
                >
                  <View style={[styles.iconContainer, { backgroundColor: type.bgColor }]}>
                    <type.icon size={24} color={type.color} />
                  </View>
                  <View style={styles.typeInfo}>
                    <Text style={styles.reportTypeTitle}>{type.title}</Text>
                    <Text style={styles.reportTypeDescription}>{type.description}</Text>
                    <View style={styles.typeCount}>
                      <Text style={styles.countText}>{type.count} reports</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Reports Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Reports</Text>
              <TouchableOpacity onPress={handleViewAll}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.reportsList}>
              {recentReports.map((report) => (
                <TouchableOpacity 
                  key={report.id} 
                  style={styles.reportItem}
                  onPress={() => handleReportPress(report)}
                >
                  <View style={styles.reportImageContainer}>
                    <Image source={{ uri: report.image }} style={styles.reportImage} />
                    <View style={[styles.typeBadge, { backgroundColor: report.typeColor + '20' }]}>
                      <report.typeIcon size={12} color={report.typeColor} />
                    </View>
                  </View>
                  
                  <View style={styles.reportContent}>
                    <View style={styles.reportHeader}>
                      <Text style={styles.reportTitle}>{report.title}</Text>
                      <View style={styles.pointsContainer}>
                        <Text style={styles.pointsText}>+{report.points}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.reportMeta}>
                      <View style={styles.metaItem}>
                        <MapPin size={14} color="#6B7280" />
                        <Text style={styles.metaText}>{report.location}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Clock size={14} color="#6B7280" />
                        <Text style={styles.metaText}>{report.time}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.reportFooter}>
                      <View style={[
                        styles.statusBadge,
                        { backgroundColor: report.statusColor + '20' }
                      ]}>
                        <Text style={[
                          styles.statusText,
                          { color: report.statusColor }
                        ]}>
                          {report.status}
                        </Text>
                      </View>
                      <Text style={styles.reportType}>{report.type}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  reportTypesGrid: {
    gap: 12,
  },
  reportTypeCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  typeInfo: {
    flex: 1,
  },
  reportTypeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  reportTypeDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  typeCount: {
    alignSelf: 'flex-start',
  },
  countText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  reportsList: {
    gap: 12,
  },
  reportItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  reportImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  reportImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  typeBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportContent: {
    flex: 1,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  pointsContainer: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  reportMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  reportType: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});