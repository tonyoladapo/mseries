import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Main: undefined;
  Setup: undefined;
  Genres: undefined;
  DiscoverMore: ListParams;
  ShowDetails: {
    showId: string | number;
    title?: string;
  };
  Search: undefined;
};

export interface ListParams {
  listParams:
    | 'trending'
    | 'anticipated'
    | {
        id: string;
        type: 'genre' | 'show';
      };
}

export type SetupStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Shows: undefined;
  Discover: undefined;
  More: undefined;
};

export type SetupNavigationProp = StackNavigationProp<SetupStackParamList>;
export type RootNavigationProp = StackNavigationProp<RootStackParamList>;
export type BottomNavigationProp = BottomTabNavigationProp<BottomTabParamList>;
