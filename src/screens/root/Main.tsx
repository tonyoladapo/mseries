import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserGenres, setUserShows, setUnwatched } from '../../actions/show';
import { ReducerTypes } from '../../types/reducerTypes';
import useSync from '../../hooks/useSync';
import docRef from '../../firebase/docRef';
import BottomTab from '../../navigators/BottomTab';

const Main = () => {
  const { sync } = useSync();

  const dispatch = useDispatch();
  const { unwatchedCollection } = useSelector(({ show }: ReducerTypes) => show);

  const { userDataRef } = docRef();

  const registerShowsSnapshot = () => {
    try {
      userDataRef.collection('user_shows').onSnapshot(querySnapshot => {
        if (!querySnapshot) return;

        const data: any[] = [];

        querySnapshot.forEach(doc => {
          data.push(doc.data());
        });

        dispatch(setUserShows(data));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sync();
  }, []);

  useEffect(() => {
    let arr: any[] = [];

    Object.keys(unwatchedCollection).map(key => {
      arr.push(unwatchedCollection[key]);
    });

    dispatch(setUnwatched(arr));
  }, [unwatchedCollection]);

  useEffect(() => {
    registerShowsSnapshot();
  }, []);

  return <BottomTab />;
};

export default Main;
