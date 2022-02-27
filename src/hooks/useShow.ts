import { toggleAdded, toggleLoading, setSeasons } from '../actions/showDetails';
import { useDispatch } from 'react-redux';
import docRef from '../firebase/docRef';
import mseries from '../apis/mseries';
import tmdb from '../apis/tmdb';
import firestore from '@react-native-firebase/firestore';

const useShow = (controller?: AbortController) => {
  const { userDataRef } = docRef();

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

  const addShow = async (show: any) => {
    try {
      dispatch(toggleLoading(true));

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
          seasons: unwatched,
          name: show.name,
          poster_path: show.poster_path,
          id: show.id,
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
  ) => {
    try {
      const showRef = userDataRef.collection('unwatched_shows').doc(showId);
      await firestore().runTransaction(async transaction => {
        const show = await transaction.get(showRef);

        if (!show.exists) return;

        let { seasons }: any = show.data();
        const key = `season ${seasonNumber}`;

        let _seasons = seasons;

        if (seasons[key].length == 1) {
          delete _seasons[key];
        } else {
          _seasons[key] = seasons[key].filter(
            ({ episode_number }: any) => episode_number != episodeNumber,
          );
        }

        transaction.update(showRef, {
          seasons: {
            ...seasons,
            ..._seasons,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const markSeasonWatched = async (showId: string, seasonNumber: number) => {
    try {
      const showRef = userDataRef.collection('unwatched_shows').doc(showId);
      await firestore().runTransaction(async transaction => {
        const show = await transaction.get(showRef);

        if (!show.exists) return;

        let { seasons }: any = show.data();
        const key = `season ${seasonNumber}`;

        let _seasons = seasons;
        delete _seasons[key];

        transaction.update(showRef, {
          seasons: {
            ...seasons,
            ..._seasons,
          },
        });
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

export default useShow;
