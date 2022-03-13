import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../types/reducerTypes';
import { RootStackParamList } from '../types/navigation';
import { appTheme } from '../constants/appTheme';
import { colors } from '../values/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import useAuth from '../hooks/useAuth';
import Setup from './Setup';
import Main from '../screens/root/Main';
import Genres from '../screens/root/Genres';
import DiscoverMore from '../screens/root/DiscoverMore';
import ShowDetails from '../screens/root/ShowDetails';
import Search from '../screens/root/Search';

const Stack = createStackNavigator<RootStackParamList>();

const Root = () => {
  const { isAuthenticated } = useSelector(({ auth, pref }: ReducerTypes) => ({
    ...auth,
    ...pref,
  }));

  const { authStateListener } = useAuth();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authStateListener);
    return subscriber;
  }, []);

  return (
    <>
      <StatusBar
        animated
        translucent
        barStyle={'light-content'}
        backgroundColor={colors.transparent}
      />
      <NavigationContainer theme={appTheme}>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <Icon name="left" size={24} color={colors.primaryText} />
            ),
          }}>
          {!isAuthenticated ? (
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
                options={{ headerShown: false, title: 'Home' }}
              />

              <Stack.Screen
                name="Genres"
                component={Genres}
                options={{
                  presentation: 'modal',
                  headerShown: false,
                  gestureEnabled: false,
                }}
              />

              <Stack.Screen name="DiscoverMore" component={DiscoverMore} />
              <Stack.Screen name="ShowDetails" component={ShowDetails} />
              <Stack.Screen
                name="Search"
                component={Search}
                options={{
                  headerStyle: { backgroundColor: colors.transparent },
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Root;
