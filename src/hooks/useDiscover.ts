import { ReducerTypes } from './../types/reducerTypes';
import mseries from '../apis/mseries';
import { useSelector } from 'react-redux';

const useDiscover = () => {
  const { userGenres } = useSelector(({ show }: ReducerTypes) => show);

  const getDiscoverShows = async () => {
    try {
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

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return { getDiscoverShows };
};

export default useDiscover;
