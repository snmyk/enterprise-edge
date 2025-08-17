import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, Dimensions, ScrollView } from "react-native";
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import AddPhotoButton from "./components/addPhotoButton";
import VoiceReport from "./components/voice-report";
import LocationSearch from "../../components/LocationSearch";
import { Colors } from "../../constants/Colors";

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
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header Section */}
            <View style={styles.headerSection}>
              <Text style={styles.headerTitle}>Report Waste Issue</Text>
              <Text style={styles.headerSubtitle}>
                Help keep our community clean by reporting waste issues
              </Text>
            </View>

            {/* Progress Indicator */}
            {/* <View style={styles.progressContainer}>
              <View style={styles.progressStep}>
                <View style={[styles.progressDot, (hasPhoto || hasVoiceNote) && styles.progressDotActive]} />
                <Text style={styles.progressText}>Add Media</Text>
              </View>
              <View style={[styles.progressLine, shouldShowLocationSearch && styles.progressLineActive]} />
              <View style={styles.progressStep}>
                <View style={[styles.progressDot, shouldShowLocationSearch && styles.progressDotActive]} />
                <Text style={styles.progressText}>Location</Text>
              </View>
            </View> */}

            {/* Content Sections */}
            <View style={styles.contentContainer}>
              <AddPhotoButton
                onImageCaptured={handleImageCaptured}
                onImageRemoved={handleImageRemoved}
                imageUri={capturedImageUri}
                locationData={locationData}
              />

              {!shouldShowLocationSearch && (
                <VoiceReport onVoiceRecorded={handleVoiceRecorded} />
              )}

              {/* Location Section - Only show after photo or voice recording */}
              {shouldShowLocationSearch && (
                <View style={styles.locationSection}>
                  <Text style={styles.sectionTitle}>Location Details</Text>
                  <Text style={styles.sectionSubtitle}>
                    Please provide the location where you found the waste issue
                  </Text>
                  <LocationSearch
                    onLocationChange={handleLocationChange}
                    initialAddress={locationData.address}
                    containerStyle={styles.locationContainer}
                  />
                </View>
              )}
              {capturedImageUri && locationData.address && (
                <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Ionicons name="warning-outline" size={20} color="white" style={styles.icon} />
                <Text style={styles.text}>Report Waste Issue</Text>
              </TouchableOpacity>
              )}
            </View>
          </ScrollView>
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
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Add padding to prevent content from being hidden behind sticky navigation
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: Colors.light.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#687076',
    textAlign: 'center',
    lineHeight: 22,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E1E5E9',
    marginBottom: 8,
  },
  progressDotActive: {
    backgroundColor: Colors.light.tint,
  },
  progressText: {
    fontSize: 12,
    color: '#687076',
    fontWeight: '500',
  },
  progressLine: {
    height: 2,
    flex: 1,
    backgroundColor: '#E1E5E9',
    marginHorizontal: 8,
  },
  progressLineActive: {
    backgroundColor: Colors.light.tint,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  locationSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#687076',
    marginBottom: 16,
    lineHeight: 20,
  },
  locationContainer: {
    marginTop: 8,
  },
  button: {
    backgroundColor: "#28a745", 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 6,
    width: "100%",
    marginTop: 13,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});