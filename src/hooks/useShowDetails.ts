import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../types/reducerTypes';
import tmdb from '../apis/tmdb';
import useShow from './useShow';
import mseries from '../apis/mseries';

const useShowDetails = (
  showId: string | number,
  controller?: AbortController,
) => {
  const [showDetails, setShowDetails] = useState<any>(null);

  const { added, loading } = useSelector(
    ({ showDetails }: ReducerTypes) => showDetails,
  );
  const { checkAdded } = useShow(controller);

  useEffect(() => {
    getShowDetails();
  }, []);

  const getSeasons = async () => {
    try {
      const { data } = await mseries.get(`/show/unwatched/${showId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getShowDetails = async () => {
    try {
      const { data } = await tmdb.get(`/tv/${showId}`, {
        params: {
          append_to_response: 'similar,videos',
        },
      });

      const similar = data.similar.results;
      const trailer = data.videos.results.find(
        video => video.type === 'Trailer',
      );

      setShowDetails({
        ...data,
        similar,
        trailer: trailer ? trailer : null,
        seasons: await getSeasons(),
      });
      checkAdded(showId.toString());
    } catch (error) {
      console.log(error);
    }
  };

  return { showDetails, added, loading };
};

export default useShowDetails;
