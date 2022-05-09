import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../types/reducerTypes';
import { RootStackParamList } from '../types/navigation';
import { appTheme } from '../constants/appTheme';
import { colors } from '../values/colors';
import auth from '@react-native-firebase/auth';
import useAuth from '../hooks/useAuth';
import Main from '../screens/root/Main';
import Genres from '../screens/root/Genres';
import DiscoverMore from '../screens/root/DiscoverMore';
import ShowDetails from '../screens/root/ShowDetails';
import Search from '../screens/root/Search';
import SeasonDetails from '../screens/root/SeasonDetails';
import Welcome from '../screens/root/Welcome';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Root = () => {
  const { isAuthenticated } = useSelector(({ auth, pref }: ReducerTypes) => ({
    ...auth,
    ...pref,
  }));

  const { authStateListener, initializing } = useAuth();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authStateListener);
    return subscriber;
  }, []);

  if (initializing) return null;

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
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: colors.primaryBackground,
            },
          }}>
          {!isAuthenticated ? (
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerTitle: '' }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Main"
                component={Main}
                options={{ headerShown: false }}
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

              <Stack.Screen
                name="DiscoverMore"
                component={DiscoverMore}
                options={({ route }) => ({
                  headerTitle: route.params.listTitle,
                })}
              />

              <Stack.Screen
                name="ShowDetails"
                component={ShowDetails}
                options={{
                  title: '',
                }}
              />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen
                name="SeasonDetails"
                component={SeasonDetails}
                options={({ route }) => ({
                  title: route.params.seasonName,
                })}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Root;
