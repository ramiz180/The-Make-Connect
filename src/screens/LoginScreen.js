import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    // Step 1: Mock sending OTP
    const handleSendOtp = () => {
        if (phoneNumber.length < 10) {
            Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number.');
            return;
        }
        // In a real app, we would call an API here.
        // For now, we just pretend we sent it.
        setOtpSent(true);
        Alert.alert('OTP Sent', 'Your mock OTP is 4321');
    };

    // Step 2: Mock verifying OTP
    const handleVerifyOtp = () => {
        if (otp === '4321') {
            // OTP is correct!
            // Now we need to ask the user for their Role (Customer or Worker)
            // We will navigate to a "RoleSelection" screen (we will build this next)
            Alert.alert('Success', 'Login Successful!');
            navigation.replace('RoleSelection');
        } else {
            Alert.alert('Error', 'Invalid OTP. Try 1234.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>

                <Text style={styles.title}>Make Connect</Text>
                <Text style={styles.subtitle}>Find local workers or get hired.</Text>

                {!otpSent ? (
                    // Phone Number Input View
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
                    // OTP Input View
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
        backgroundColor: '#007AFF', // Standard Blue
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
