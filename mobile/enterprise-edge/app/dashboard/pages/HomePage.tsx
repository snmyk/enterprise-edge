import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddPhotoButton from "../components/addPhotoButton";
import VoiceReport from "../components/voice-report";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Home</Text>
      <AddPhotoButton />
      <VoiceReport />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
});

export default HomePage;
