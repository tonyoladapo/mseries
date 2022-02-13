import { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const useAuth = () => {
  const [initializing, setInitializing] = useState(true);
  const [authenticating, setAuthenticating] = useState(false);

  const dispatch = useDispatch();

  const authWithGoogle = async () => {
    try {
      setAuthenticating(true);

      GoogleSignin.configure({
        webClientId:
          '59788347672-kbana444ekcar8drebh1q178ft9b60er.apps.googleusercontent.com',
      });

      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(credential);
    } catch (error) {
      console.log(error);
    }
  };

  const authAnonymously = async () => {
    try {
      setAuthenticating(true);

      await auth().signInAnonymously();
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const authStateListener = (user: FirebaseAuthTypes.User | null) => {
    // dispatch(setUser(user));
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
