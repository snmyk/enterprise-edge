import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TriangleAlert as AlertTriangle, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface RecentReportsProps {
  showBackButton?: boolean; // Optional prop to control back button visibility
  onBack?: () => void; // Optional custom back handler
}

export default function RecentReports({ showBackButton = false, onBack }: RecentReportsProps) {
  const router = useRouter();

  const reports = [
    {
      id: 1,
      title: 'Overflowing Bin',
      location: 'Main Street',
      time: '2 hours ago',
      status: 'In Progress',
      statusColor: '#F59E0B',
    },
    {
      id: 2,
      title: 'Broken Container',
      location: 'Park Avenue',
      time: '1 day ago',
      status: 'Resolved',
      statusColor: '#10B981',
    },
    {
      id: 3,
      title: 'Recycling Bin Full',
      location: 'Downtown Mall',
      time: '1 week ago',
      status: 'Resolved',
      statusColor: '#10B981',
    },
  ];

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Navigate back to ReportsScreen
      router.push('/(tabs)/ReportsScreen'); // Adjust the route based on your routing structure
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={20} color="#111827" />
          </TouchableOpacity>
        )}
        <Text style={[styles.title, showBackButton && styles.titleWithBack]}>
          Recent Reports
        </Text>
      </View>
      
      <View style={styles.reportsList}>
        {reports.map((report) => (
          <TouchableOpacity key={report.id} style={styles.reportItem}>
            <View style={styles.leftSection}>
              <View style={styles.iconContainer}>
                <AlertTriangle size={20} color="#F59E0B" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportLocation}>
                  {report.location} • {report.time}
                </Text>
              </View>
            </View>
            
            <View style={styles.rightSection}>
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
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
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
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  titleWithBack: {
    flex: 1, // Take remaining space when back button is present
  },
  reportsList: {
    gap: 12,
  },
  reportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  reportLocation: {
    fontSize: 14,
    color: '#6B7280',
  },
  rightSection: {
    alignItems: 'flex-end',
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
});