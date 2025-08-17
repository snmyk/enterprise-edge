import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

export default function PointsScreen() {
  const collectionPoints = [
    {
      id: 1,
      name: 'Community Center',
      distance: '0.5 km away',
      hours: '8:00 AM - 5:00 PM',
      address: '123 Main Road, Township',

      image: 'https://www.factchecker.in/h-upload/2022/08/08/1500x900_769415-solid-waste-management.webp'
    },
    {
      id: 2,
      name: 'Southside Refuse Site',
      distance: '1.2 km away',
      hours: '9:00 AM - 9:00 PM',
      address: '456 Mall Street, City Center',

      image: 'https://datatopics.worldbank.org/what-a-waste/img/v3_plastic_waste_bottle_recycling.jpg'
    },
    {
      id: 3,
      name: 'North Zone Waste Facility',
      distance: '2.1 km away',
      hours: '7:00 AM - 10:00 PM',
      address: '789 University Blvd, Campus',

      image: 'https://datatopics.worldbank.org/what-a-waste/img/v3_waste_disposal_site.jpg'
    }
  ];
  const [filteredPoints, setFilteredPoints] = useState(collectionPoints);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text: string) => {
    setSearchText(text);

    const filtered = collectionPoints.filter((point) =>
      point.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPoints(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header currentPoints={1250} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Collection Points</Text>
            <Text style={styles.subtitle}>Find nearby recycling locations and earn points.</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search collection points..."
                placeholderTextColor="#9CA3AF"
                value={searchText}
                onChangeText={handleSearch}
              />
            </View>
          </View>

          {/* Collection Points List */}
          <View style={styles.pointsList}>
            {filteredPoints.map((point) => (
              <View key={point.id} style={styles.pointCard}>
                <Image source={{ uri: point.image }} style={styles.pointImage} />
                <View style={styles.pointInfo}>
                  <Text style={styles.pointName}>{point.name}</Text>
                  <View style={styles.pointDetails}>
                    <View style={styles.detailRow}>
                      <Ionicons name="location" size={16} color="#6B7280" />
                      <Text style={styles.detailText}>{point.distance}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons name="time" size={16} color="#6B7280" />
                      <Text style={styles.detailText}>{point.hours}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons name="home" size={16} color="#6B7280" />
                      <Text style={styles.detailText}>{point.address}</Text>
                    </View>
                  </View>
                </View>

              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  brandText: {
    flexDirection: 'column',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: -2,
  },
  pointsSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  pointsIcon: {
    marginRight: 6,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400E',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentWrapper: {
    flex: 1,
  },
  titleSection: {
    marginTop: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  pointsList: {
    marginBottom: 20,
  },
  pointCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  pointImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  pointInfo: {
    padding: 20,
  },
  pointName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  pointDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
  },

});