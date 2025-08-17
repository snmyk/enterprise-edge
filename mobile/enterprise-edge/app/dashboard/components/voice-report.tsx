import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Alert, Animated } from 'react-native';
import { MaterialIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Colors } from '../../../constants/Colors';

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

const VoiceReport: React.FC<VoiceReportProps> = ({ onVoiceRecorded }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);

  // Animation for recording indicator
  const recordingAnimation = new Animated.Value(0);

  useEffect(() => {
    // Request audio permissions on component mount
    requestAudioPermission();
    
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Request audio recording permission
  const requestAudioPermission = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Audio recording permission is required to record voice reports.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting audio permission:', error);
      setHasPermission(false);
    }
  };

  // Recording animation
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(recordingAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(recordingAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      recordingAnimation.setValue(0);
    }
  }, [isRecording]);

  const startRecording = async () => {
    if (!hasPermission) {
      await requestAudioPermission();
      return;
    }

    try {
      // Configure audio mode for recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
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

    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording. Please check your microphone permissions.');
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      setIsRecording(false);
      setIsRecognizing(true);

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
      if (sound) {
        await sound.unloadAsync();
      }

      // Configure audio mode for playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setIsPlaying(true);
      await newSound.playAsync();
    } catch (err) {
      console.error('Failed to play recording', err);
      Alert.alert('Error', 'Failed to play recording');
    }
  };

  const pauseRecording = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error('Failed to pause recording', err);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPlaybackPosition(status.positionMillis);
      setPlaybackDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
      
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPlaybackPosition(0);
      }
    }
  };

  const deleteRecording = () => {
    if (sound) {
      sound.unloadAsync();
      setSound(null);
    }
    setIsPlaying(false);
    setPlaybackPosition(0);
    setPlaybackDuration(0);
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

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderSoundWave = () => {
    const bars = 20;
    const barArray = Array.from({ length: bars }, (_, i) => i);
    
    return (
      <View style={styles.soundWaveContainer}>
        {barArray.map((_, index) => {
          const height = isPlaying ? Math.random() * 30 + 5 : 8;
          return (
            <View
              key={index}
              style={[
                styles.soundWaveBar,
                {
                  height: isPlaying ? height : 8,
                  backgroundColor: isPlaying ? Colors.light.tint : '#E1E5E9',
                }
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.voiceCard}>
        <View style={styles.iconContainer}>
          <FontAwesome name="microphone" size={24} color={Colors.light.tint} />
        </View>
        
        <Text style={styles.title}>Voice Report</Text>
        <Text style={styles.subtitle}>
          Record a voice message describing the waste issue
        </Text>

        {/* Permission Warning */}
        {!hasPermission && (
          <View style={styles.permissionWarning}>
            <Ionicons name="warning" size={16} color="#F59E0B" />
            <Text style={styles.permissionWarningText}>
              Microphone permission required to record audio
            </Text>
          </View>
        )}

        {/* Language Selection */}
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => setShowLanguageModal(true)}
          disabled={isRecording}
        >
          <View style={styles.languageButtonContent}>
            <Text style={styles.languageButtonText}>Language</Text>
            <Text style={styles.selectedLanguageText}>{selectedLanguage.name}</Text>
          </View>
          <MaterialIcons name="arrow-drop-down" size={24} color={Colors.light.tint} />
        </TouchableOpacity>

        {/* Recording Button */}
        <View style={styles.recordingSection}>
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordingButton]}
            onPress={isRecording ? stopRecording : startRecording}
            disabled={isRecognizing || !hasPermission}
          >
            {isRecording ? (
              <Animated.View style={[
                styles.recordingIndicator,
                {
                  opacity: recordingAnimation,
                  transform: [{ scale: recordingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2]
                  })}]
                }
              ]}>
                <FontAwesome name="stop" size={24} color="white" />
              </Animated.View>
            ) : (
              <FontAwesome name="microphone" size={24} color="white" />
            )}
          </TouchableOpacity>

          {/* Instructions */}
          <Text style={styles.instructionText}>
            {isRecording ? 'Recording in progress...' : 'Tap to start recording'}
          </Text>
        </View>

        {/* Current Recording Display */}
        {currentRecording && (
          <View style={styles.recordingCard}>
            <View style={styles.recordingHeader}>
              <View style={styles.recordingInfo}>
                <Text style={styles.recordingLanguage}>{currentRecording.language}</Text>
                <Text style={styles.recordingTime}>
                  {currentRecording.timestamp.toLocaleTimeString()} - {currentRecording.duration}s
                </Text>
              </View>
              <View style={styles.recordingActions}>
                {currentRecording.audioUri && (
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={isPlaying ? pauseRecording : () => playRecording(currentRecording.audioUri!)}
                  >
                    {isPlaying ? (
                      <Ionicons name="pause" size={16} color={Colors.light.tint} />
                    ) : (
                      <Ionicons name="play" size={16} color={Colors.light.tint} />
                    )}
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={deleteRecording}
                >
                  <Feather name="trash-2" size={16} color="#F44336" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sound Wave and Playback Progress */}
            {currentRecording.audioUri && (
              <View style={styles.playbackSection}>
                {renderSoundWave()}
                <View style={styles.playbackInfo}>
                  <Text style={styles.playbackTime}>
                    {formatTime(playbackPosition)} / {formatTime(playbackDuration)}
                  </Text>
                </View>
              </View>
            )}

            {currentRecording.transcript ? (
              <Text style={styles.recordingTranscript}>{currentRecording.transcript}</Text>
            ) : (
              <Text style={styles.processingText}>Audio recorded successfully</Text>
            )}
          </View>
        )}
      </View>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <MaterialIcons name="close" size={24} color="#687076" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                    <MaterialIcons name="check" size={24} color={Colors.light.tint} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  voiceCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 14,
    color: '#687076',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  permissionWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
    gap: 6,
  },
  permissionWarningText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '500',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E1E5E9',
  },
  languageButtonText: {
    fontSize: 12,
    color: '#687076',
    fontWeight: '500',
  },
  selectedLanguageText: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: '600',
  },
  languageButtonContent: {
    flex: 1,
  },
  recordingSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  recordButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    backgroundColor: Colors.light.tint,
    borderRadius: 36,
    marginBottom: 16,
    shadowColor: Colors.light.tint,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  recordingButton: {
    backgroundColor: '#F44336',
  },
  recordingIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionText: {
    textAlign: 'center',
    color: '#687076',
    fontSize: 14,
    fontWeight: '500',
  },
  recordingCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E1E5E9',
  },
  recordingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recordingInfo: {
    flex: 1,
  },
  recordingLanguage: {
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
    fontSize: 14,
  },
  recordingTime: {
    color: '#687076',
    fontSize: 12,
  },
  recordingActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E1E5E9',
  },
  deleteButton: {
    borderColor: '#FFEBEE',
  },
  playbackSection: {
    marginBottom: 12,
  },
  soundWaveContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 40,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  soundWaveBar: {
    width: 3,
    borderRadius: 2,
    backgroundColor: '#E1E5E9',
  },
  playbackInfo: {
    alignItems: 'center',
  },
  playbackTime: {
    fontSize: 12,
    color: '#687076',
    fontWeight: '500',
  },
  recordingTranscript: {
    color: Colors.light.text,
    fontSize: 14,
    lineHeight: 20,
  },
  processingText: {
    color: '#687076',
    fontSize: 14,
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '85%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E5E9',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  languageOptionText: {
    fontSize: 16,
    color: Colors.light.text,
  },
});

export default VoiceReport;