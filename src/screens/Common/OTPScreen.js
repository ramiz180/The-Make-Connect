import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

// 🔥 Firebase
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth, app } from '../../config/firebase';


const OTPScreen = ({ navigation, route }) => {
    const phoneNumber = route?.params?.phoneNumber;
    const fullPhoneNumber = `+91${phoneNumber}`;

    const recaptchaVerifier = useRef(null);
    const inputRefs = useRef([]);

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [verificationId, setVerificationId] = useState(null);
    const [timer, setTimer] = useState(59);
    const [loading, setLoading] = useState(false);

    // ⏱ timer
    useEffect(() => {
        if (timer > 0) {
            const i = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(i);
        }
    }, [timer]);

    // 📩 send OTP on load
    useEffect(() => {
        sendOtp();
    }, []);

    const sendOtp = async () => {
        try {
            setLoading(true);
            const provider = new PhoneAuthProvider(auth);

            const id = await provider.verifyPhoneNumber(
                fullPhoneNumber,
                recaptchaVerifier.current
            );

            setVerificationId(id);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            Alert.alert('OTP Error', e.message);
        }
    };

    const handleOtpChange = (value, index) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleVerify = async () => {
        const code = otp.join('');
        if (code.length !== 6) return;

        try {
            setLoading(true);

            // 1️⃣ Firebase verifies OTP
            const credential = PhoneAuthProvider.credential(verificationId, code);
            const result = await signInWithCredential(auth, credential);

            // 2️⃣ Get Firebase ID token
            const token = await result.user.getIdToken();

            // 3️⃣ Send token to backend
            const response = await fetch('http://192.168.1.102:3000/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            // 4️⃣ Backend verification result
            if (data.success) {
                console.log('Backend verified:', data.user);
                navigation.navigate('RoleSelection');
            } else {
                Alert.alert('Backend verification failed');
            }

            setLoading(false);
        } catch (e) {
            setLoading(false);
            Alert.alert('Verification Failed', e.message);
        }
    };


    const isOtpComplete = otp.every(d => d !== '');

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar style="light" />

            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={app.options}

            />

            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1521790797524-3f202c3b5325' }}
                style={styles.backgroundImage}
            >
                <View style={styles.overlay} />

                <SafeAreaView style={styles.contentContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>The Make Connect</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <View style={styles.mainContent}>
                        <Text style={styles.title}>Enter Verification Code</Text>
                        <Text style={styles.subtitle}>Sent to {fullPhoneNumber}</Text>

                        <View style={styles.otpContainer}>
                            {otp.map((d, i) => (
                                <TextInput
                                    key={i}
                                    ref={r => (inputRefs.current[i] = r)}
                                    style={[styles.otpInput, d && styles.otpInputFilled]}
                                    value={d}
                                    onChangeText={v => handleOtpChange(v, i)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                />
                            ))}
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.verifyButton, (!isOtpComplete || loading) && styles.verifyButtonDisabled]}
                        onPress={handleVerify}
                        disabled={!isOtpComplete || loading}
                    >
                        <Text style={styles.verifyButtonText}>
                            {loading ? 'Verifying...' : 'Verify'}
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

export default OTPScreen;

/* 🔽 STYLES (THIS WAS MISSING BEFORE) */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    backgroundImage: { flex: 1 },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
    contentContainer: { flex: 1, padding: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    headerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    mainContent: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    subtitle: { color: '#aaa', marginTop: 8 },
    otpContainer: { flexDirection: 'row', gap: 12, marginTop: 24 },
    otpInput: {
        width: 48,
        height: 56,
        borderWidth: 2,
        borderColor: '#555',
        borderRadius: 10,
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
    otpInputFilled: { borderColor: '#30E0A1' },
    verifyButton: {
        backgroundColor: '#30E0A1',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    verifyButtonDisabled: { opacity: 0.5 },
    verifyButtonText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
});
