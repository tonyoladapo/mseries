import { useState } from 'react';
import { ReducerTypes } from './../types/reducerTypes';
import { useSelector, useDispatch } from 'react-redux';
import { setDiscoverShows } from '../actions/discover';
import mseries from '../apis/mseries';

const useDiscover = () => {
  const { userGenres, userShows } = useSelector(
    ({ show }: ReducerTypes) => show,
  );
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getDiscoverShows = async () => {
    try {
      setLoading(true);

      function getRandom() {
        let maxIdx = 5;
        let result = new Array(maxIdx),
          len = userShows.length,
          taken = new Array(len);

        while (maxIdx--) {
          let x = Math.floor(Math.random() * len);
          result[maxIdx] = {
            id: userShows[x in taken ? taken[x] : x].id,
            name: userShows[x in taken ? taken[x] : x].name,
          };
          taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
      }

      const similarShows = userShows.length >= 5 ? getRandom() : [];
      const genres = userGenres.length > 0 ? userGenres : [];

      const { data } = await mseries.post('/discover', {
        genres,
        similarShows,
      });

      dispatch(setDiscoverShows(data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getDiscoverShows };
};

export default useDiscover;
