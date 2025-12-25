import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH / 1.586; // PAN ratio

const CameraScreen = ({ navigation }) => {
    const cameraRef = useRef(null);
    const device = useCameraDevice('back');
    const isFocused = useIsFocused();
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);

    const requestPermission = async () => {
        if (Platform.OS === 'android') {
            const result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            if (result === PermissionsAndroid.RESULTS.GRANTED) {
                setHasPermission(true);
            }
        } else {
            const status = await Camera.requestCameraPermission();
            if (status === 'granted') setHasPermission(true);
        }
    };

    useEffect(() => {
        if (isFocused) requestPermission();
    }, [isFocused]);

    const takePhoto = async () => {
        if (!cameraRef.current || !isCameraReady) return;

        const photo = await cameraRef.current.takePhoto({
            quality: 'medium',
        });

        navigation.navigate('PanScreen', { imagePath: photo.path });
    };

    if (!device || !hasPermission || !isFocused) return null;

    return (
        <View style={styles.container}>

            {/* Instruction */}
            <Text style={styles.instruction}>
                Please capture the front of PAN card
            </Text>

            {/* CAMERA VISIBLE ONLY INSIDE BOX */}
            <View style={styles.cameraBox}>
                <Camera
                    ref={cameraRef}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={isFocused}
                    photo
                    onInitialized={() => setIsCameraReady(true)}
                />
            </View>

            {/* Shutter */}
            <TouchableOpacity style={styles.shutter} onPress={takePhoto} />

            {/* Bottom Buttons */}
            <View style={styles.bottomRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.bottomText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.bottomText}>Retake</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CameraScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
    },

    instruction: {
        marginTop: 60,
        color: '#FFFFFF',
        fontSize: 14,
    },

    cameraBox: {
        marginTop: 20,              // 👈 space below instruction
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',         // 👈 CLIPS CAMERA
        backgroundColor: '#000000',
    },

    shutter: {
        position: 'absolute',
        bottom: 100,
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: 'black',
        backgroundColor: 'white',
    },

    bottomRow: {
        position: 'absolute',
        bottom: 30,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    bottomText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
