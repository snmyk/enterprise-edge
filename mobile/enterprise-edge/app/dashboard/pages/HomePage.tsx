import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddPhotoButton from "../components/addPhotoButton";
import VoiceReport from "../components/voice-report";
import Header from "../../../components/Header";
import BottomNavigation from "../../../components/BottomNavigation";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Home</Text>
        <AddPhotoButton />
        <VoiceReport />
      </View>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
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
