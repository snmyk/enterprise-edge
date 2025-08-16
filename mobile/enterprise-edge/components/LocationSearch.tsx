import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

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
    <View style={[styles.locationSection, containerStyle]}>
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
          onChangeText={handleAddressChange}
          placeholder="Enter or edit your specific address"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default LocationSearch;