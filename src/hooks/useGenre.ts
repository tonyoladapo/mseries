import { Genre } from './../types/show';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setIsNewUser, setSetupComplete } from '../actions/pref';
import { setUserGenres } from '../actions/show';
import { BottomNavigationProp } from '../types/navigation';
import docRef from '../firebase/docRef';
import firestore from '@react-native-firebase/firestore';

const useGenre = () => {
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const dispatch = useDispatch();
  const { userDataRef } = docRef();
  const { goBack, navigate } = useNavigation<BottomNavigationProp>();

  const addGenre = async (genre: Genre) => {
    try {
      setSelectedGenres([...selectedGenres, genre]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeGenre = async (genre: Genre) => {
    try {
      setSelectedGenres(selectedGenres.filter((g: Genre) => g.id !== genre.id));
    } catch (error) {
      console.log(error);
    }
  };

  const saveGenres = async () => {
    try {
      goBack();

      const batch = firestore().batch();

      selectedGenres.map(genre => {
        batch.set(
          userDataRef.collection('user_genres').doc(genre.id.toString()),
          genre,
        );
      });

      await batch.commit();

      dispatch(setUserGenres(selectedGenres));
      dispatch(setIsNewUser(false));
      dispatch(setSetupComplete(true));

      navigate('Discover');
    } catch (error) {
      console.log(error);
    }
  };

  return { addGenre, removeGenre, selectedGenres, saveGenres };
};

export default useGenre;
