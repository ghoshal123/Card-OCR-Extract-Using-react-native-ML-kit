import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

const PanCustomerDetails = ({ route, navigation }) => {
  const { panNumber, extractedText } = route.params;

  const onCopy = () => {
    if (!panNumber) return;
    Alert.alert('Copied', 'PAN number copied successfully');
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.title}>PAN Details</Text>

      {/* PAN Card */}
      <View style={styles.card}>
        <Text style={styles.label}>PAN Number</Text>
        <Text style={styles.pan}>
          {panNumber || 'Not detected'}
        </Text>

        {panNumber && (
          <TouchableOpacity style={styles.copyBtn} onPress={onCopy}>
            <Text style={styles.copyText}>Copy PAN</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* OCR Text */}
      <View style={styles.textContainer}>
        <Text style={styles.sectionTitle}>Extracted Text</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.ocrText}>
            {extractedText || 'No text found'}
          </Text>
        </ScrollView>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        style={[
          styles.confirmBtn,
          !panNumber && { backgroundColor: '#ccc' },
        ]}
        disabled={!panNumber}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.confirmText}>Confirm & Continue</Text>
      </TouchableOpacity>

    </View>
  );
};

export default PanCustomerDetails;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 20,
  },

  title: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },

  card: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },

  label: {
    fontSize: 12,
    color: '#666',
  },

  pan: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#000',
  },

  copyBtn: {
    marginTop: 14,
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },

  copyText: {
    color: '#3B5BDB',
    fontWeight: '600',
  },

  textContainer: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flex: 1,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },

  ocrText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
  },

  confirmBtn: {
    marginVertical: 20,
    height: 48,
    backgroundColor: '#E53935',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
