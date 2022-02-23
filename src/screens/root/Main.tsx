import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserGenres, setUserShows } from '../../actions/show';
import docRef from '../../firebase/docRef';
import BottomTab from '../../navigators/BottomTab';

const Main = () => {
  const dispatch = useDispatch();
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

  const registerGenresSnapshot = async () => {
    try {
      userDataRef.collection('user_genres').onSnapshot(querySnapshot => {
        if (!querySnapshot) return;

        const data: any[] = [];

        querySnapshot.forEach((doc: any) => {
          data.push(doc.data());
        });

        dispatch(setUserGenres(data));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    registerGenresSnapshot();
    registerShowsSnapshot();
  }, []);

  return <BottomTab />;
};

export default Main;
