import { , Image,  } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import ImagePreview from '../../../components/ImagePreview';
import { Colors } from '../../../constants/Colors';

interface AddPhotoButtonProps {
  onPress?: () => void;
  imageUri?: string | null;
  onImageCaptured?: (uri: string) => void;
  onImageRemoved?: () => void;
  locationData?: {
    location: any;
    address: string;
  } | null;
}

const { width, height } = Dimensions.get('window');

const AddPhotoButton: React.FC<AddPhotoButtonProps> = ({
  onPress,
  imageUri: initialImageUri,
  onImageCaptured,
  onImageRemoved,
  locationData
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(initialImageUri || null);
  const [facing, setFacing] = useState<"back" | "front">("back");
  const [isUploading, setIsUploading] = useState(false);

  const cameraRef = useRef<CameraView>(null);

  const handlePress = () => {
    if (onPress) onPress();
    if (permission?.granted) {
      setShowCamera(true);
      // Hide status bar for full-screen camera
      StatusBar.setHidden(true);
    } else {
      requestPermission();
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        setImageUri(photo.uri);
        setShowCamera(false);
        
        // Show status bar again
        StatusBar.setHidden(false);
        
        if (onImageCaptured) onImageCaptured(photo.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const retakePicture = () => {
    if (permission?.granted) {
      setShowCamera(true);
      // Hide status bar for full-screen camera
      StatusBar.setHidden(true);
    } else {
      requestPermission();
    }
  };

  const removePicture = () => {
    setImageUri(null);
    if (onImageRemoved) onImageRemoved();
  };

  const toggleCamera = () => {
    setFacing(facing === "back" ? "front" : "back");
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
    // Show status bar again
    StatusBar.setHidden(false);
  };

  const uploadPicture = async () => {
    if (!imageUri) return;
    
    setIsUploading(true);
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically upload to your server
      console.log('Uploading image:', imageUri);
      
      // Show success message or handle upload completion
      alert('Picture uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!permission) return <View />;
  
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionCard}>
          <Ionicons name="camera-outline" size={48} color={Colors.light.tint} style={styles.permissionIcon} />
          <Text style={styles.permissionTitle}>Camera Permission Required</Text>
          <Text style={styles.permissionText}>
            We need access to your camera to take photos of waste issues for reporting purposes.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Show image preview if image exists
  if (imageUri && !showCamera) {
    return (
      <ImagePreview 
        imageUri={imageUri}
        onRetake={retakePicture}
        onRemove={removePicture}
        onUpload={uploadPicture}
        isUploading={isUploading}
        locationData={locationData}
      />
    );
  }

  // Full Page Camera - This should cover the entire screen
  if (showCamera) {
    return (
      <View style={styles.fullScreenCamera}>
        <CameraView
          style={styles.cameraView}
          ref={cameraRef}
          facing={facing}
        >
          <View style={styles.cameraControls}>
            {/* Header Controls */}
            <View style={styles.cameraHeader}>
              <TouchableOpacity 
                style={styles.headerButton} 
                onPress={handleCloseCamera}
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.headerButton} onPress={toggleCamera}>
                <Ionicons name="camera-reverse" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* Camera Instructions */}
            <View style={styles.instructionsContainer}>
              <View style={styles.instructionsCard}>
                <Ionicons name="information-circle-outline" size={20} color="white" />
                <Text style={styles.instructionsText}>
                  Position the waste issue in the center and tap the capture button
                </Text>
              </View>
            </View>

            {/* Capture Button */}
            <View style={styles.captureContainer}>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
              <Text style={styles.captureText}>Tap to capture</Text>
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  // Default view when no camera and no image
  return (
    <View style={styles.container}>
      <View style={styles.photoCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="camera-outline" size={32} color={Colors.light.tint} />
        </View>
        <Text style={styles.title}>Add Photo</Text>
        <Text style={styles.subtitle}>
          Take a photo of the waste issue to help us understand the problem better
        </Text>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Ionicons name="camera" size={20} color="white" />
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    marginBottom: 16,
  },
  photoCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
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
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: { 
    fontSize: 18, 
    fontWeight: "600", 
    marginBottom: 8, 
    color: Colors.light.text,
    textAlign: 'center',
  },
  subtitle: { 
    fontSize: 14, 
    color: '#687076', 
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minWidth: 160,
    shadowColor: Colors.light.tint,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: { 
    color: "white", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  permissionContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    padding: 20,
  },
  permissionCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  permissionIcon: {
    marginBottom: 16,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: { 
    fontSize: 16, 
    marginBottom: 24, 
    color: '#687076',
    textAlign: 'center',
    lineHeight: 22,
  },
  permissionButton: { 
    backgroundColor: Colors.light.tint, 
    paddingVertical: 14,
    paddingHorizontal: 32, 
    borderRadius: 12,
    shadowColor: Colors.light.tint,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  permissionButtonText: { 
    color: "white", 
    fontWeight: "600",
    fontSize: 16,
  },

  // Full Screen Camera Styles
  fullScreenCamera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    zIndex: 9999,
    backgroundColor: 'black',
  },
  cameraView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cameraControls: {
    flex: 1,
    backgroundColor: "transparent",
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
  },
  headerButton: { 
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 12,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionsContainer: {
    position: 'absolute',
    top: 140,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  instructionsCard: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  instructionsText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    flex: 1,
    lineHeight: 20,
  },
  captureContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 44,
    padding: 6,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  captureButtonInner: { 
    width: 76, 
    height: 76, 
    borderRadius: 38, 
    backgroundColor: "white" 
  },
  captureText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default AddPhotoButton;