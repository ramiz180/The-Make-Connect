import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Auth screens
import SplashScreen from "../screens/Common/SplashScreen";
import WelcomeScreen from "../screens/Common/WelcomeScreen";
import OTPScreen from "../screens/Common/OTPScreen";
import RoleSelectionScreen from "../screens/Common/RoleSelectionScreen";


// Location
import CustomerSetLocationScreen from "../screens/customer/CustomerSetLocationScreen";
import WorkerSetLocationScreen from "../screens/worker/WorkerSetLocationScreen";

// Customer Screens + Tabs
import CustomerTabs from "./CustomerTabs";
import WorkerList from "../screens/customer/WorkerList";
import WorkerProfile from "../screens/customer/WorkerProfile";
import ChatScreen from "../screens/customer/ChatScreen";
import RateReviewScreen from "../screens/customer/RateReviewScreen";

// Worker Setup Navigator
import WorkerSetupNavigator from "./WorkerSetupNavigator";

// Worker Screens
import WorkerHome from "../screens/worker/WorkerHome";
import WorkerChatScreen from "../screens/worker/WorkerChatScreen";
import EditWorkerProfile from "../screens/worker/EditWorkerProfile";
import VerificationStatus from "../screens/worker/VerificationStatus";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">

        {/* AUTH */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />

        {/* LOCATION */}
        <Stack.Screen name="CustomerSetLocation" component={CustomerSetLocationScreen} />
        <Stack.Screen name="WorkerSetLocationScreen" component={WorkerSetLocationScreen} />

        {/* CUSTOMER */}
        <Stack.Screen name="CustomerTabs" component={CustomerTabs} />
        <Stack.Screen name="WorkerList" component={WorkerList} />
        <Stack.Screen name="WorkerProfile" component={WorkerProfile} />
        <Stack.Screen name="CustomerChat" component={ChatScreen} />
        <Stack.Screen name="RateReview" component={RateReviewScreen} />

        {/* WORKER SETUP */}
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
