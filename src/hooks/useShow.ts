import { toggleAdded, toggleLoading, setSeasons } from '../actions/showDetails';
import {
  markEpWatched,
  markEpUnwatched,
  seasonUnwatched,
  seasonWatched,
} from '../actions/show';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerTypes } from '../types/reducerTypes';
import { store } from '../store';
import docRef from '../firebase/docRef';
import mseries from '../apis/mseries';
import qs from 'query-string';
import firestore from '@react-native-firebase/firestore';

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
      await mseries.get(`/show/add/${_show.id}`, {
        headers: {
          token: typeof token === 'string' && token,
        },
      });

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

export const syncShows = async () => {
  try {
    const {
      auth: { user },
      show: { userShows },
    } = store.getState();

    const userDataRef = firestore().collection('userData').doc(user?.uid);
    const showIds = userShows.map(({ id }: { id: number }) => id.toString());

    const { data } = await mseries.get('/show/sync', {
      params: {
        shows: JSON.stringify(showIds),
      },
      paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'bracket' });
      },
    });

    const updatedShows: any = [];
    const unwatched: any = {};

    data.map((show: any) => {
      updatedShows.push(show.showDetails);
      unwatched[show.showDetails.id] = show.unwatched[show.showDetails.id];
    });

    const batch = firestore().batch();

    Object.keys(unwatched).map(key => {
      batch.update(
        userDataRef.collection('unwatched_shows').doc(key),
        unwatched[key],
      );
    });

    updatedShows.map((show: any) => {
      batch.set(
        userDataRef.collection('user_shows').doc(show.id.toString()),
        show,
      );
    });

    batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export default useShow;
