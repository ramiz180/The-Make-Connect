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
import BookingScreen from "../screens/customer/BookingScreen";  // ✅ Added
import OrderSummaryScreen from "../screens/customer/OrderSummaryScreen";
import PaymentScreen from "../screens/customer/PaymentScreen";
import OrderSuccess from "../screens/customer/OrderSuccess";
import MessagesScreen from "../screens/customer/MessagesScreen";



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
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />

        <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
        <Stack.Screen name="Messages" component={MessagesScreen} />




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
