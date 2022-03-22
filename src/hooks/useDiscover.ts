import { useState } from 'react';
import { ReducerTypes } from './../types/reducerTypes';
import { useSelector, useDispatch } from 'react-redux';
import { setDiscoverShows } from '../actions/discover';
import moment from 'moment';
import mseries from '../apis/mseries';
import tmdb from '../apis/tmdb';

const useDiscover = () => {
  const { userGenres } = useSelector(({ show }: ReducerTypes) => show);
  const [loading, setLoading] = useState(false);
  const [moreDiscoverShows, setMoreDiscoverShows] = useState([]);

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

  const getMoreDiscoverShows = async (listParams: any, page: number) => {
    try {
      if (listParams == 'trending' || listParams == 'anticipated') {
        return listParams == 'trending'
          ? await getMoreTrending(page)
          : await getMoreAnticipated(page);
      } else {
        return listParams.type == 'genre'
          ? await getMoreGenre(listParams.id, page)
          : await getMoreSimilarShows(listParams.id, page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreTrending = async (page: number) => {
    try {
      const { data } = await tmdb.get('/trending/tv/day', {
        params: {
          page,
        },
      });
      return data.results;
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreAnticipated = async (page: number) => {
    try {
      const { data } = await tmdb.get('/discover/tv', {
        params: {
          page,
          'first_air_date.gte': moment().add('1', 'day').format('YYYY-MM-DD'),
          with_status: '1|2|5',
        },
      });
      return data.results;
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreGenre = async (genreId: string, page: number) => {
    try {
      const { data } = await tmdb.get('/discover/tv', {
        params: {
          with_genres: genreId,
          page,
        },
      });

      return data.results;
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreSimilarShows = async (showId: string, page: number) => {
    try {
      const { data } = await tmdb.get(`/tv/${showId}/recommendations`);
      return data.results;
    } catch (error) {
      console.log(error);
    }
  };

  return { loading, getDiscoverShows, getMoreDiscoverShows };
};

export default useDiscover;
