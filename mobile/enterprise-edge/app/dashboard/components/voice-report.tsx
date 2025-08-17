import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Alert, Animated, Easing } from 'react-native';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';
 
type Recording = {
  id: string;
  timestamp: Date;
  duration: number;
  transcript: string;
  language: string;
  audioUri?: string;
};
 
interface VoiceReportProps {
  onVoiceRecorded?: () => void; // Add callback prop
}
 
const languages = [
  { code: 'en-US', name: 'English' },
  { code: 'af-ZA', name: 'Afrikaans' },
  { code: 'zu-ZA', name: 'Zulu' },
  { code: 'xh-ZA', name: 'Xhosa' },
  { code: 'st-ZA', name: 'Sotho' }
];
 
// Sound wave bar component
const SoundWaveBar = ({ height, animationValue }: { height: number, animationValue: Animated.Value }) => {
  const animatedHeight = animationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [height * 0.3, height, height * 0.3],
  });
 
  return (
    <Animated.View
      style={{
        width: 4,
        height: animatedHeight,
        backgroundColor: '#0074D9',
        borderRadius: 2,
        marginHorizontal: 2,
      }}
    />
  );
};
 
const VoiceReport: React.FC<VoiceReportProps> = ({ onVoiceRecorded }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
 
  // Sound animation refs
  const soundAnimations = useRef<Animated.Value[]>([]);
  const soundAnimationLoop = useRef<Animated.CompositeAnimation | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
 
  // Initialize sound wave animations
  useEffect(() => {
    soundAnimations.current = Array(10).fill(0).map(() => new Animated.Value(0));
  }, []);
 
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      if (soundAnimationLoop.current) {
        soundAnimationLoop.current.stop();
      }
    };
  }, [recording]);
 
  // Start sound wave animation
  const startSoundAnimation = () => {
    // Stop any existing animation
    if (soundAnimationLoop.current) {
      soundAnimationLoop.current.stop();
    }
 
    // Create animations for each bar with random timing
    const animations = soundAnimations.current.map((anim, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 500 + Math.random() * 500, // Random duration between 500-1000ms
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 500 + Math.random() * 500,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      );
    });
 
    // Start all animations
    soundAnimationLoop.current = Animated.parallel(animations);
    soundAnimationLoop.current.start();
  };
 
  // Stop sound wave animation
  const stopSoundAnimation = () => {
    if (soundAnimationLoop.current) {
      soundAnimationLoop.current.stop();
      soundAnimations.current.forEach(anim => anim.setValue(0));
    }
  };
 
  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
 
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
 
      setRecording(newRecording);
      setIsRecording(true);
 
      const newRecordingData: Recording = {
        id: Date.now().toString(),
        timestamp: new Date(),
        duration: 0,
        transcript: '',
        language: selectedLanguage.name,
      };
 
      setCurrentRecording(newRecordingData);
     
      // Start sound wave animation
      startSoundAnimation();
 
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording');
    }
  };
 
  const stopRecording = async () => {
    try {
      if (!recording) return;
 
      setIsRecording(false);
      setIsRecognizing(true);
     
      // Stop sound wave animation
      stopSoundAnimation();
 
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
 
      if (uri && currentRecording) {
        // Update the current recording with audio URI
        const updatedRecording = {
          ...currentRecording,
          audioUri: uri
        };
 
        setCurrentRecording(updatedRecording);
 
        // Start speech recognition
        await recognizeSpeech(uri, selectedLanguage.code);
 
        // Notify parent component that voice has been recorded
        if (onVoiceRecorded) {
          onVoiceRecorded();
        }
      }
 
      setRecording(null);
    } catch (err) {
      console.error('Failed to stop recording', err);
      Alert.alert('Error', 'Failed to stop recording');
    } finally {
      setIsRecognizing(false);
    }
  };
 
  const recognizeSpeech = async (uri: string, languageCode: string) => {
    try {
      // For now, we'll just store the audio recording
      // Speech recognition can be implemented later with a proper service
      // like Google Cloud Speech-to-Text or Azure Speech Services
 
      if (currentRecording) {
        setCurrentRecording(prev => ({
          ...prev!,
          transcript: 'Audio recorded successfully. Transcription not available.'
        }));
      }
    } catch (err) {
      console.error('Speech recognition failed', err);
      // Don't show error alert since we're not doing actual transcription
    }
  };
 
  const playRecording = async (audioUri: string) => {
    try {
      // If already playing, pause it
      if (isPlaying && soundRef.current) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
        stopSoundAnimation();
        return;
      }
     
      // If we have a sound object but it's paused, resume it
      if (soundRef.current) {
        await soundRef.current.playAsync();
        setIsPlaying(true);
        startSoundAnimation();
        return;
      }
     
      // Otherwise create a new sound object
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );
     
      soundRef.current = sound;
      setIsPlaying(true);
      startSoundAnimation();
     
      // When playback finishes
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded) {
          if (status.didJustFinish) {
            setIsPlaying(false);
            stopSoundAnimation();
            setPlaybackPosition(0);
          } else {
            setPlaybackPosition(status.positionMillis);
            setPlaybackDuration(status.durationMillis || 1);
          }
        }
      });
    } catch (err) {
      console.error('Failed to play recording', err);
      Alert.alert('Error', 'Failed to play recording');
    }
  };
 
  // Playback status update handler
  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPlaybackPosition(status.positionMillis);
      setPlaybackDuration(status.durationMillis || 1);
    }
  };
 
  const deleteRecording = () => {
    // Clean up sound if it exists
    if (soundRef.current) {
      soundRef.current.unloadAsync();
      soundRef.current = null;
    }
    setIsPlaying(false);
    stopSoundAnimation();
    setCurrentRecording(null);
  };
 
  // Update recording duration while recording
  useEffect(() => {
    let interval: number;
    if (isRecording && currentRecording) {
      interval = setInterval(() => {
        setCurrentRecording(prev => prev ? { ...prev, duration: prev.duration + 1 } : null);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, currentRecording]);
 
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Voice Report</Text>
 
      {/* Language Selection */}
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setShowLanguageModal(true)}
        disabled={isRecording}
      >
        <View style={styles.languageButtonContent}>
          <Text style={styles.languageButtonText}>Select Language</Text>
          <Text style={styles.selectedLanguageText}>{selectedLanguage.name}</Text>
        </View>
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      </TouchableOpacity>
 
      {/* Recording Button */}
      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.recordingButton]}
        onPress={isRecording ? stopRecording : startRecording}
        disabled={isRecognizing}
      >
        {isRecording ? (
          <FontAwesome name="stop" size={32} color="white" />
        ) : (
          <FontAwesome name="microphone" size={32} color="white" />
        )}
      </TouchableOpacity>
 
      {/* Sound Wave Visualization - Only show when recording */}
      {isRecording && (
        <View style={styles.soundWaveContainer}>
          {soundAnimations.current.map((anim, index) => (
            <SoundWaveBar
              key={index}
              height={30 + Math.random() * 20}
              animationValue={anim}
            />
          ))}
        </View>
      )}
 
      {/* Instructions */}
      <Text style={styles.instructionText}>
        {isRecording ? 'Recording in progress...' : 'Tap the microphone to start recording'}
      </Text>
 
      {/* Current Recording Display */}
      {currentRecording && (
        <View style={styles.recordingItem}>
          <View style={styles.recordingInfo}>
            <Text style={styles.recordingLanguage}>{currentRecording.language}</Text>
            <Text style={styles.recordingTime}>
              {currentRecording.timestamp.toLocaleTimeString()} - {currentRecording.duration}s
            </Text>
            {currentRecording.transcript ? (
              <Text style={styles.recordingTranscript}>{currentRecording.transcript}</Text>
            ) : (
              <Text style={styles.processingText}>Audio recorded successfully</Text>
            )}
           
            {/* Audio Player UI */}
            {currentRecording.audioUri && (
              <View style={styles.audioPlayerContainer}>
                {/* Play/Pause Button */}
                <TouchableOpacity
                  onPress={() => playRecording(currentRecording.audioUri!)}
                  style={styles.playPauseButton}
                >
                  <Feather
                    name={isPlaying ? "pause" : "play"}
                    size={20}
                    color="#4CAF50"
                  />
                </TouchableOpacity>
               
                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      { width: `${(playbackPosition / playbackDuration) * 100}%` }
                    ]}
                  />
                </View>
               
                {/* Sound Wave Visualization for Playback */}
                {isPlaying && (
                  <View style={styles.playbackWaveContainer}>
                    {soundAnimations.current.map((anim, index) => (
                      <SoundWaveBar
                        key={index}
                        height={15 + Math.random() * 10}
                        animationValue={anim}
                      />
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
         
          <View style={styles.recordingActions}>
            <TouchableOpacity onPress={deleteRecording}>
              <Feather name="trash-2" size={20} color="#F44336" style={styles.actionIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
 
      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            {languages.map(lang => (
              <TouchableOpacity
                key={lang.code}
                style={styles.languageOption}
                onPress={() => {
                  setSelectedLanguage(lang);
                  setShowLanguageModal(false);
                }}
              >
                <Text style={styles.languageOptionText}>{lang.name}</Text>
                {selectedLanguage.code === lang.code && (
                  <MaterialIcons name="check" size={24} color="#4CAF50" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  languageButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedLanguageText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  languageButtonContent: {
    flex: 1,
  },
  recordButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#0074D9',
    borderRadius: 35,
    marginBottom: 20,
    marginLeft: 20,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recordingButton: {
    backgroundColor: '#F44336',
  },
  soundWaveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  instructionText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
    fontSize: 14,
    paddingHorizontal: 20,
  },
  recordingItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  recordingInfo: {
    flex: 1,
  },
  recordingLanguage: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  recordingTime: {
    color: '#666',
    fontSize: 12,
    marginBottom: 8,
  },
  recordingTranscript: {
    color: '#444',
    fontSize: 14,
    marginBottom: 10,
  },
  processingText: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  recordingActions: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 5,
  },
  actionIcon: {
    marginLeft: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  languageOptionText: {
    fontSize: 16,
  },
  audioPlayerContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  playPauseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  playbackWaveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    marginTop: 5,
  },
});
 
export default VoiceReport;
