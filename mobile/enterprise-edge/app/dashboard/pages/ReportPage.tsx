import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Camera, Mic, Edit3, ArrowLeft, Send, MapPin, AlertTriangle } from 'lucide-react-native';
import Header from '../../../components/Header';
import BottomNavigation from '../../../components/BottomNavigation';

const ReportPage = () => {
  const router = useRouter();
  const [reportType, setReportType] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const reportTypes = [
    {
      id: 'photo',
      title: 'Photo Report',
      description: 'Take a photo of the waste issue',
      icon: Camera,
      color: '#10B981',
      bgColor: '#ECFDF5',
    },
    {
      id: 'voice',
      title: 'Voice Report',
      description: 'Record audio description',
      icon: Mic,
      color: '#3B82F6',
      bgColor: '#EFF6FF',
    },
    {
      id: 'text',
      title: 'Text Report',
      description: 'Write detailed description',
      icon: Edit3,
      color: '#F59E0B',
      bgColor: '#FEF3C7',
    },
  ];

  const handleReportTypeSelect = (type: string) => {
    setReportType(type);
  };

  const handleBackToSelection = () => {
    setReportType(null);
    setDescription('');
    setLocation('');
  };

  const handleSubmitReport = () => {
    if (!reportType) {
      Alert.alert('Error', 'Please select a report type');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please provide a description');
      return;
    }
    if (!location.trim()) {
      Alert.alert('Error', 'Please provide a location');
      return;
    }

    Alert.alert(
      'Success',
      'Your report has been submitted successfully!',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const renderReportForm = () => {
    if (!reportType) return null;

    return (
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToSelection}>
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.formTitle}>Report Details</Text>
          <View style={styles.headerSpacer} />
        </View>
        
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
          <Text style={styles.inputLabel}>Description</Text>
          <View style={styles.inputWrapper}>
            <AlertTriangle size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Describe the waste issue..."
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
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {!reportType ? (
            <View style={styles.selectionContainer}>
              <Text style={styles.selectionTitle}>Choose Report Type</Text>
              <Text style={styles.selectionSubtitle}>
                Select how you'd like to report this waste issue
              </Text>
              
              <View style={styles.reportTypesGrid}>
                {reportTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={styles.reportTypeCard}
                    onPress={() => handleReportTypeSelect(type.id)}
                  >
                    <View style={[styles.iconContainer, { backgroundColor: type.bgColor }]}>
                      <type.icon size={32} color={type.color} />
                    </View>
                    <Text style={styles.reportTypeTitle}>{type.title}</Text>
                    <Text style={styles.reportTypeDescription}>{type.description}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            renderReportForm()
          )}
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  selectionContainer: {
    flex: 1,
  },
  selectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  selectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  reportTypesGrid: {
    gap: 16,
  },
  reportTypeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  reportTypeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  reportTypeDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  headerSpacer: {
    width: 40,
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
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 24,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ReportPage;
