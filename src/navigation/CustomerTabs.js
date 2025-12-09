import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomerHome from "../screens/customer/CustomerHome";
import WorkerList from "../screens/customer/WorkerList";
import ChatScreen from "../screens/customer/ChatScreen";
import RateReviewScreen from "../screens/customer/RateReviewScreen";
import BookingScreen from "../screens/customer/BookingScreen";  // ✅ Added

const Tab = createBottomTabNavigator();

export default function CustomerTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={CustomerHome} />
      <Tab.Screen name="Workers" component={WorkerList} />
      
      {/* ✅ Added Booking Screen */}
      <Tab.Screen name="BookingScreen" component={BookingScreen} />


      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Reviews" component={RateReviewScreen} />
    </Tab.Navigator>
  );
}
