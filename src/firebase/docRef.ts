import { ReducerTypes } from './../types/reducerTypes';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

export default () => {
  const { user } = useSelector(({ auth }: ReducerTypes) => auth);
  const userDataRef = firestore().collection('userData').doc(user?.uid);

  return { userDataRef };
};
