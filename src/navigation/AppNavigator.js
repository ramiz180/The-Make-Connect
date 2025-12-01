import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import SetLocationScreen from "../screens/SetLocationScreen";
import WorkerSetupScreen from "../screens/WorkerSetupScreen";
import CustomerHomeScreen from "../screens/CustomerHomeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />

        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="SetLocation" component={SetLocationScreen} />

        {/* MAIN ROUTES */}
        <Stack.Screen name="WorkerSetup" component={WorkerSetupScreen} />
        <Stack.Screen name="CustomerHome" component={CustomerHomeScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
