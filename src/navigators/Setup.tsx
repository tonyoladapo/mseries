import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SetupStackParamList } from '../types/navigation';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../types/reducerTypes';
import Welcome from '../screens/setup/Welcome';
import SignIn from '../screens/setup/SignIn';

const Stack = createNativeStackNavigator<SetupStackParamList>();

const Setup = () => {
  const { firstRun } = useSelector(({ pref }: ReducerTypes) => pref);

  return (
    <Stack.Navigator
      initialRouteName={firstRun ? 'Welcome' : 'SignIn'}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

export default Setup;
