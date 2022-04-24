import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../types/reducerTypes';
import { RootStackParamList } from '../types/navigation';
import { appTheme } from '../constants/appTheme';
import { colors } from '../values/colors';
import auth from '@react-native-firebase/auth';
import useAuth from '../hooks/useAuth';
import Setup from './Setup';
import Main from '../screens/root/Main';
import Genres from '../screens/root/Genres';
import DiscoverMore from '../screens/root/DiscoverMore';
import ShowDetails from '../screens/root/ShowDetails';
import Search from '../screens/root/Search';
import SeasonDetails from '../screens/root/SeasonDetails';
import Text from '../components/Text';

const Stack = createNativeStackNavigator<RootStackParamList>();

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

  const isIOS = Platform.OS === 'ios' || false;

  const headerTitle = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

    switch (routeName) {
      case 'Shows':
        return 'My Shows';

      default:
        return routeName;
    }
  };

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
              name="Setup"
              component={Setup}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Main"
                component={Main}
                options={({ route }) => ({
                  headerTitle: isIOS
                    ? headerTitle(route)
                    : () => (
                        <Text fontFamily="Black" style={{ fontSize: 30 }}>
                          {headerTitle(route)}
                        </Text>
                      ),
                  headerLargeTitle: true,
                  headerLargeTitleStyle: {
                    fontFamily: 'SFProDisplay-Black',
                    fontSize: 30,
                  },
                  headerTransparent: isIOS,
                })}
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
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="SeasonDetails" component={SeasonDetails} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Root;
