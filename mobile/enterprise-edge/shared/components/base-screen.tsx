import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Dimensions, View } from 'react-native';

interface BaseScreenProps {
  children: React.ReactNode;
}

const { width, height } = Dimensions.get('window');

const BaseScreen: React.FC<BaseScreenProps> = ({ children }) => {
  return (
    <SafeAreaView style={[styles.safeArea, { width: '100%', height: '100%' }]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
     
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: 20
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    padding: 16,
  },
});

export default BaseScreen;
