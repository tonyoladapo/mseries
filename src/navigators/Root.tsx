import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../types/reducerTypes';
import { RootStackParamList } from '../types/navigation';
import auth from '@react-native-firebase/auth';
import useAuth from '../hooks/useAuth';
import Setup from './Setup';
import Main from '../screens/root/Main';
import prefReducer from '../reducers/pref';

const Stack = createStackNavigator<RootStackParamList>();

const Root = () => {
  const { user } = useSelector(({ auth }: ReducerTypes) => auth);

  const { authStateListener } = useAuth();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authStateListener);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name="Setup"
            component={Setup}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
