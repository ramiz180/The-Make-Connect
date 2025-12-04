import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, StatusBar, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const WelcomeScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const isValid = phoneNumber.length === 10;

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar style="light" />

            {/* Background Image */}
            <ImageBackground
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhZXycYdRVRHF2S0CtbL_-C7k1agplW_MYBL6GaZEIgzdsyF0bgOb8ATVdZylRUjN73S4XR-bMaZe1vwLmdsrod7PhnHMIQNXrlFkqvoXb4nkKrkQRzzIoH_Z9Sot-SNfiFgLk6ZHx_XD1MvXJs1P0ohQ9B-4VRsMqBsvL19EF-da3PkOZbvAYNQgA4ir4jWcNYbCRZ7Z4Z2ON8mOwdTNicReRHgRp0VwhqtnuaDfKe5pgt0XyB1ulCiYymQKOu1AcK8K2nlveVyM' }}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                {/* Gradient Overlay */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)', '#000000']}
                    style={styles.gradient}
                    locations={[0, 0.6, 1]}
                >
                    <SafeAreaView style={styles.contentContainer}>

                        {/* Header */}
                        <View style={styles.header}>
                            <MaterialIcons name="hub" size={32} color="#31FE83" />
                            <Text style={styles.headerText}>The Make Connect</Text>
                        </View>

                        {/* Main Content */}
                        <View style={styles.mainContent}>
                            <Text style={styles.title}>Find Skilled Help, Right Next Door.</Text>
                        </View>

                        {/* Actions */}
                        <View style={styles.actions}>
                            {/* Phone Number Input */}
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your phone number"
                                placeholderTextColor="#a0b3a0"
                                keyboardType="phone-pad"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                maxLength={10}
                            />

                            <TouchableOpacity
                                style={[
                                    styles.primaryButton,
                                    !isValid && styles.primaryButtonDisabled,
                                ]}
                                onPress={() => navigation.navigate('OTP', { phoneNumber })}
                                disabled={!isValid}
                            >
                                <Text style={styles.primaryButtonText}>Continue</Text>
                            </TouchableOpacity>

                            <Text style={styles.footerText}>
                                By continuing, you agree to our <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>.
                            </Text>
                        </View>

                    </SafeAreaView>
                </LinearGradient>
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
    gradient: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 16,
        justifyContent: 'center',
    },
    headerText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    mainContent: {
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 24,
    },
    title: {
        color: '#ffffff',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 40,
    },
    actions: {
        width: '100%',
        maxWidth: 480,
        alignSelf: 'center',
        gap: 16,
        paddingBottom: 24,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(49, 254, 131, 0.3)',
        borderRadius: 12,
        height: 48,
        paddingHorizontal: 16,
        color: '#ffffff',
        fontSize: 16,
    },
    primaryButton: {
        backgroundColor: '#31FE83',
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    primaryButtonDisabled: {
        backgroundColor: 'rgba(49, 254, 131, 0.4)',
    },
    primaryButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerText: {
        color: '#a0b3a0',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 8,
    },
    linkText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export default WelcomeScreen;
