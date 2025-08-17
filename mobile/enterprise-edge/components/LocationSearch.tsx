import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Colors } from '../constants/Colors';

interface LocationSearchProps {
  onLocationChange?: (location: Location.LocationObject | null, address: string) => void;
  initialAddress?: string;
  containerStyle?: any;
}

interface LocationData {
  location: Location.LocationObject | null;
  address: string;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onLocationChange,
  initialAddress = '',
  containerStyle
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<string>(initialAddress);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    // Notify parent component when location or address changes
    // Only call if there's actually a change to prevent infinite loops
    if (onLocationChange) {
      onLocationChange(location, address);
    }
  }, [location, address]); // Remove onLocationChange from dependencies

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

  const handleAddressChange = (newAddress: string) => {
    setAddress(newAddress);
  };

  return (
    <View style={[styles.locationCard, containerStyle]}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="location" size={24} color={Colors.light.tint} />
        </View>
        <Text style={styles.title}>Location Details</Text>
        <Text style={styles.subtitle}>
          Provide the exact location where you found the waste issue
        </Text>
      </View>

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
          <View style={styles.locationHeader}>
            <Text style={styles.locationLabel}>Current Location</Text>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearLocation}
            >
              <Ionicons name="close-circle" size={20} color="#F44336" />
            </TouchableOpacity>
          </View>
          <View style={styles.coordinatesContainer}>
            <View style={styles.coordinateItem}>
              <Text style={styles.coordinateLabel}>Latitude</Text>
              <Text style={styles.coordinateValue}>
                {location.coords.latitude.toFixed(6)}
              </Text>
            </View>
            <View style={styles.coordinateItem}>
              <Text style={styles.coordinateLabel}>Longitude</Text>
              <Text style={styles.coordinateValue}>
                {location.coords.longitude.toFixed(6)}
              </Text>
            </View>
            <View style={styles.coordinateItem}>
              <Text style={styles.coordinateLabel}>Accuracy</Text>
              <Text style={styles.coordinateValue}>
                {location.coords.accuracy?.toFixed(2)}m
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Address Input */}
      <View style={styles.addressSection}>
        <Text style={styles.addressLabel}>Specific Address</Text>
        <Text style={styles.addressSubtitle}>
          Add or edit the specific address details
        </Text>
        <TextInput
          style={styles.addressInput}
          value={address}
          onChangeText={handleAddressChange}
          placeholder="Enter the exact address where you found the waste issue..."
          placeholderTextColor="#9BA1A6"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: '#E1E5E9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#687076',
    textAlign: 'center',
    lineHeight: 20,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: Colors.light.tint,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  locationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  locationInfo: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E1E5E9',
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  clearButton: {
    padding: 4,
  },
  coordinatesContainer: {
    gap: 8,
  },
  coordinateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  coordinateLabel: {
    fontSize: 14,
    color: '#687076',
    fontWeight: '500',
  },
  coordinateValue: {
    fontSize: 14,
    color: Colors.light.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: '500',
  },
  addressSection: {
    marginTop: 4,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: Colors.light.text,
  },
  addressSubtitle: {
    fontSize: 14,
    color: '#687076',
    marginBottom: 12,
    lineHeight: 20,
  },
  addressInput: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E1E5E9',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.light.text,
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default LocationSearch;