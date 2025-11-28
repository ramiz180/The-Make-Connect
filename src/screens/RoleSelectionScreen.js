import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoleSelectionScreen({ navigation }) {

    const handleSelectRole = (role) => {
        // In a real app, we would save this role to the backend or local storage.
        // For now, we just navigate to the next screen based on the role.
        if (role === 'CUSTOMER') {
            // Navigate to Customer Home (we will build this later)
            // For now, let's just go to a placeholder
            alert('Selected Customer. Next: Location Setup');
            // navigation.replace('CustomerHome'); 
        } else {
            // Navigate to Worker Setup
            alert('Selected Worker. Next: Worker Setup Wizard');
            // navigation.replace('WorkerSetup');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Choose your Role</Text>
                <Text style={styles.subtitle}>How do you want to use Make Connect?</Text>

                <TouchableOpacity style={styles.card} onPress={() => handleSelectRole('CUSTOMER')}>
                    <View style={styles.iconPlaceholder}><Text style={styles.iconText}>👤</Text></View>
                    <View>
                        <Text style={styles.cardTitle}>I want to Hire</Text>
                        <Text style={styles.cardDesc}>Find workers for your needs.</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => handleSelectRole('WORKER')}>
                    <View style={styles.iconPlaceholder}><Text style={styles.iconText}>🛠️</Text></View>
                    <View>
                        <Text style={styles.cardTitle}>I want to Work</Text>
                        <Text style={styles.cardDesc}>Offer your skills and earn.</Text>
                    </View>
                </TouchableOpacity>

            </View>
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#eee',
    },
    iconPlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: '#e1f0ff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    iconText: {
        fontSize: 24,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardDesc: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});
