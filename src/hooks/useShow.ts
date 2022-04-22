import { toggleAdded, toggleLoading, setSeasons } from '../actions/showDetails';
import {
  markEpWatched,
  markEpUnwatched,
  seasonUnwatched,
  seasonWatched,
  addShowToUnwatched,
  removeShowFromUnwatched,
} from '../actions/show';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerTypes } from '../types/reducerTypes';
import docRef from '../firebase/docRef';
import mseries from '../apis/mseries';

const useShow = (controller?: AbortController) => {
  const { userDataRef } = docRef();

  const { user } = useSelector(({ show, auth }: ReducerTypes) => ({
    ...show,
    ...auth,
  }));
  const dispatch = useDispatch();

  const checkAdded = async (id: string) => {
    try {
      const { exists } = await userDataRef
        .collection('user_shows')
        .doc(id.toString())
        .get();

      dispatch(toggleAdded(exists));
      return exists;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  const addShow = async (_show: any) => {
    try {
      dispatch(toggleLoading(true));

      const token = await user?.getIdToken();
      const { data } = await mseries.get(`/show/add/${_show.id}`, {
        headers: {
          token: typeof token === 'string' && token,
        },
      });

      dispatch(addShowToUnwatched(data));
      await checkAdded(_show.id.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const removeShow = async (id: string) => {
    try {
      const showId = id.toString();

      dispatch(toggleLoading(true));

      await userDataRef.collection('user_shows').doc(showId).delete();
      await userDataRef.collection('seasons').doc(showId).delete();

      dispatch(removeShowFromUnwatched(showId));
      await checkAdded(showId);
    } catch (error) {
      console.log(error);
    }
  };

  const markEpisodeWatched = (
    id: string,
    seasonNumber: number,
    episodeNumber: number,
  ) => {
    dispatch(markEpWatched(id, seasonNumber, episodeNumber));
  };

  const markEpisodeUnwatched = (
    id: string,
    seasonNumber: number,
    episodeNumber: number,
  ) => {
    dispatch(markEpUnwatched(id, seasonNumber, episodeNumber));
  };

  const markSeasonWatched = (id: string, seasonNumber: number) => {
    dispatch(seasonWatched(id, seasonNumber));
  };

  const markSeasonUnwatched = (id: string, seasonNumber: number) => {
    dispatch(seasonUnwatched(id, seasonNumber));
  };

  const resetState = () => {
    controller && controller.abort();
    dispatch(toggleAdded(false));
    dispatch(setSeasons([]));
  };

  return {
    checkAdded,
    addShow,
    removeShow,
    resetState,
    markEpisodeWatched,
    markEpisodeUnwatched,
    markSeasonWatched,
    markSeasonUnwatched,
  };
};

export default useShow;
