import { useState } from 'react';
import { ReducerTypes } from './../types/reducerTypes';
import { useSelector, useDispatch } from 'react-redux';
import { setDiscoverShows } from '../actions/discover';
import mseries from '../apis/mseries';

const useDiscover = () => {
  const { userGenres } = useSelector(({ show }: ReducerTypes) => show);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getDiscoverShows = async () => {
    try {
      setLoading(true);

      const similarShowIds = [
        { id: '60059', name: 'Better Call Saul' },
        { id: '1399', name: 'Game of Thrones' },
        { id: '60625', name: 'Rick and Morty' },
      ];

      const genreParams =
        userGenres.length > 0
          ? userGenres
          : [
              { id: '16', name: 'Animation' },
              { id: '35', name: 'Comedy' },
              { id: '10759', name: 'Action & Adventure' },
            ];

      const { data } = await mseries.get('/discover', {
        params: {
          genres: JSON.stringify(genreParams),
          similar_ids: JSON.stringify(similarShowIds),
        },
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
