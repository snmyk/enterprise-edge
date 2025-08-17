import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Edit3, ArrowLeft, Send, MapPin, AlertTriangle, FileText, CheckCircle } from 'lucide-react-native';
import Header from '../../../components/Header';
import BottomNavigation from '../../../components/BottomNavigation';

const TextReportPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState('');

  const categories = [
    { id: 'overflowing', label: 'Overflowing Bin', color: '#EF4444' },
    { id: 'broken', label: 'Broken Container', color: '#F59E0B' },
    { id: 'illegal', label: 'Illegal Dumping', color: '#8B5CF6' },
    { id: 'recycling', label: 'Recycling Issue', color: '#10B981' },
    { id: 'other', label: 'Other', color: '#6B7280' },
  ];

  const urgencyLevels = [
    { id: 'low', label: 'Low', color: '#10B981', description: 'Minor issue' },
    { id: 'medium', label: 'Medium', color: '#F59E0B', description: 'Moderate concern' },
    { id: 'high', label: 'High', color: '#EF4444', description: 'Urgent attention needed' },
  ];

  const handleSubmitReport = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please provide a title for your report');
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
    if (!category) {
      Alert.alert('Error', 'Please select a category');
      return;
    }
    if (!urgency) {
      Alert.alert('Error', 'Please select urgency level');
      return;
    }

    Alert.alert(
      'Success',
      'Your text report has been submitted successfully!',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const getWordCount = () => {
    return description.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.introSection}>
            <View style={styles.introIconContainer}>
              <Edit3 size={32} color="#F59E0B" />
            </View>
            <Text style={styles.introTitle}>Write Your Report</Text>
            <Text style={styles.introSubtitle}>
              Provide detailed information about the waste management issue
            </Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Report Title *</Text>
              <View style={styles.inputWrapper}>
                <FileText size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Brief title for your report"
                  value={title}
                  onChangeText={setTitle}
                  placeholderTextColor="#9CA3AF"
                  maxLength={100}
                />
              </View>
              <Text style={styles.characterCount}>{title.length}/100</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Category *</Text>
              <View style={styles.categoryGrid}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryButton,
                      category === cat.id && styles.categoryButtonSelected,
                      { borderColor: cat.color }
                    ]}
                    onPress={() => setCategory(cat.id)}
                  >
                    <Text style={[
                      styles.categoryText,
                      category === cat.id && { color: cat.color }
                    ]}>
                      {cat.label}
                    </Text>
                    {category === cat.id && (
                      <CheckCircle size={16} color={cat.color} style={styles.checkIcon} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Urgency Level *</Text>
              <View style={styles.urgencyContainer}>
                {urgencyLevels.map((level) => (
                  <TouchableOpacity
                    key={level.id}
                    style={[
                      styles.urgencyButton,
                      urgency === level.id && styles.urgencyButtonSelected,
                      { borderColor: level.color }
                    ]}
                    onPress={() => setUrgency(level.id)}
                  >
                    <View style={styles.urgencyContent}>
                      <Text style={[
                        styles.urgencyLabel,
                        urgency === level.id && { color: level.color }
                      ]}>
                        {level.label}
                      </Text>
                      <Text style={styles.urgencyDescription}>
                        {level.description}
                      </Text>
                    </View>
                    {urgency === level.id && (
                      <CheckCircle size={16} color={level.color} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Location *</Text>
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
              <Text style={styles.inputLabel}>Detailed Description *</Text>
              <View style={styles.inputWrapper}>
                <AlertTriangle size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Describe the waste issue in detail. Include what you observed, when it happened, and any other relevant information..."
                  value={description}
                  onChangeText={setDescription}
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>
              <Text style={styles.wordCount}>{getWordCount()} words</Text>
            </View>

            <View style={styles.tipsContainer}>
              <Text style={styles.tipsTitle}>📝 Writing Tips:</Text>
              <Text style={styles.tipsText}>• Be specific about the location</Text>
              <Text style={styles.tipsText}>• Describe the issue clearly</Text>
              <Text style={styles.tipsText}>• Include relevant details</Text>
              <Text style={styles.tipsText}>• Mention if it's a recurring problem</Text>
            </View>

            <TouchableOpacity 
              style={[
                styles.submitButton, 
                (!title || !description || !location || !category || !urgency) && styles.submitButtonDisabled
              ]} 
              onPress={handleSubmitReport}
              disabled={!title || !description || !location || !category || !urgency}
            >
              <Send size={20} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Submit Text Report</Text>
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
  introSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  introIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  introSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  formSection: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
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
    minHeight: 120,
  },
  characterCount: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 4,
  },
  wordCount: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 4,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    gap: 6,
  },
  categoryButtonSelected: {
    backgroundColor: '#FEF3C7',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  checkIcon: {
    marginLeft: 4,
  },
  urgencyContainer: {
    gap: 8,
  },
  urgencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  urgencyButtonSelected: {
    backgroundColor: '#FEF3C7',
  },
  urgencyContent: {
    flex: 1,
  },
  urgencyLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 2,
  },
  urgencyDescription: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  tipsContainer: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 4,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59E0B',
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

export default TextReportPage;
