import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ReportPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Report Waste Issue</Text>

      <View style={styles.reportOptions}>
        <TouchableOpacity style={styles.reportCard}>
          <MaterialIcons name="photo-camera" size={48} color="#4CAF50" />
          <Text style={styles.reportTitle}>Photo Report</Text>
          <Text style={styles.reportDescription}>Take a photo of the waste issue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportCard}>
          <MaterialIcons name="mic" size={48} color="#2196F3" />
          <Text style={styles.reportTitle}>Voice Report</Text>
          <Text style={styles.reportDescription}>Record audio description</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportCard}>
          <MaterialIcons name="edit" size={48} color="#FF9800" />
          <Text style={styles.reportTitle}>Text Report</Text>
          <Text style={styles.reportDescription}>Write detailed description</Text>
        </TouchableOpacity>
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
  reportOptions: {
    flex: 1,
    justifyContent: 'center',
  },
  reportCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  reportDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default ReportPage;
