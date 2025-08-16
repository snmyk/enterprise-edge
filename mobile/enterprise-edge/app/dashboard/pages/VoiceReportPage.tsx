import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Mic, ArrowLeft, Send, MapPin, AlertTriangle, Play, Square, Waveform } from 'lucide-react-native';

const VoiceReportPage = () => {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingDuration(0);
    // This would integrate with actual recording functionality
    // For now, we'll simulate recording
    Alert.alert('Recording', 'Voice recording started');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
    // This would stop the actual recording
    Alert.alert('Recording', 'Voice recording stopped');
  };

  const handlePlayRecording = () => {
    // This would play the recorded audio
    Alert.alert('Playback', 'Playing recorded audio');
  };

  const handleDeleteRecording = () => {
    setHasRecording(false);
    setRecordingDuration(0);
  };

  const handleSubmitReport = () => {
    if (!hasRecording) {
      Alert.alert('Error', 'Please record a voice description');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please provide a text description');
      return;
    }
    if (!location.trim()) {
      Alert.alert('Error', 'Please provide a location');
      return;
    }

    Alert.alert(
      'Success',
      'Your voice report has been submitted successfully!',
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voice Report</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.recordingSection}>
            <Text style={styles.sectionTitle}>Record Voice</Text>
            <Text style={styles.sectionSubtitle}>
              Record a detailed audio description of the waste issue
            </Text>
            
            <View style={styles.recordingContainer}>
              {!hasRecording ? (
                <TouchableOpacity 
                  style={[styles.recordButton, isRecording && styles.recordingButton]} 
                  onPress={isRecording ? handleStopRecording : handleStartRecording}
                >
                  <View style={[styles.recordIconContainer, isRecording && styles.recordingIconContainer]}>
                    {isRecording ? (
                      <Square size={32} color="#FFFFFF" />
                    ) : (
                      <Mic size={32} color="#3B82F6" />
                    )}
                  </View>
                  <Text style={styles.recordButtonText}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </Text>
                  <Text style={styles.recordButtonSubtext}>
                    {isRecording ? 'Tap to stop' : 'Tap to start recording'}
                  </Text>
                  {isRecording && (
                    <View style={styles.recordingIndicator}>
                      <Waveform size={20} color="#EF4444" />
                      <Text style={styles.recordingText}>Recording...</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ) : (
                <View style={styles.playbackContainer}>
                  <View style={styles.audioVisualizer}>
                    <Waveform size={48} color="#3B82F6" />
                    <Text style={styles.audioText}>Audio Recording</Text>
                    <Text style={styles.audioDuration}>0:15</Text>
                  </View>
                  <View style={styles.playbackControls}>
                    <TouchableOpacity style={styles.playButton} onPress={handlePlayRecording}>
                      <Play size={20} color="#FFFFFF" />
                      <Text style={styles.playButtonText}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteRecording}>
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Additional Details</Text>
            
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
              <Text style={styles.inputLabel}>Text Description (Optional)</Text>
              <View style={styles.inputWrapper}>
                <AlertTriangle size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Add any additional text details..."
                  value={description}
                  onChangeText={setDescription}
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <View style={styles.tipsContainer}>
              <Text style={styles.tipsTitle}>🎤 Voice Recording Tips:</Text>
              <Text style={styles.tipsText}>• Speak clearly and slowly</Text>
              <Text style={styles.tipsText}>• Describe the issue in detail</Text>
              <Text style={styles.tipsText}>• Mention the location and time</Text>
              <Text style={styles.tipsText}>• Keep recordings under 2 minutes</Text>
            </View>

            <TouchableOpacity 
              style={[styles.submitButton, !hasRecording && styles.submitButtonDisabled]} 
              onPress={handleSubmitReport}
              disabled={!hasRecording}
            >
              <Send size={20} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Submit Voice Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  recordingSection: {
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
  recordingContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recordButton: {
    alignItems: 'center',
    padding: 20,
  },
  recordingButton: {
    backgroundColor: '#FEF2F2',
  },
  recordIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  recordingIconContainer: {
    backgroundColor: '#EF4444',
  },
  recordButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  recordButtonSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  recordingText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '500',
  },
  playbackContainer: {
    alignItems: 'center',
  },
  audioVisualizer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  audioText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  audioDuration: {
    fontSize: 14,
    color: '#6B7280',
  },
  playbackControls: {
    flexDirection: 'row',
    gap: 16,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  playButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#EF4444',
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
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: '#1E40AF',
    marginBottom: 4,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
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

export default VoiceReportPage;
