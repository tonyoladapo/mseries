import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../types/reducerTypes';
import mseries from '../apis/mseries';
import useShow from './useShow';

const useShowDetails = (showId: string, abortController?: AbortController) => {
  const { unwatched, user } = useSelector(({ show, auth }: ReducerTypes) => ({
    ...show,
    ...auth,
  }));
  const { checkAdded } = useShow();

  const [showDetails, setShowDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState<boolean | undefined>(false);
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    (async () => {
      setAdded(await checkAdded(showId));
      getProgress();
    })();
  }, [unwatched]);

  useEffect(() => {
    getShowDetails();
    return () => {
      abortController?.abort();
    };
  }, []);

  const getShowDetails = async () => {
    try {
      setLoading(true);

      const { data } = await mseries.get(`/show/${showId}`, {
        signal: abortController ? abortController.signal : undefined,
      });

      setShowDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getProgress = async () => {
    try {
      const token = await user?.getIdToken();

      const { data } = await mseries.get(`/show/${showId}/progress`, {
        headers: {
          token: typeof token === 'string' && token,
        },
        signal: abortController ? abortController.signal : undefined,
      });

      Object.keys(data).length ? setProgress(data) : setProgress({});
    } catch (error) {
      console.log(error);
    }
  };

  return { added, loading, showDetails, progress, setAdded };
};

export default useShowDetails;
