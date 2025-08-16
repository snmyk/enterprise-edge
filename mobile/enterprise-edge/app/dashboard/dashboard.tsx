import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, Dimensions } from "react-native";
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import AddPhotoButton from "./components/addPhotoButton";
import VoiceReport from "./components/voice-report";
import LocationSearch from "../../components/LocationSearch"; 

export default function DashBoard() {
  const [activeTab, setActiveTab] = useState('Home');
  const [locationData, setLocationData] = useState<{
    location: Location.LocationObject | null;
    address: string;
  }>({
    location: null,
    address: ''
  });

  // State to track if user has taken a photo or recorded voice
  const [hasPhoto, setHasPhoto] = useState(false);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [capturedImageUri, setCapturedImageUri] = useState<string | null>(null);

  // Show location search if user has either taken a photo or recorded voice
  const shouldShowLocationSearch = hasPhoto || hasVoiceNote;

  // Handle location changes from LocationSearch component
  const handleLocationChange = (location: Location.LocationObject | null, address: string) => {
    setLocationData({ location, address });
  };

  // Handle photo capture
  const handleImageCaptured = (uri: string) => {
    setCapturedImageUri(uri);
    setHasPhoto(true);
  };

  // Handle photo removal
  const handleImageRemoved = () => {
    setCapturedImageUri(null);
    setHasPhoto(false);
  };

  const handleVoiceRecorded = () => {
    setHasVoiceNote(true);
  };

  const renderPageContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <>
            <AddPhotoButton 
              onImageCaptured={handleImageCaptured}
              onImageRemoved={handleImageRemoved}
              imageUri={capturedImageUri}
            />

            {!shouldShowLocationSearch && (
              <VoiceReport onVoiceRecorded={handleVoiceRecorded} />
            )}

            {/* Location Section - Only show after photo or voice recording */}
            {shouldShowLocationSearch && (
              <LocationSearch
                onLocationChange={handleLocationChange}
                initialAddress={locationData.address}
                containerStyle={styles.locationContainer}
              />
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Page Content */}
      {renderPageContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'red',
    paddingBottom: 80, // Add padding to prevent content from being hidden behind sticky navigation
    height: '100%',
  },
  locationContainer: {
    marginHorizontal: 20, // Add some horizontal margin if needed
  },
});