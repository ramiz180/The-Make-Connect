import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    // Backend base URL
    const BASE_URL = 'http://192.168.31.44:5000';  // replace with your actual PC IP


    // Step 1: Send OTP
    const handleSendOtp = async () => {
        if (phoneNumber.length !== 10) {
            Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number.');
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/api/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber })
            });
            const data = await res.json();

            if (res.ok) {
                setOtpSent(true);
                Alert.alert('OTP Sent', `Your OTP is ${data.otp}`); // Remove OTP in production
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (err) {
            console.log(err);
            Alert.alert('Error', 'Something went wrong while sending OTP');
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOtp = async () => {
        if (otp.length !== 4) {
            Alert.alert('Invalid OTP', 'Please enter a 4-digit OTP.');
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/api/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber, otp })
            });
            const data = await res.json();

            if (res.ok) {
                Alert.alert('Success', 'Login Successful!');
                navigation.replace('RoleSelection');
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (err) {
            console.log(err);
            Alert.alert('Error', 'Something went wrong while verifying OTP');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>

                <Text style={styles.title}>Make Connect</Text>
                <Text style={styles.subtitle}>Find local workers or get hired.</Text>

                {!otpSent ? (
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="9876543210"
                            keyboardType="phone-pad"
                            maxLength={10}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
                            <Text style={styles.buttonText}>Send OTP</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter OTP</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="1234"
                            keyboardType="number-pad"
                            maxLength={4}
                            value={otp}
                            onChangeText={setOtp}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                            <Text style={styles.buttonText}>Verify & Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setOtpSent(false)}>
                            <Text style={styles.linkText}>Change Phone Number</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 48,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkText: {
        color: '#007AFF',
        textAlign: 'center',
        fontSize: 14,
    },
});
