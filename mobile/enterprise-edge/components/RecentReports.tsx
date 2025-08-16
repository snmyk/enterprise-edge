import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function RecentReports() {
  const reports = [
    {
      id: 1,
      title: 'Overflowing Bin',
      location: 'Main Street',
      time: '2 hours ago',
      status: 'In Progress',
      statusColor: '#F59E0B',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Reports</Text>
      
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
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