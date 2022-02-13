import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Main: undefined;
  Setup: undefined;
};

export type SetupStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
};

export type SetupNavigationProp = StackNavigationProp<SetupStackParamList>;
export type RootNavigationProp = StackNavigationProp<RootStackParamList>;
