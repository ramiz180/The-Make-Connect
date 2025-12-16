import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Auth screens
import SplashScreen from "../screens/Common/SplashScreen";
import WelcomeScreen from "../screens/Common/WelcomeScreen";
import OTPScreen from "../screens/Common/OTPScreen";
import RoleSelectionScreen from "../screens/Common/RoleSelectionScreen";


// Location
import EnterNameScreen from "../screens/customer/EnterNameScreen";
import CustomerSetLocationScreen from "../screens/customer/CustomerSetLocationScreen";
import WorkerSetLocationScreen from "../screens/worker/WorkerSetLocationScreen";
import WorkerSearchLocationScreen from "../screens/worker/WorkerSearchLocationScreen";

import SearchLocationScreen from "../screens/customer/SearchLocationScreen";











// Customer Screens
import CustomerHome from "../screens/customer/CustomerHome";
import WorkerList from "../screens/customer/WorkerList";
import CustomerBookingConfirm from "../screens/customer/CustomerBookingConfirm";

// Worker Setup Navigator
import WorkerSetupNavigator from "./WorkerSetupNavigator";

// Worker Screens
import WorkerHome from "../screens/worker/WorkerHome";
import WorkerChatScreen from "../screens/worker/WorkerChatScreen";

import VerificationStatus from "../screens/worker/VerificationStatus";
import AddService from "../screens/worker/AddService";
import MyServices from "../screens/worker/MyServices";
import WorkerBookingScreen from "../screens/worker/BookingScreen";
import WorkerChatList from "../screens/worker/ChatScreen";
import WorkerProfile from "../screens/worker/WorkerProfile";
import EditWorkerProfile from "../screens/worker/EditWorkerProfile";
import WorkerEnterName from '../screens/worker/WorkerEnterNameScreen';

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
        <Stack.Screen name="EnterName" component={EnterNameScreen} />
        <Stack.Screen name="CustomerSetLocation" component={CustomerSetLocationScreen} />
        <Stack.Screen name="WorkerSetLocationScreen" component={WorkerSetLocationScreen} />
        <Stack.Screen
          name="WorkerSearchLocationScreen"
          component={WorkerSearchLocationScreen}
        />




        {/* LOCATION (COMMON FOR ALL) */}
        <Stack.Screen name="SearchLocation" component={SearchLocationScreen} />
       
        














        {/* CUSTOMER */}
        <Stack.Screen name="CustomerHome" component={CustomerHome} />
        <Stack.Screen name="WorkerList" component={WorkerList} />
        <Stack.Screen name="CustomerBookingConfirm" component={CustomerBookingConfirm} />

        {/* WORKER SETUP */}
        <Stack.Screen name="WorkerSetup" component={WorkerSetupNavigator} />

        {/* WORKER */}
        <Stack.Screen name="WorkerHome" component={WorkerHome} />
        <Stack.Screen name="WorkerChatScreen" component={WorkerChatScreen} />
        <Stack.Screen name="WorkerChatList" component={WorkerChatList} />
        <Stack.Screen name="WorkerProfile" component={WorkerProfile} />
        <Stack.Screen name="EditWorkerProfile" component={EditWorkerProfile} />
        <Stack.Screen
          name="WorkerEnterName"
          component={WorkerEnterName}
        />

        <Stack.Screen name="VerificationStatus" component={VerificationStatus} />
        <Stack.Screen name="AddService" component={AddService} />
        <Stack.Screen name="MyServices" component={MyServices} />
        <Stack.Screen name="WorkerBookingScreen" component={WorkerBookingScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
