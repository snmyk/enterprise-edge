import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Mic, ArrowLeft, Send, MapPin, AlertTriangle, Play, Square } from 'lucide-react-native';
import Header from '../../../components/Header';
import BottomNavigation from '../../../components/BottomNavigation';

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
      <Header />
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
                </TouchableOpacity>
              ) : (
                <View style={styles.playbackContainer}>
                  <TouchableOpacity style={styles.playButton} onPress={handlePlayRecording}>
                    <Play size={24} color="#3B82F6" />
                  </TouchableOpacity>
                  <View style={styles.playbackInfo}>
                    <Text style={styles.playbackText}>Recording saved</Text>
                    <Text style={styles.playbackDuration}>{recordingDuration}s</Text>
                  </View>
                  <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteRecording}>
                    <Square size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
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
              <Text style={styles.inputLabel}>Additional Description (Optional)</Text>
              <View style={styles.inputWrapper}>
                <AlertTriangle size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Add any additional details..."
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  playbackInfo: {
    flex: 1,
  },
  playbackText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  playbackDuration: {
    fontSize: 14,
    color: '#6B7280',
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
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
