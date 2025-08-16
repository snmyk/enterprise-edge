import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import AddPhotoButton from "./components/addPhotoButton";
import VoiceReport from "./components/voice-report";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import PointsPage from "./pages/PointsPage";
import RewardsPage from "./pages/RewardsPage";
import ProfilePage from "./pages/ProfilePage";

export default function DashBoard() {

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<string>('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to get your current location.');
        return;
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      setIsLoadingLocation(true);

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(currentLocation);

      // Get address from coordinates
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const addressParts = reverseGeocode[0];
        const fullAddress = [
          addressParts.street,
          addressParts.city,
          addressParts.region,
          addressParts.country
        ].filter(Boolean).join(', ');
        setAddress(fullAddress);
      }

    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get current location. Please try again.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const clearLocation = () => {
    setLocation(null);
    setAddress('');
  };

  const renderPageContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <>
            <AddPhotoButton />
            <VoiceReport />

            {/* Location Section */}
            <View style={styles.locationSection}>
              <Text style={styles.sectionTitle}>Location Information</Text>

              {/* Location Button */}
              <TouchableOpacity
                style={styles.locationButton}
                onPress={getCurrentLocation}
                disabled={isLoadingLocation}
              >
                <MaterialIcons
                  name="my-location"
                  size={20}
                  color="white"
                />
                <Text style={styles.locationButtonText}>
                  {isLoadingLocation ? 'Getting Location...' : 'Get Current Location'}
                </Text>
              </TouchableOpacity>

              {/* Location Display */}
              {location && (
                <View style={styles.locationInfo}>
                  <Text style={styles.locationLabel}>Coordinates:</Text>
                  <Text style={styles.locationText}>
                    Lat: {location.coords.latitude.toFixed(6)}
                  </Text>
                  <Text style={styles.locationText}>
                    Long: {location.coords.longitude.toFixed(6)}
                  </Text>
                  <Text style={styles.locationText}>
                    Accuracy: {location.coords.accuracy?.toFixed(2)}m
                  </Text>

                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={clearLocation}
                  >
                    <Text style={styles.clearButtonText}>Clear Location</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Address Input */}
              <View style={styles.addressSection}>
                <Text style={styles.addressLabel}>Specific Address:</Text>
                <TextInput
                  style={styles.addressInput}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Enter or edit your specific address"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </>
        );
      case 'Report':
        return <ReportPage />;
      case 'Points':
        return <PointsPage />;
      case 'Rewards':
        return <RewardsPage />;
      case 'Profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <View style={styles.container}>
      {/* EcoReport Header */}
      <View style={styles.ecoHeader}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <MaterialIcons name="eco" size={32} color="#4CAF50" />
          </View>
          <View style={styles.appInfo}>
            <Text style={styles.appName}>EcoReport</Text>
            <Text style={styles.appSubtitle}>Waste Management System</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.pointsContainer}>
            <MaterialIcons name="monetization-on" size={24} color="#FFD700" />
            <Text style={styles.pointsText}>1250</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <MaterialIcons name="account-circle" size={32} color="#9E9E9E" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Rewards Section */}
      <View style={styles.rewardsSection}>
        <View style={styles.rewardsHeader}>
          <Text style={styles.rewardsTitle}>Your Rewards</Text>
          <View style={styles.currentPoints}>
            <MaterialIcons name="monetization-on" size={20} color="#FFD700" />
            <Text style={styles.currentPointsText}>1250 pts</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Progress to next reward</Text>
          <Text style={styles.progressValue}>1250/1500</Text>
        </View>

        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>

        <View style={styles.rewardOptions}>
          <TouchableOpacity style={[styles.rewardCard, styles.airtimeCard]}>
            <MaterialIcons name="phone-iphone" size={24} color="#FF9800" />
            <Text style={styles.rewardName}>Airtime</Text>
            <Text style={styles.rewardCost}>500 pts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.rewardCard, styles.voucherCard]}>
            <MaterialIcons name="card-giftcard" size={24} color="#2196F3" />
            <Text style={styles.rewardName}>Voucher</Text>
            <Text style={styles.rewardCost}>1000 pts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.rewardCard, styles.groceriesCard]}>
            <MaterialIcons name="shopping-bag" size={24} color="#4CAF50" />
            <Text style={styles.rewardName}>Groceries</Text>
            <Text style={styles.rewardCost}>1500 pts</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Page Content */}
      {renderPageContent()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('Home')}
        >
          <Ionicons
            name="home"
            size={24}
            color={activeTab === 'Home' ? '#4CAF50' : '#9E9E9E'}
          />
          <Text style={[styles.navText, activeTab === 'Home' && styles.activeNavText]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('Report')}
        >
          <FontAwesome
            name="exclamation-triangle"
            size={24}
            color={activeTab === 'Report' ? '#4CAF50' : '#9E9E9E'}
          />
          <Text style={[styles.navText, activeTab === 'Report' && styles.activeNavText]}>
            Report
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('Points')}
        >
          <MaterialIcons
            name="location-on"
            size={24}
            color={activeTab === 'Points' ? '#4CAF50' : '#9E9E9E'}
          />
          <Text style={[styles.navText, activeTab === 'Points' && styles.activeNavText]}>
            Points
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('Rewards')}
        >
          <MaterialIcons
            name="card-giftcard"
            size={24}
            color={activeTab === 'Rewards' ? '#4CAF50' : '#9E9E9E'}
          />
          <Text style={[styles.navText, activeTab === 'Rewards' && styles.activeNavText]}>
            Rewards
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('Profile')}
        >
          <Ionicons
            name="person"
            size={24}
            color={activeTab === 'Profile' ? '#4CAF50' : '#9E9E9E'}
          />
          <Text style={[styles.navText, activeTab === 'Profile' && styles.activeNavText]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 80, // Add padding to prevent content from being hidden behind sticky navigation
  },
  // EcoReport Header Styles
  ecoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: 12,
  },
  appInfo: {
    flexDirection: 'column',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  appSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  profileButton: {
    padding: 2,
  },

  // Rewards Section Styles
  rewardsSection: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 25,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rewardsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  currentPoints: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPointsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 5,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '83%', // 1250/1500 = 83.33%
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  rewardOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rewardCard: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  airtimeCard: {
    backgroundColor: '#FFF8E1',
  },
  voucherCard: {
    backgroundColor: '#E3F2FD',
  },
  groceriesCard: {
    backgroundColor: '#E8F5E8',
  },
  rewardName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  rewardCost: {
    fontSize: 12,
    color: '#666',
  },

  // Bottom Navigation Styles
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 8,
    zIndex: 1000,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 4,
    fontWeight: '500',
  },
  activeNavText: {
    color: '#4CAF50',
    fontWeight: '600',
  },



  locationSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  locationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  locationInfo: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  locationLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  clearButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  addressSection: {
    marginTop: 10,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  addressInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 80,
  },
});