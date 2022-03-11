import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/navigation';
import { colors } from '../values/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/bottomTab/Home';
import Shows from '../screens/bottomTab/Shows';
import Discover from '../screens/bottomTab/Discover';
import More from '../screens/bottomTab/More';
import AnimatedHeader from '../components/AnimatedHeader';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="none"
      screenOptions={{
        header: props => <AnimatedHeader {...props} />,
        tabBarStyle: { backgroundColor: colors.primaryBackground },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Shows"
        component={Shows}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="television-classic" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="dots-horizontal" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
