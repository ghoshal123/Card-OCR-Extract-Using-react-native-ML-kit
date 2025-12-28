
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const InstructionPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Instructions</Text>

        {/* PAN Card Instructions */}
        <View style={styles.listContainer}>
          <Text style={styles.subHeading}>PAN Card Capture:</Text>
          <Text style={styles.bullet}>• Please keep your original PAN Card ready.</Text>
          <Text style={styles.bullet}>• Ensure the PAN Card is placed on a flat surface.</Text>
          <Text style={styles.bullet}>• Capture the PAN Card in a well-lit area.</Text>
          <Text style={styles.bullet}>• Make sure the PAN Card is fully visible inside the camera frame.</Text>
          <Text style={styles.bullet}>• Ensure PAN Number, Name, Date of Birth, and Photo are clearly readable.</Text>
          <Text style={styles.bullet}>• Do not cover any part of the PAN Card with fingers or objects.</Text>
          <Text style={styles.bullet}>• Avoid glare, shadows, blur or reflections while capturing the image.</Text>
          <Text style={styles.bullet}>• Do not upload photocopies, screenshots, or edited images.</Text>
          <Text style={styles.bullet}>• Upload only JPG, JPEG, or PNG format images.</Text>
        </View>

        {/* Face Capture Instructions */}
        <View style={styles.listContainer}>
          <Text style={styles.subHeading}>Face Capture & Liveness:</Text>
          <Text style={styles.bullet}>• Make sure your face is fully visible inside the oval frame.</Text>
          <Text style={styles.bullet}>• Ensure good lighting on your face, avoid backlight and shadows.</Text>
          <Text style={styles.bullet}>• Remove any accessories like sunglasses or masks.</Text>
          <Text style={styles.bullet}>• Keep a neutral expression and look directly at the camera.</Text>
          <Text style={styles.bullet}>• Follow on-screen prompts for liveness verification (blink, smile, turn head, etc.).</Text>
          <Text style={styles.bullet}>• Avoid tilting your head too much or moving quickly.</Text>
          <Text style={styles.bullet}>• Ensure no other faces are visible in the frame.</Text>
          <Text style={styles.bullet}>• Hold your device steady during capture for best results.</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InstructionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  listContainer: {
    marginBottom: 30,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: '#000',
  },
  highlight: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: '#d60000',
    fontWeight: '600',
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});
