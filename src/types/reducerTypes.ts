import { FirebaseAuthTypes } from '@react-native-firebase/auth';
export interface ReducerTypes {
  pref: PrefReducer;
  auth: AuthReducer;
  show: ShowReducer;
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

export interface Genre {
  id: number;
  name: string;
}
