import { toggleAdded, toggleLoading, setSeasons } from '../actions/showDetails';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerTypes } from '../types/reducerTypes';
import { store } from '../store';
import docRef from '../firebase/docRef';
import mseries from '../apis/mseries';
import tmdb from '../apis/tmdb';
import qs from 'query-string';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import moment from 'moment';

const useShow = (controller?: AbortController) => {
  const { userDataRef } = docRef();

  const { unwatchedCollection, user } = useSelector(
    ({ show, auth }: ReducerTypes) => ({ ...show, ...auth }),
  );
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
      await axios.get(`http://localhost:9000/api/v1/show/add/${_show.id}`, {
        headers: {
          token: typeof token === 'string' && token,
        },
      });

      checkAdded(_show.id.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const removeShow = async (showId: string) => {
    try {
      dispatch(toggleLoading(true));

      await userDataRef.collection('user_shows').doc(showId).delete();
      await userDataRef.collection('seasons').doc(showId).delete();
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

      let allEpisodesWatched = true;

      _seasons[key].episodes.map(({ episode_number }, index) => {
        if (episodeNumber == episode_number) {
          _seasons[key].episodes[index].watched = true;
        }

        if (!_seasons[key].episodes[index].watched) allEpisodesWatched = false;
      });

      _seasons[key].numberOfWatchedEpisodes =
        _seasons[key].numberOfWatchedEpisodes + 1;

      _seasons[key].completed = allEpisodesWatched;

      await userDataRef
        .collection('seasons')
        .doc(showId)
        .update({
          numOfWatchedEpisodes: numOfWatchedEpisodes + 1,
          seasons: { ...unwatchedCollection[showId].seasons, ..._seasons },
        });
    } catch (error) {
      console.log(error);
    }
  };

  const markEpisodeUnwatched = async (
    showId: string,
    seasonNumber: number,
    episodeNumber: number,
    numOfWatchedEpisodes: number,
  ) => {
    try {
      let _seasons = unwatchedCollection[showId].seasons;
      const key = `season ${seasonNumber}`;

      _seasons[key].episodes.map(({ episode_number }, index) => {
        if (episodeNumber == episode_number) {
          _seasons[key].episodes[index].watched = false;
        }
      });

      _seasons[key].completed = false;

      _seasons[key].numberOfWatchedEpisodes =
        _seasons[key].numberOfWatchedEpisodes - 1;

      await userDataRef
        .collection('seasons')
        .doc(showId)
        .update({
          numOfWatchedEpisodes: numOfWatchedEpisodes - 1,
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

      _seasons[key].completed = true;

      _seasons[key].episodes.map(episode => {
        moment(episode.air_date).isBefore(moment()) && (episode.watched = true);
      });

      _seasons[key].numberOfWatchedEpisodes =
        _seasons[key].numberOfAiredEpisodes;

      await userDataRef
        .collection('seasons')
        .doc(showId)
        .update({
          numOfWatchedEpisodes:
            numOfWatchedEpisodes + _seasons[key].numberOfAiredEpisodes,
          seasons: { ...unwatchedCollection[showId].seasons, ..._seasons },
        });
    } catch (error) {
      console.log(error);
    }
  };

  const markSeasonUnwatched = async (
    showId: string,
    seasonNumber: number,
    numOfWatchedEpisodes: number,
  ) => {
    try {
      let _seasons = unwatchedCollection[showId].seasons;
      const key = `season ${seasonNumber}`;

      _seasons[key].completed = false;

      _seasons[key].episodes.map(episode => {
        moment(episode.air_date).isBefore(moment()) &&
          (episode.watched = false);
      });

      _seasons[key].numberOfWatchedEpisodes = 0;

      await userDataRef
        .collection('seasons')
        .doc(showId)
        .update({
          numOfWatchedEpisodes:
            numOfWatchedEpisodes - _seasons[key].numberOfAiredEpisodes,
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
