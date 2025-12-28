import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    PermissionsAndroid,
    NativeModules,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';

const { FaceDetectorModule } = NativeModules;

const { width } = Dimensions.get('window');

// Oval dimensions
const OVAL_WIDTH = width * 0.8;
const OVAL_HEIGHT = OVAL_WIDTH * 1.2;

const FaceCameraScreen = ({ navigation }) => {
    const cameraRef = useRef(null);
    const device = useCameraDevice('front');
    const isFocused = useIsFocused();

    const [isCameraReady, setIsCameraReady] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [faceDetected, setFaceDetected] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [faceCount, setFaceCount] = useState(0);


    /* ================== PERMISSION ================== */
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
        if (isFocused) {
            requestPermission();
            setFaceDetected(false);
        }
    }, [isFocused]);

    /* ================== 🔁 DYNAMIC FACE DETECTION ================== */
    useEffect(() => {
        if (!isFocused || !isCameraReady) return;

        const interval = setInterval(async () => {
            if (!cameraRef.current || processing) return;

            try {
                const photo = await cameraRef.current.takePhoto({
                    quality: 'low',
                    flash: 'off',
                });

                const count =
                    await FaceDetectorModule.detectFaceFromPath(photo.path);

                console.log('👥 Face count:', count);
                setFaceCount(count);

            } catch (e) {
                console.log('Face detect error', e);
                setFaceCount(0);
            }
        }, 1200);

        return () => clearInterval(interval);
    }, [isFocused, isCameraReady, processing]);


    /* ================== FINAL CAPTURE ================== */
    const takePhoto = async () => {
        if (!cameraRef.current || faceCount !== 1) return;

        try {
            setProcessing(true);
            const photo = await cameraRef.current.takePhoto({
                quality: 'high',
            });

            navigation.navigate('FacePreview', {
                imagePath: photo.path,
            });
        } finally {
            setProcessing(false);
        }
    };


    if (!device || !hasPermission || !isFocused) return null;

    const getBorderColor = () => {
        if (faceCount === 1) return 'green';
        if (faceCount > 1) return '#FF6A00'; // orange-red
        return 'red';
    };

    const getInstructionText = () => {
        if (faceCount === 1)
            return 'Face detected successfully. Please capture the image';
        if (faceCount > 1)
            return 'Multiple faces detected';
        return 'Align your face inside the oval';
    };


    return (
        <View style={styles.container}>
            {/* Instruction */}
            <Text
                style={[
                    styles.instruction,
                    {
                        color:
                            faceCount === 1
                                ? '#00FF6A'
                                : faceCount > 1
                                    ? '#FF6A00'
                                    : '#FFFFFF',
                    },
                ]}
            >
                {getInstructionText()}
            </Text>
            {/* Oval Camera */}
            <View
                style={[
                    styles.oval,
                    { borderColor: getBorderColor() },
                ]}
            >
                <Camera
                    ref={cameraRef}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={isFocused}
                    photo
                    onInitialized={() => setIsCameraReady(true)}
                />
            </View>

            {/* 🔘 Shutter */}
            <TouchableOpacity
                style={[
                    styles.shutter,
                    {
                        backgroundColor: faceCount === 1 ? 'white' : '#888',
                        opacity: processing ? 0.6 : 1,
                    },
                ]}
                disabled={faceCount !== 1 || processing}
                onPress={takePhoto}
            />


            {/* Bottom Buttons */}
            <View style={styles.bottomRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.bottomText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFaceDetected(false)}>
                    <Text style={styles.bottomText}>Retake</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FaceCameraScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
    },

    instruction: {
        marginTop: 60,
        marginBottom: 10,
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '500',
    },

    oval: {
        marginTop: 20,
        width: OVAL_WIDTH,
        height: OVAL_HEIGHT,
        borderWidth: 3,
        borderRadius: OVAL_WIDTH / 2, // makes it oval
        overflow: 'hidden',
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },

    shutter: {
        position: 'absolute',
        bottom: 110,
        width: 72,
        height: 72,
        borderRadius: 36,
        borderWidth: 5,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottomRow: {
        position: 'absolute',
        bottom: 35,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    bottomText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
});
