import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, ChevronRight } from 'lucide-react-native';

export default function CollectionPoints() {
  const collectionPoints = [
    {
      id: 1,
      name: 'Community Center',
      distance: '0.5 km away',
      points: '50 pts/kg',
    },
    {
      id: 2,
      name: 'Shopping Mall',
      distance: '1.2 km away',
      points: '45 pts/kg',
    },
    {
      id: 3,
      name: 'School Grounds',
      distance: '2.1 km away',
      points: '55 pts/kg',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Collection Points</Text>
      
      <View style={styles.pointsList}>
        {collectionPoints.map((point) => (
          <TouchableOpacity key={point.id} style={styles.pointItem}>
            <View style={styles.leftSection}>
              <View style={styles.iconContainer}>
                <MapPin size={20} color="#10B981" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.pointName}>{point.name}</Text>
                <Text style={styles.distance}>{point.distance}</Text>
              </View>
            </View>
            
            <View style={styles.rightSection}>
              <Text style={styles.pointsText}>{point.points}</Text>
              <ChevronRight size={16} color="#9CA3AF" />
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
  pointsList: {
    gap: 12,
  },
  pointItem: {
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
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  pointName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  distance: {
    fontSize: 14,
    color: '#6B7280',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
});