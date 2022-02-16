import tmdb from '../apis/tmdb';
import { setGenres } from './../actions/show';
import { useDispatch } from 'react-redux';
//@ts-ignore
import { TMDB_API_KEY } from 'react-native-dotenv';

const useSetup = () => {
  const dispatch = useDispatch();

  const getGenres = async () => {
    try {
      const { data } = await tmdb.get('/genre/tv/list', {
        params: {
          api_key: TMDB_API_KEY,
        },
      });

      dispatch(setGenres(data.genres));
    } catch (error) {
      console.log(error);
    }
  };

  return { getGenres };
};

export default useSetup;
