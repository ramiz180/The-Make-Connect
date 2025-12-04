import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WorkerBasicInfo from "../screens/workerSetup/WorkerBasicInfo";
import WorkerCategory from "../screens/workerSetup/WorkerCategory";
import WorkerPortfolio from "../screens/workerSetup/WorkerPortfolio";
import WorkerVerification from "../screens/workerSetup/WorkerVerification";
import WorkerRadius from "../screens/workerSetup/WorkerRadius";
import WorkerSetLocationScreen from "../screens/worker/WorkerSetLocationScreen";
const Stack = createNativeStackNavigator();

export default function WorkerSetupNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkerBasicInfo" component={WorkerBasicInfo} />
      <Stack.Screen name="WorkerCategory" component={WorkerCategory} />
      <Stack.Screen name="WorkerPortfolio" component={WorkerPortfolio} />
      <Stack.Screen name="WorkerVerification" component={WorkerVerification} />
      <Stack.Screen name="WorkerRadius" component={WorkerRadius} />
    </Stack.Navigator>
  );
}
