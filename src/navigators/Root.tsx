import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../types/reducerTypes';
import Setup from './Setup';
import Main from '../screens/Main';

const Stack = createStackNavigator();

const Root = () => {
  const { firstRun } = useSelector(({ pref }: ReducerTypes) => pref);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {firstRun ? (
          <Stack.Screen
            name="Setup"
            component={Setup}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen name="Main" component={Main} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
