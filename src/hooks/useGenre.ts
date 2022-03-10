import { Genre } from './../types/show';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsNewUser, setSetupComplete } from '../actions/pref';
import docRef from '../firebase/docRef';
import firestore from '@react-native-firebase/firestore';

const useGenre = () => {
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const dispatch = useDispatch();
  const { userDataRef } = docRef();

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
      const batch = firestore().batch();

      selectedGenres.map(genre => {
        batch.set(
          userDataRef.collection('user_genres').doc(genre.id.toString()),
          genre,
        );
      });

      await batch.commit();

      dispatch(setIsNewUser(false));
      dispatch(setSetupComplete(true));
    } catch (error) {
      console.log(error);
    }
  };

  return { addGenre, removeGenre, selectedGenres, saveGenres };
};

export default useGenre;
