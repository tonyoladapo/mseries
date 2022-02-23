import { DiscoverShow, Show } from './show';
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
  userShows: Show[];
}
export interface DiscoverReducer {
  discoverShows: Discover[];
}

export interface Discover {
  listTitle: string;
  shows: DiscoverShow[];
  genre_id?: string;
  show_id?: string;
}

export interface Genre {
  id: number;
  name: string;
}
