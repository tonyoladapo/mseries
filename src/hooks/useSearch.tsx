import { useDispatch } from 'react-redux';
import { setSearchResults, toggleSearchLoading } from '../actions/search';
import tmdb from '../apis/tmdb';

const useSearch = () => {
  const dispatch = useDispatch();

  const searchShow = async (query: string) => {
    try {
      dispatch(toggleSearchLoading(true));

      const { data } = await tmdb.get('/search/tv', {
        params: {
          query,
        },
      });

      dispatch(setSearchResults(data.results));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleSearchLoading(false));
    }
  };

  return { searchShow };
};

export default useSearch;
