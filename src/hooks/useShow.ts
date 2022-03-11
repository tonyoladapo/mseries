import { toggleAdded, toggleLoading, setSeasons } from '../actions/showDetails';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerTypes } from '../types/reducerTypes';
import { store } from '../store';
import docRef from '../firebase/docRef';
import mseries from '../apis/mseries';
import tmdb from '../apis/tmdb';
import qs from 'query-string';
import firestore from '@react-native-firebase/firestore';

const useShow = (controller?: AbortController) => {
  const { userDataRef } = docRef();

  const { unwatchedCollection } = useSelector(({ show }: ReducerTypes) => show);
  const dispatch = useDispatch();

  const checkAdded = async (id: string) => {
    try {
      const show = await userDataRef.collection('user_shows').doc(id).get();

      if (show.exists) {
        const { data } = await tmdb.get(`/tv/${id}`, {
          signal: controller && controller.signal,
        });

        dispatch(setSeasons(data.seasons));
      } else dispatch(setSeasons([]));

      dispatch(toggleAdded(show.exists));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  const addShow = async (_show: any) => {
    try {
      dispatch(toggleLoading(true));

      const { data } = await tmdb.get(`/tv/${_show.id}`);

      const show = {
        ..._show,
        status: data.status,
        lastEpisodeToAir: data.last_episode_to_air,
        nextEpisodeToAir: data.next_episode_to_air,
      };

      await userDataRef
        .collection('user_shows')
        .doc(show.id.toString())
        .set(show);

      const { data: unwatched } = await mseries.get(
        `/show/unwatched/${show.id}`,
        {
          signal: controller && controller.signal,
        },
      );

      await userDataRef
        .collection('unwatched_shows')
        .doc(show.id.toString())
        .set({
          seasons: unwatched.seasons,
          name: show.name,
          poster_path: show.poster_path,
          id: show.id,
          firstAirDate: show.first_air_date,
          numOfAiredEpisodes: unwatched.numOfAiredEpisodes,
          numOfWatchedEpisodes: unwatched.numOfWatchedEpisodes,
        });

      checkAdded(show.id.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const removeShow = async (showId: string) => {
    try {
      dispatch(toggleLoading(true));

      await userDataRef.collection('user_shows').doc(showId).delete();
      await userDataRef.collection('unwatched_shows').doc(showId).delete();
      checkAdded(showId);
    } catch (error) {
      console.log(error);
    }
  };

  const markEpisodeWatched = async (
    showId: string,
    seasonNumber: number,
    episodeNumber: number,
    numOfWatchedEpisodes: number,
  ) => {
    try {
      let _seasons = unwatchedCollection[showId].seasons;
      const key = `season ${seasonNumber}`;

      if (_seasons[key].length == 1) delete _seasons[key];
      else
        _seasons[key] = _seasons[key].filter(
          ({ episode_number }: any) => episode_number != episodeNumber,
        );

      await userDataRef
        .collection('unwatched_shows')
        .doc(showId)
        .update({
          numOfWatchedEpisodes: numOfWatchedEpisodes + 1,
          seasons: { ...unwatchedCollection[showId].seasons, ..._seasons },
        });
    } catch (error) {
      console.log(error);
    }
  };

  const markSeasonWatched = async (
    showId: string,
    seasonNumber: number,
    numOfWatchedEpisodes: number,
  ) => {
    try {
      let _seasons = unwatchedCollection[showId].seasons;
      const key = `season ${seasonNumber}`;

      const numOfEpisodes = _seasons[key].length;
      delete _seasons[key];

      await userDataRef
        .collection('unwatched_shows')
        .doc(showId)
        .update({
          numOfWatchedEpisodes: numOfWatchedEpisodes + numOfEpisodes,
          seasons: { ...unwatchedCollection[showId].seasons, ..._seasons },
        });
    } catch (error) {
      console.log(error);
    }
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
    markSeasonWatched,
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
