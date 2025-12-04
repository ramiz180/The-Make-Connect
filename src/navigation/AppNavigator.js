import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Auth
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';
import RoleSelectionScreen from '../screens/RoleSelectionScreen';

// Location
import SetLocationScreen from "../screens/SetLocationScreen";

// Customer
import CustomerHome from "../screens/customer/CustomerHome";
import WorkerList from "../screens/customer/WorkerList";
import WorkerProfile from "../screens/customer/WorkerProfile";
import ChatScreen from "../screens/customer/ChatScreen";
import RateReviewScreen from "../screens/customer/RateReviewScreen";

// Worker Setup (Navigator)
import WorkerSetupNavigator from "./WorkerSetupNavigator";

// Worker Flow
import WorkerHome from "../screens/worker/WorkerHome";
import WorkerChatScreen from "../screens/worker/WorkerChatScreen";
import EditWorkerProfile from "../screens/worker/EditWorkerProfile";
import VerificationStatus from "../screens/worker/VerificationStatus";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>

        {/* AUTH */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />

        {/* LOCATION */}
        <Stack.Screen name="SetLocation" component={SetLocationScreen} />

        {/* CUSTOMER */}
        <Stack.Screen name="CustomerHome" component={CustomerHome} />
        <Stack.Screen name="WorkerList" component={WorkerList} />
        <Stack.Screen name="WorkerProfile" component={WorkerProfile} />
        <Stack.Screen name="CustomerChat" component={ChatScreen} />
        <Stack.Screen name="RateReview" component={RateReviewScreen} />

        {/* WORKER SETUP FLOW */}
        <Stack.Screen name="WorkerSetup" component={WorkerSetupNavigator} />

        {/* WORKER */}
        <Stack.Screen name="WorkerHome" component={WorkerHome} />
        <Stack.Screen name="WorkerChat" component={WorkerChatScreen} />
        <Stack.Screen name="EditWorkerProfile" component={EditWorkerProfile} />
        <Stack.Screen name="VerificationStatus" component={VerificationStatus} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
