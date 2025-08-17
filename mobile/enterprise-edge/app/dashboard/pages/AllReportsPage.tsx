import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Camera, Mic, MapPin, Clock, Search, Filter, ArrowLeft, Calendar } from 'lucide-react-native';
import Header from '../../../components/Header';
import BottomNavigation from '../../../components/BottomNavigation';

export default function AllReportsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const allReports = [
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
    {
      id: 4,
      title: 'Illegal Dumping Site',
      location: 'Riverside Drive',
      time: '2 weeks ago',
      status: 'Under Review',
      statusColor: '#8B5CF6',
      type: 'Photo',
      typeIcon: Camera,
      typeColor: '#10B981',
      points: 100,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    },
    {
      id: 5,
      title: 'Damaged Waste Bin',
      location: 'Central Park',
      time: '3 weeks ago',
      status: 'Resolved',
      statusColor: '#10B981',
      type: 'Voice',
      typeIcon: Mic,
      typeColor: '#3B82F6',
      points: 45,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    },
    {
      id: 6,
      title: 'Recycling Contamination',
      location: 'Shopping Center',
      time: '1 month ago',
      status: 'Resolved',
      statusColor: '#10B981',
      type: 'Photo',
      typeIcon: Camera,
      typeColor: '#10B981',
      points: 80,
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400',
    },
    {
      id: 7,
      title: 'Overflowing Street Bin',
      location: 'High Street',
      time: '1 month ago',
      status: 'In Progress',
      statusColor: '#F59E0B',
      type: 'Voice',
      typeIcon: Mic,
      typeColor: '#3B82F6',
      points: 65,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
    },
    {
      id: 8,
      title: 'Broken Glass Hazard',
      location: 'Beach Front',
      time: '2 months ago',
      status: 'Resolved',
      statusColor: '#10B981',
      type: 'Photo',
      typeIcon: Camera,
      typeColor: '#10B981',
      points: 90,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    },
  ];

  const filters = [
    { id: 'all', label: 'All', count: allReports.length },
    { id: 'photo', label: 'Photo', count: allReports.filter(r => r.type === 'Photo').length },
    { id: 'voice', label: 'Voice', count: allReports.filter(r => r.type === 'Voice').length },
    { id: 'resolved', label: 'Resolved', count: allReports.filter(r => r.status === 'Resolved').length },
    { id: 'pending', label: 'Pending', count: allReports.filter(r => r.status !== 'Resolved').length },
  ];

  const filteredReports = allReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'photo' && report.type === 'Photo') ||
                         (selectedFilter === 'voice' && report.type === 'Voice') ||
                         (selectedFilter === 'resolved' && report.status === 'Resolved') ||
                         (selectedFilter === 'pending' && report.status !== 'Resolved');
    
    return matchesSearch && matchesFilter;
  });

  const handleReportPress = (report: any) => {
    console.log('Report pressed:', report.id);
    // Navigate to report details
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search reports..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id && styles.filterChipActive
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text style={[
                styles.filterChipText,
                selectedFilter === filter.id && styles.filterChipTextActive
              ]}>
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>
              {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''} found
            </Text>
          </View>

          <View style={styles.reportsList}>
            {filteredReports.map((report) => (
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

          {filteredReports.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No reports found</Text>
              <Text style={styles.emptyStateText}>
                Try adjusting your search or filter criteria
              </Text>
            </View>
          )}
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 4,
    marginLeft: 16,
  },
  filterChipActive: {
    backgroundColor: '#3B82F6',
  },
  filterChipText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  resultsHeader: {
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 16,
    color: '#6B7280',
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
