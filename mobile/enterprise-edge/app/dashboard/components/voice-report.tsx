import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Alert } from 'react-native';
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

const languages = [
  { code: 'en-US', name: 'English' },
  { code: 'af-ZA', name: 'Afrikaans' },
  { code: 'zu-ZA', name: 'Zulu' },
  { code: 'xh-ZA', name: 'Xhosa' },
  { code: 'st-ZA', name: 'Sotho' }
];

const VoiceReport = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [recording]);

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
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );
      await sound.playAsync();
    } catch (err) {
      console.error('Failed to play recording', err);
      Alert.alert('Error', 'Failed to play recording');
    }
  };

  const deleteRecording = () => {
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
          </View>
          <View style={styles.recordingActions}>
            {currentRecording.audioUri && (
              <TouchableOpacity onPress={() => playRecording(currentRecording.audioUri!)}>
                <Feather
                  name="play"
                  size={20}
                  color="#4CAF50"
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
            )}
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
  },
  header: {
    fontSize: 16,
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
    width: 60,
    height: 60,
    backgroundColor: '#0074D9',
    borderRadius: 30,
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
  instructionText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
    fontSize: 14,
    paddingHorizontal: 20,
  },
  recordingItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  processingText: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
  recordingActions: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default VoiceReport;