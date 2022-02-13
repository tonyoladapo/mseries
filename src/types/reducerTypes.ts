import { FirebaseAuthTypes } from '@react-native-firebase/auth';
export interface ReducerTypes {
  pref: PrefReducer;
  auth: AuthReducer;
}

export interface PrefReducer {
  firstRun: boolean;
}

export interface AuthReducer {
  user: FirebaseAuthTypes.User | null;
}
