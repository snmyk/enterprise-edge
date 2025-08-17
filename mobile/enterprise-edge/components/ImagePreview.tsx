import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface ImagePreviewProps {
  imageUri: string;
  onRetake: () => void;
  onRemove: () => void;
}

const { width } = Dimensions.get('window');

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUri,
  onRetake,
  onRemove
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Photo Captured</Text>
        
      </View>
      
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUri }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay}>
          <TouchableOpacity style={styles.fullscreenButton} onPress={onRetake}>
            <Ionicons name="expand" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={onRetake}>
            <Ionicons name="camera" size={20} color="#0074D9" />
            <Text style={styles.actionText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.removeButton]} onPress={onRemove}>
            <MaterialIcons name="delete" size={20} color="#F44336" />
            <Text style={[styles.actionText, styles.removeText]}>Remove</Text>
            </TouchableOpacity>
        </View>
      
      <Text style={styles.subtitle}>Tap "Retake" to capture a new photo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#0074D9',
    backgroundColor: 'transparent',
  },
  removeButton: {
    borderColor: '#F44336',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0074D9',
    marginLeft: 4,
  },
  removeText: {
    color: '#F44336',
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  imageOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  fullscreenButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ImagePreview;