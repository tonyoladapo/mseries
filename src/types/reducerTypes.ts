import { DiscoverShow } from './show';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
export interface ReducerTypes {
  pref: PrefReducer;
  auth: AuthReducer;
  show: ShowReducer;
  discover: DiscoverReducer;
}

export interface PrefReducer {
  firstRun: boolean;
  setupComplete: boolean;
  isAuthenticated: boolean;
  isNewUser: boolean | undefined;
}

export interface AuthReducer {
  user: FirebaseAuthTypes.User | null;
}

export interface ShowReducer {
  genres: Genre[];
  userGenres: Genre[];
}
export interface DiscoverReducer {
  discoverShows: DiscoverShow[];
}

export interface Genre {
  id: number;
  name: string;
}
