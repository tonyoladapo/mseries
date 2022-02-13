import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Setup = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Setup" component={SetupScreen} />
    </Stack.Navigator>
  );
};

const SetupScreen = () => {
  return <></>;
};

export default Setup;
