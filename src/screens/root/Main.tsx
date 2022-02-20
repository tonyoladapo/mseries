import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserGenres } from '../../actions/show';
import docRef from '../../firebase/docRef';
import BottomTab from '../../navigators/BottomTab';

const Main = () => {
  const dispatch = useDispatch();
  const { userDataRef } = docRef();

  useEffect(() => {
    const regGenresSnapshot = async () => {
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

    regGenresSnapshot();
  }, []);

  return <BottomTab />;
};

export default Main;
