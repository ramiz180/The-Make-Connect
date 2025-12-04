import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, StatusBar, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const OTPScreen = ({ navigation, route }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(59);
    const inputRefs = useRef([]);

    // Timer countdown
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleOtpChange = (value, index) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResend = () => {
        if (timer === 0) {
            setTimer(59);
            // Add resend OTP logic here
        }
    };

    const handleVerify = () => {
        const otpCode = otp.join('');
        if (otpCode.length === 6) {
            // Add verification logic here
            navigation.navigate('RoleSelection');
        }
    };

    const isOtpComplete = otp.every(digit => digit !== '');
    const phoneNumber = route?.params?.phoneNumber || '+XX XXXXXX-XX123';

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar style="light" />

            {/* Background Image */}
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1521790797524-3f202c3b5325?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjAzNTV8MHwxfHNlYXJjaHw0fHxza2lsbGVkJTIwd29ya2VyfGVufDB8fHx8MTcyMTM3MDMzM3ww&ixlib=rb-4.0.3&q=80&w=1080' }}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                {/* Dark Overlay */}
                <View style={styles.overlay} />

                <SafeAreaView style={styles.contentContainer}>

                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>The Make Connect</Text>
                        <View style={styles.placeholder} />
                    </View>

                    {/* Main Content */}
                    <View style={styles.mainContent}>
                        <Text style={styles.title}>Enter Verification Code</Text>
                        <Text style={styles.subtitle}>
                            A 6-digit code has been sent to{'\n'}{phoneNumber}
                        </Text>

                        {/* SMS Listening Indicator */}
                        <View style={styles.smsIndicator}>
                            <MaterialIcons name="sms" size={20} color="#30E0A1" />
                            <Text style={styles.smsText}>Listening for SMS...</Text>
                        </View>

                        {/* OTP Input Fields */}
                        <View style={styles.otpContainer}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => (inputRefs.current[index] = ref)}
                                    style={[
                                        styles.otpInput,
                                        digit && styles.otpInputFilled
                                    ]}
                                    value={digit}
                                    onChangeText={(value) => handleOtpChange(value, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    selectTextOnFocus
                                />
                            ))}
                        </View>

                        {/* Resend Code */}
                        <View style={styles.resendContainer}>
                            <Text style={styles.resendText}>Didn't receive a code?</Text>
                            <TouchableOpacity
                                onPress={handleResend}
                                disabled={timer > 0}
                            >
                                <Text style={[
                                    styles.resendButton,
                                    timer > 0 && styles.resendButtonDisabled
                                ]}>
                                    {timer > 0 ? `Resend in 00:${timer.toString().padStart(2, '0')}` : 'Resend'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Actions */}
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={[
                                styles.verifyButton,
                                !isOtpComplete && styles.verifyButtonDisabled
                            ]}
                            onPress={handleVerify}
                            disabled={!isOtpComplete}
                        >
                            <Text style={styles.verifyButtonText}>Verify</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.changeNumberText}>Change Number?</Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    placeholder: {
        width: 40,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    smsIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginVertical: 16,
    },
    smsText: {
        color: '#30E0A1',
        fontSize: 14,
        fontWeight: '500',
    },
    otpContainer: {
        flexDirection: 'row',
        gap: 12,
        marginVertical: 20,
        maxWidth: 400,
    },
    otpInput: {
        flex: 1,
        height: 56,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(26, 26, 26, 0.5)',
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    otpInputFilled: {
        borderColor: '#30E0A1',
    },
    resendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 24,
    },
    resendText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
    },
    resendButton: {
        color: '#30E0A1',
        fontSize: 14,
        fontWeight: 'bold',
    },
    resendButtonDisabled: {
        color: 'rgba(48, 224, 161, 0.5)',
    },
    actions: {
        marginTop: 'auto',
        paddingTop: 32,
    },
    verifyButton: {
        backgroundColor: '#30E0A1',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    verifyButtonDisabled: {
        backgroundColor: 'rgba(48, 224, 161, 0.4)',
    },
    verifyButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    changeNumberText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default OTPScreen;
