import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { ReducerTypes } from '../../types/reducerTypes';

// BackgroundTask.define(async () => {
//   syncShows();
//   BackgroundTask.finish();
// });

const Main = () => {
  const { unwatchedCollection } = useSelector(({ show }: ReducerTypes) => show);

  const dispatch = useDispatch();
  const { userDataRef } = docRef();

  // const registerShowsSnapshot = () => {
  //   try {
  //     userDataRef.collection('user_shows').onSnapshot(querySnapshot => {
  //       if (!querySnapshot) return;

  //       const data: any[] = [];

  //       querySnapshot.forEach(doc => {
  //         data.push(doc.data());
  //       });

  //       dispatch(setUserShows(data));
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const registerUnwatchedShowsSnapshot = () => {
  //   try {
  //     userDataRef.collection('seasons').onSnapshot(querySnapshot => {
  //       if (!querySnapshot) return;

  //       let collection = {};

  //       querySnapshot.forEach(doc => {
  //         collection = { ...collection, [doc.data().id]: doc.data() };
  //       });

  //       dispatch(setUnwatchedCollection(collection));
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
    let arr: any[] = [];

    Object.keys(unwatchedCollection).forEach(key => {
      arr.push(unwatchedCollection[key]);
    });

    dispatch(setUnwatched(arr));
  }, [unwatchedCollection]);

  useEffect(() => {
    // BackgroundTask.schedule({
    //   period: 86400,
    // });
    // BackgroundTask.cancel();

    registerGenresSnapshot();
    // registerShowsSnapshot();
    // registerUnwatchedShowsSnapshot();
  }, []);

  return <BottomTab />;
};

export default Main;
