import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface ImagePreviewProps {
  imageUri: string;
  onRetake: () => void;
  onRemove: () => void;
  onUpload?: () => Promise<void>;
  isUploading?: boolean;
  locationData?: {
    location: any;
    address: string;
  } | null;
}

const { width } = Dimensions.get('window');

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUri,
  onRetake,
  onRemove,
  onUpload,
  isUploading = false,
  locationData
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.previewCard}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={24} color={Colors.light.tint} />
          </View>
          <Text style={styles.title}>Photo Captured</Text>
          <Text style={styles.subtitle}>Your photo has been successfully captured</Text>
        </View>
        
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUri }} 
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <TouchableOpacity style={styles.fullscreenButton} onPress={onRetake}>
              <Ionicons name="expand" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location Information */}
        {locationData && (
          <View style={styles.locationInfo}>
            <View style={styles.locationHeader}>
              <Ionicons name="location" size={16} color={Colors.light.tint} />
              <Text style={styles.locationTitle}>Location</Text>
            </View>
            <Text style={styles.locationText}>
              {locationData.address || 'Location not available'}
            </Text>
            {locationData.location && (
              <Text style={styles.coordinatesText}>
                {locationData.location.coords.latitude.toFixed(6)}, {locationData.location.coords.longitude.toFixed(6)}
              </Text>
            )}
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={onRetake}>
            <Ionicons name="camera" size={18} color={Colors.light.tint} />
            <Text style={styles.actionText}>Retake Photo</Text>
          </TouchableOpacity>
          
          {onUpload && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.uploadButton, isUploading && styles.uploadingButton]} 
              onPress={onUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <Ionicons name="cloud-upload" size={18} color="white" />
              ) : (
                <Ionicons name="cloud-upload-outline" size={18} color="white" />
              )}
              <Text style={[styles.actionText, styles.uploadText]}>
                {isUploading ? 'Uploading...' : 'Upload Photo'}
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={[styles.actionButton, styles.removeButton]} onPress={onRemove}>
            <MaterialIcons name="delete-outline" size={18} color="#F44336" />
            <Text style={[styles.actionText, styles.removeText]}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  previewCard: {
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
    marginBottom: 20,
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
  imageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E1E5E9',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  imageOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  fullscreenButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 16,
    padding: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInfo: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E1E5E9',
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  locationText: {
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  coordinatesText: {
    fontSize: 12,
    color: '#687076',
    fontFamily: 'monospace',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E5E9',
    backgroundColor: '#F8F9FA',
    gap: 6,
  },
  uploadButton: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  uploadingButton: {
    backgroundColor: '#9BA1A6',
    borderColor: '#9BA1A6',
  },
  removeButton: {
    borderColor: '#FFEBEE',
    backgroundColor: '#FFF5F5',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.tint,
  },
  uploadText: {
    color: 'white',
  },
  removeText: {
    color: '#F44336',
  },
});

export default ImagePreview;