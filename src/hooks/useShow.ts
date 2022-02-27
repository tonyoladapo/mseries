import { toggleAdded, toggleLoading, setSeasons } from '../actions/showDetails';
import { useDispatch } from 'react-redux';
import docRef from '../firebase/docRef';
import mseries from '../apis/mseries';
import tmdb from '../apis/tmdb';

const useShow = (controller: AbortController) => {
  const { userDataRef } = docRef();

  const dispatch = useDispatch();

  const checkAdded = async (id: string) => {
    try {
      const show = await userDataRef.collection('user_shows').doc(id).get();

      if (show.exists) {
        const { data } = await tmdb.get(`/tv/${id}`, {
          signal: controller.signal,
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
          signal: controller.signal,
        },
      );

      await userDataRef
        .collection('unwatched_shows')
        .doc(show.id.toString())
        .set({
          seasons: unwatched,
          name: show.name,
          poster_path: show.poster_path,
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

  const getShowDetails = async (
    id: string,
    name: string,
    poster_path: string,
  ) => {
    try {
      // const { data: unwatched } = await mseries.get(`/show/unwatched/${id}`, {
      //   signal: controller.signal,
      // });
      // const batch = firestore().batch();
      // for (const season in unwatched) {
      //   batch.set(userDataRef.collection('unwatched_shows').doc(id), season);
      // }
      // dispatch(setUnwatched(id, unwatched, name, poster_path));
    } catch (error) {
      console.log(error);
    }
  };

  const resetState = () => {
    controller.abort();
    dispatch(toggleAdded(false));
    dispatch(setSeasons([]));
  };

  return {
    checkAdded,
    addShow,
    removeShow,
    getShowDetails,
    resetState,
  };
};

export default useShow;
