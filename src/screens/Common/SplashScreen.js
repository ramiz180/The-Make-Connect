import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        // Simulate loading process
        const timer = setTimeout(() => {
            navigation.replace('Welcome');
        }, 3000); // Wait for 3 seconds

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            {/* Background Image with Overlay */}
            <ImageBackground
                source={require('../../../assets/splash_bg.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                {/* Gradient Overlay */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)', '#000000']}
                    style={styles.gradient}
                />

                {/* Content */}
                <View style={styles.contentContainer}>

                    {/* Logo Circle */}
                    <View style={styles.logoWrapper}>
                        <View style={styles.logoInner}>
                            {/* Using a text icon for now, can be replaced with an SVG or Image */}
                            <Text style={styles.iconText}>🛠️</Text>
                        </View>
                    </View>

                    {/* Text Content */}
                    <Text style={styles.appName}>The Make Connect</Text>
                    <Text style={styles.tagline}>Connecting you with skilled workers nearby.</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Fallback color
    },
    backgroundImage: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'flex-end', // Align content to bottom
        alignItems: 'center',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '70%', // Cover bottom 70% of the screen
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 80, // Space from bottom
        paddingHorizontal: 20,
        width: '100%',
    },
    logoWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderWidth: 2,
        borderColor: 'rgba(52, 211, 153, 0.5)', // Primary green with opacity
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        backdropFilter: 'blur(10px)', // Note: backdropFilter might not work on all RN versions, but harmless
    },
    logoInner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(52, 211, 153, 0.2)', // Primary green low opacity
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 40,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
        textAlign: 'center',
        // Font family would go here if we had custom fonts loaded
    },
    tagline: {
        fontSize: 16,
        color: '#D1D5DB', // Gray-300
        textAlign: 'center',
        fontWeight: '400',
    },
});
