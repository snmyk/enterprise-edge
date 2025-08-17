
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, StatusBar, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import ImagePreview from '../../../components/ImagePreview';

interface AddPhotoButtonProps {
  onPress?: () => void;
  imageUri?: string | null;
  onImageCaptured?: (uri: string) => void;
  onImageRemoved?: () => void;
}

const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = Platform.OS === 'ios' ? height : height + StatusBar.currentHeight || 0;

const AddPhotoButton: React.FC<AddPhotoButtonProps> = ({
  onPress,
  imageUri: initialImageUri,
  onImageCaptured,
  onImageRemoved
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(initialImageUri || null);
  const [facing, setFacing] = useState<"back" | "front">("back");
  const [originalStatusBarHidden, setOriginalStatusBarHidden] = useState<boolean | null>(null);

  const cameraRef = useRef<CameraView>(null);

  // Store original status bar state when component mounts
  useEffect(() => {
    const getStatusBarState = async () => {
      const hidden = StatusBar.currentHeight === 0;
      setOriginalStatusBarHidden(hidden);
    };
    getStatusBarState();
  }, []);

  // Restore original status bar state when component unmounts
  useEffect(() => {
    return () => {
      if (originalStatusBarHidden !== null) {
        StatusBar.setHidden(originalStatusBarHidden);
      }
    };
  }, [originalStatusBarHidden]);

  const handlePress = () => {
    if (onPress) onPress();
    if (permission?.granted) {
      // Hide status bar when opening camera for full immersive experience
      StatusBar.setHidden(true);
      setShowCamera(true);
    } else {
      requestPermission();
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
      setShowCamera(false);
      // Show status bar again when closing camera
      StatusBar.setHidden(false);
      if (onImageCaptured) onImageCaptured(photo.uri);
    }
  };

  const retakePicture = () => {
    if (permission?.granted) {
      // Hide status bar when opening camera
      StatusBar.setHidden(true);
      setShowCamera(true);
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

  const closeCamera = () => {
    setShowCamera(false);
    // Show status bar again when closing camera
    StatusBar.setHidden(false);
  };

  if (!permission) return <View />;
  
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need your permission to use the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
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
      />
    );
  }

  return (
    <>
      {!showCamera && !imageUri && (
        <View style={styles.container}>
          <View style={styles.dottedBox}>
            <Text style={styles.title}>Add Photo (Optional)</Text>
            <Text style={styles.subtitle}>Take a photo of the waste issue</Text>

            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Ionicons name="camera" size={24} color="white" />
              <Text style={styles.buttonText}>Open Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Full Page Camera - Using fixed positioning to cover the entire screen */}
      {showCamera && (
        <View style={styles.fullScreenOverlay}>
          <CameraView
            style={styles.fullScreenCamera}
            ref={cameraRef}
            facing={facing}
          >
            <View style={styles.cameraControls}>
              {/* Close Button */}
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={closeCamera}
              >
                <Ionicons name="close" size={30} color="white" />
              </TouchableOpacity>

              {/* Flip Camera Button */}
              <TouchableOpacity style={styles.flipButton} onPress={toggleCamera}>
                <Ionicons name="camera-reverse" size={30} color="white" />
              </TouchableOpacity>

              {/* Camera Instructions */}
              <View style={styles.instructionsContainer}>
                <Text style={styles.instructionsText}>
                  Position the waste issue in the center and tap the capture button
                </Text>
              </View>

              {/* Capture Button */}
              <View style={styles.captureContainer}>
                <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                  <View style={styles.captureButtonInner} />
                </TouchableOpacity>
              </View>
            </View>
          </CameraView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { 
    margin: 16
  },
  dottedBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
  },
  title: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginBottom: 4, 
    color: "#333" 
  },
  subtitle: { 
    fontSize: 13, 
    color: "#666", 
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0074D9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  buttonText: { 
    color: "white", 
    fontSize: 14, 
    fontWeight: "600" 
  },
  permissionContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    padding: 20,
  },
  permissionText: { 
    fontSize: 16, 
    marginBottom: 16, 
    color: "#333",
    textAlign: 'center',
  },
  permissionButton: { 
    backgroundColor: '#0074D9', 
    paddingVertical: 12,
    paddingHorizontal: 24, 
    borderRadius: 8,
  },
  permissionButtonText: { 
    color: "white", 
    fontWeight: "600" 
  },

  // Full Screen Camera Styles - Enhanced for true full screen
  fullScreenOverlay: {
    position: 'fixed', // Use fixed positioning to ensure it covers everything
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999, // Very high z-index to ensure it's above everything
    backgroundColor: 'black', // Ensures no transparent areas
  },
  fullScreenCamera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cameraControls: {
    flex: 1,
    backgroundColor: "transparent",
  },
  closeButton: { 
    position: "absolute", 
    top: 50, 
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 10,
    zIndex: 10000,
  },
  flipButton: { 
    position: "absolute", 
    top: 50, 
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 10,
    zIndex: 10000,
  },
  instructionsContainer: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 10000,
  },
  instructionsText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  captureContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10000,
  },
  captureButton: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 40,
    padding: 4,
    borderWidth: 3,
    borderColor: 'white',
  },
  captureButtonInner: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: "white" 
  },
});

export default AddPhotoButton;
