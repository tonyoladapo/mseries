import { useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated, setIsNewUser } from '../actions/pref';
import { setUser } from '../actions/auth';
import {
  setUserGenres,
  setUserShows,
  setUnwatched,
  setUnwatchedCollection,
} from '../actions/show';
import { setDiscoverShows } from '../actions/discover';
//@ts-ignore
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from 'react-native-dotenv';
import useShow from './useShow';
import useDiscover from './useDiscover';

const useAuth = () => {
  const [initializing, setInitializing] = useState(true);
  const [authenticating, setAuthenticating] = useState(false);

  const { getInitialUnwatched } = useShow();
  const { getDiscoverShows } = useDiscover();

  const dispatch = useDispatch();

  const authWithGoogle = async () => {
    try {
      setAuthenticating(true);

      GoogleSignin.configure({
        iosClientId: IOS_CLIENT_ID,
        webClientId: WEB_CLIENT_ID,
      });

      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);

      const { additionalUserInfo } = await auth().signInWithCredential(
        credential,
      );

      dispatch(setIsNewUser(additionalUserInfo?.isNewUser));

      !additionalUserInfo?.isNewUser && getInitialUnwatched();

      await getDiscoverShows();

      setAuthenticating(false);
      dispatch(setIsAuthenticated(true));
    } catch (error) {
      console.log(error);
      setAuthenticating(false);
    }
  };

  const authAnonymously = async () => {
    try {
      await auth().signInAnonymously();
      dispatch(setIsNewUser(true));

      await getDiscoverShows();

      setAuthenticating(false);
      dispatch(setIsAuthenticated(true));
    } catch (error) {
      console.log(error);
      setAuthenticating(false);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      dispatch(setDiscoverShows([]));
      dispatch(setUserGenres([]));
      dispatch(setUserShows([]));
      dispatch(setUnwatched([]));
      dispatch(setUnwatchedCollection({}));

      dispatch(setIsAuthenticated(false));
    } catch (error) {
      console.error(error);
    }
  };

  const authStateListener = (user: FirebaseAuthTypes.User | null) => {
    if (initializing) setInitializing(false);
    setAuthenticating(false);
  };

  return {
    initializing,
    authenticating,
    authWithGoogle,
    authAnonymously,
    authStateListener,
    signOut,
  };
};

export default useAuth;
