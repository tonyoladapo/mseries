import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default () => {
  const uid = auth().currentUser?.uid;
  const userDataRef = firestore().collection('userData').doc(uid);

  return { userDataRef };
};
