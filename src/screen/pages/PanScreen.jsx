
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import TextRecognition from '@react-native-ml-kit/text-recognition';

const { width } = Dimensions.get('window');

const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH / 1.586; // PAN ratio

const PanScreen = ({ route, navigation }) => {
  const { imagePath } = route.params;
  const [loading, setLoading] = useState(false);

  // PAN extractor
  const extractPAN = (text) => {
    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]/;
    const match = text.match(panRegex);
    return match ? match[0] : null;
  };

  const onProceed = async () => {
    try {
      setLoading(true);

      // OCR
      const result = await TextRecognition.recognize(
        `file://${imagePath}`
      );

      const extractedText = result.text;
      const panNumber = extractPAN(extractedText);

      console.log('====== OCR RESULT ======');
      console.log('FULL TEXT:', extractedText);
      console.log('PAN NUMBER:', panNumber);
      console.log('========================');

      // Navigate if needed
      navigation.navigate('PanDetails', {
        panNumber,
        extractedText,
      });

    } catch (error) {
      console.log('OCR Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>
        Verify PAN Card
      </Text>

      {/* PAN CARD PREVIEW */}
      <View style={styles.cardBox}>
        <Image
          source={{ uri: `file://${imagePath}` }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Info text */}
      <Text style={styles.info}>
        Ensure the PAN card details are clearly visible
      </Text>

      {/* Proceed Button */}
      <TouchableOpacity
        style={[
          styles.proceedBtn,
          loading && { opacity: 0.6 }
        ]}
        disabled={loading}
        onPress={onProceed}
      >
        <Text style={styles.proceedText}>
          {loading ? 'Processing...' : 'Proceed'}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default PanScreen;



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
    },
  
    title: {
      marginTop: 60,
      color: 'black',
      fontSize: 16,
      fontWeight: '600',
    },
  
    cardBox: {
      marginTop: 20,
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: 'black',
      overflow: 'hidden',
      backgroundColor: '#000000',
    },
  
    image: {
      width: '100%',
      height: '100%',
    },
  
    info: {
      marginTop: 12,
      fontSize: 12,
      color: 'black',
    },
  
    proceedBtn: {
      position: 'absolute',
      bottom: 30,
      width: '90%',
      height: 48,
      backgroundColor: 'red',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    proceedText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  