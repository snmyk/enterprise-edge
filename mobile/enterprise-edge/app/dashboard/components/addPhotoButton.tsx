import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';


interface AddPhotoButtonProps {
  onPress?: () => void;
  imageUri?: string | null;
  onImageCaptured?: (uri: string) => void;
}

const { width, height } = Dimensions.get('window');

const AddPhotoButton: React.FC<AddPhotoButtonProps> = ({
  onPress,
  imageUri: initialImageUri,
  onImageCaptured
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(initialImageUri || null);
  const [facing, setFacing] = useState<"back" | "front">("back");

  const cameraRef = useRef<CameraView>(null);

  const handlePress = () => {
    if (onPress) onPress();
    if (permission?.granted) {
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
      if (onImageCaptured) onImageCaptured(photo.uri);
    }
  };

  const toggleCamera = () => {
    setFacing(facing === "back" ? "front" : "back");
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

  return (
    <>
      {!showCamera && (
        <View style={styles.container}>
          <View style={styles.dottedBox}>
            <Text style={styles.title}>Add Photo (Optional)</Text>
            <Text style={styles.subtitle}>Take a photo of the waste issue</Text>

            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <>
                <Ionicons name="camera" size={24} color="white" />
                <Text style={styles.buttonText}>Open Camera</Text>
              </>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Full Page Camera */}
      {showCamera && (
        <View style={styles.fullScreenCamera}>
          <CameraView
            style={styles.fullScreenCamera}
            ref={cameraRef}
            facing={facing}
          >
            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeButton} onPress={() => setShowCamera(false)}>
                <Ionicons name="close" size={30} color="white" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.flipButton} onPress={toggleCamera}>
                <Ionicons name="camera-reverse" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { margin: 16 },
  dottedBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 4, color: "#333" },
  subtitle: { fontSize: 13, color: "#666", marginBottom: 11 },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    width: "80%",
  },
  buttonText: { color: "white", fontSize: 14, fontWeight: "600" },
  imagePreview: { width: "50%", height: 100, borderRadius: 5 },
  permissionContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  permissionText: { fontSize: 16, marginBottom: 10, color: "#333" },
  permissionButton: { backgroundColor: 'blue', padding: 10, borderRadius: 5 },
  permissionButtonText: { color: "white", fontWeight: "600" },

  fullScreenCamera: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    width: width,
    height: height,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 40,
  },
  captureButton: {
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 50,
    padding: 15,
    marginHorizontal: 20,
  },
  captureButtonInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: "white" },
  closeButton: { position: "absolute", top: 40, right: 20 },
  flipButton: { position: "absolute", top: 40, left: 20 },
});

export default AddPhotoButton;
