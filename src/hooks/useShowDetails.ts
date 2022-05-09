import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../types/reducerTypes';
import mseries from '../apis/mseries';
import useShow from './useShow';

const useShowDetails = (showId: string, abortController?: AbortController) => {
  let mounted = false;

  const { unwatched, user, unwatchedCollection } = useSelector(
    ({ show, auth }: ReducerTypes) => ({
      ...show,
      ...auth,
    }),
  );
  const { checkAdded } = useShow();

  const [showDetails, setShowDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState<boolean | undefined>(false);
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    (async () => {
      mounted && setAdded(await checkAdded(showId));
      getProgress();
    })();
  }, [unwatched, unwatchedCollection]);

  useEffect(() => {
    mounted = true;

    getShowDetails();
    return () => {
      mounted = false;
      abortController?.abort();
    };
  }, []);

  const getShowDetails = async () => {
    try {
      mounted && setLoading(true);

      const { data } = await mseries.get(`/show/${showId}`, {
        signal: abortController ? abortController.signal : undefined,
      });

      mounted && setShowDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      mounted && setLoading(false);
    }
  };

  const getProgress = () => {
    unwatchedCollection[showId]
      ? mounted && setProgress(unwatchedCollection[showId])
      : mounted && setProgress({});
  };

  return { added, loading, showDetails, progress, setAdded };
};

export default useShowDetails;
