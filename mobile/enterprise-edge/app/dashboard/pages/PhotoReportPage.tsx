import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Camera, ArrowLeft, Send, MapPin, AlertTriangle, Image as ImageIcon, X } from 'lucide-react-native';
import Header from '../../../components/Header';
import BottomNavigation from '../../../components/BottomNavigation';

const PhotoReportPage = () => {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const handleTakePhoto = () => {
    // This would integrate with camera functionality
    // For now, we'll simulate taking a photo
    Alert.alert(
      'Camera',
      'Camera functionality would be implemented here',
      [
        {
          text: 'Simulate Photo',
          onPress: () => {
            setPhoto('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
  };

  const handleSubmitReport = () => {
    if (!photo) {
      Alert.alert('Error', 'Please take a photo of the waste issue');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please provide a description');
      return;
    }
    if (!location.trim()) {
      Alert.alert('Error', 'Please provide a location');
      return;
    }

    Alert.alert(
      'Success',
      'Your photo report has been submitted successfully!',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.photoSection}>
            <Text style={styles.sectionTitle}>Take Photo</Text>
            <Text style={styles.sectionSubtitle}>
              Capture a clear image of the waste management issue
            </Text>
            
            {!photo ? (
              <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
                <View style={styles.cameraIconContainer}>
                  <Camera size={48} color="#10B981" />
                </View>
                <Text style={styles.cameraButtonText}>Take Photo</Text>
                <Text style={styles.cameraButtonSubtext}>Tap to open camera</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.photoContainer}>
                <Image source={{ uri: photo }} style={styles.photo} />
                <TouchableOpacity style={styles.removePhotoButton} onPress={handleRemovePhoto}>
                  <X size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.retakeButton} onPress={handleTakePhoto}>
                  <Camera size={20} color="#10B981" />
                  <Text style={styles.retakeButtonText}>Retake</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.formSection}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Location</Text>
              <View style={styles.inputWrapper}>
                <MapPin size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter location (e.g., Main Street)"
                  value={location}
                  onChangeText={setLocation}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description</Text>
              <View style={styles.inputWrapper}>
                <AlertTriangle size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Describe the waste issue..."
                  value={description}
                  onChangeText={setDescription}
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReport}>
              <Send size={20} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Submit Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  photoSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  cameraButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  cameraIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cameraButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cameraButtonSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  photoContainer: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  photo: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  retakeButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    gap: 4,
  },
  retakeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  formSection: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    minHeight: 100,
  },
  tipsContainer: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 4,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default PhotoReportPage;
