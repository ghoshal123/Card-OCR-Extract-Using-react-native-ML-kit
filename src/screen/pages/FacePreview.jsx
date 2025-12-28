import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.8;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.2; // Same ratio as capture oval

const FacePreviewScreen = ({ route, navigation }) => {
    const { imagePath } = route.params;

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Face Preview</Text>
            <Text style={styles.instruction}>
                Make sure your face is clearly visible in the image
            </Text>

            {/* Image Preview */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'file://' + imagePath }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            {/* Details Section */}
            <View style={styles.detailsContainer}>
                <Text style={styles.detailsText}>
                    ✅ Face captured successfully
                </Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#ff5555' }]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Retake</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={() => navigation.navigate('Instructions', { imagePath })}
                >
                    <Text style={styles.buttonText}>Proceed</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FacePreviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingTop: 50,
    },

    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
    },

    instruction: {
        fontSize: 14,
        color: '#555555',
        marginTop: 10,
        textAlign: 'center',
        paddingHorizontal: 20,
    },

    imageContainer: {
        marginTop: 30,
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        borderRadius: IMAGE_WIDTH / 2,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#000000',
        backgroundColor: '#000000',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    detailsContainer: {
        marginTop: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    detailsText: {
        fontSize: 14,
        color: '#333333',
        textAlign: 'center',
        marginVertical: 5,
    },

    buttonRow: {
        flexDirection: 'row',
        marginTop: 40,
        width: '80%',
        justifyContent: 'space-between',
    },

    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },

    buttonText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold',
    },
});
