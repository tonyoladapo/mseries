import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/navigation';
import Home from '../screens/bottomTab/Home';
import Shows from '../screens/bottomTab/Shows';
import Discover from '../screens/bottomTab/Discover';
import More from '../screens/bottomTab/More';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shows" component={Shows} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

export default BottomTab;
