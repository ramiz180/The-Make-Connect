import React from 'react';
import { View, Text } from 'react-native';

export default function WorkerSetupScreen({ route }) {
  const { userId } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Worker Setup Screen</Text>
      <Text>User ID: {userId}</Text>
    </View>
  );
}
