import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setUserGenres,
  setUserShows,
  setUnwatched,
  setUnwatchedCollection,
} from '../../actions/show';
import { syncShows } from '../../hooks/useShow';
//@ts-ignore
// import BackgroundTask from 'react-native-background-task';
import docRef from '../../firebase/docRef';
import BottomTab from '../../navigators/BottomTab';

// BackgroundTask.define(async () => {
//   syncShows();
//   BackgroundTask.finish();
// });

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

  const registerUnwatchedShowsSnapshot = () => {
    try {
      userDataRef.collection('unwatched_shows').onSnapshot(querySnapshot => {
        if (!querySnapshot) return;

        const data: any[] = [];
        let collection = {};

        querySnapshot.forEach(doc => {
          data.push(doc.data());
          collection = { ...collection, [doc.data().id]: doc.data() };
        });

        dispatch(setUnwatchedCollection(collection));
        dispatch(setUnwatched(data));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const registerGenresSnapshot = async () => {
    try {
      userDataRef.collection('user_genres').onSnapshot(querySnapshot => {
        if (!querySnapshot) return;

        const data: any = [];

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
    // BackgroundTask.schedule({
    //   period: 86400,
    // });
    // BackgroundTask.cancel();

    registerGenresSnapshot();
    registerShowsSnapshot();
    registerUnwatchedShowsSnapshot();
  }, []);

  return <BottomTab />;
};

export default Main;
