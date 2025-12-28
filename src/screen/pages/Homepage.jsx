import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const HomeScreen = ({ navigation, route }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (route?.params?.fromCamera) {
      setSelectedOption('CAPTURE');
    }
  }, [route]);

  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    });

    if (result.didCancel) return;

    if (result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;

      navigation.navigate('PanScreen', {
        imagePath: imageUri,
        fromUpload: true,
      });
    }
  };

  const onProceed = () => {
    if (selectedOption === 'CAPTURE') {
      navigation.navigate('CameraScreen');
    }

    if (selectedOption === 'UPLOAD') {
      openGallery();
    }

    if (selectedOption === 'FACE') {
      navigation.navigate('Face');
    }
  };

  const isDisabled = !selectedOption;

  return (
    <View style={styles.container}>

      <Image
        source={require('../../images/pan.jpeg')}
        style={styles.panImage}
        resizeMode="contain"
      />

      <Text style={styles.title}>Select PAN Option</Text>

      {/* Capture */}
      <TouchableOpacity
        style={[
          styles.optionCard,
          selectedOption === 'CAPTURE' && styles.activeCard,
        ]}
        onPress={() => setSelectedOption('CAPTURE')}
      >
        <Text style={styles.optionIcon}>📷</Text>
        <Text style={styles.optionText}>Capture PAN Card</Text>
      </TouchableOpacity>

      {/* Upload */}
      <TouchableOpacity
        style={[
          styles.optionCard,
          selectedOption === 'UPLOAD' && styles.activeCard,
        ]}
        onPress={() => setSelectedOption('UPLOAD')}
      >
        <Text style={styles.optionIcon}>📁</Text>
        <Text style={styles.optionText}>Upload PAN Card</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.optionCard,
          selectedOption === 'FACE' && styles.activeCard,
        ]}
        onPress={() => setSelectedOption('FACE')}
      >
        <Text style={styles.optionIcon}>👦</Text>
        <Text style={styles.optionText}>Capture Face</Text>
      </TouchableOpacity>

      {/* Proceed */}
      <TouchableOpacity
        style={[styles.proceedBtn, isDisabled && styles.disabledBtn]}
        disabled={isDisabled}
        onPress={onProceed}
      >
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>

    </View>
  );
};

export default HomeScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#FFFFFF'
  },

  panImage: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginBottom: 20
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30
  },

  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 16
  },

  activeCard: {
    borderColor: 'red',
    backgroundColor: '#FFF0F0'
  },

  optionIcon: {
    fontSize: 22,
    marginRight: 12
  },

  optionText: {
    fontSize: 16,
    fontWeight: '500'
  },

  disabledCard: {
    backgroundColor: '#F2F2F2'
  },

  disabledText: {
    fontSize: 16,
    color: '#999999'
  },

  proceedBtn: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },

  disabledBtn: {
    backgroundColor: '#B0B0B0'
  },

  proceedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
});
