import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../types/reducerTypes';
import mseries from '../apis/mseries';
import axios from 'axios';
import useShow from './useShow';

const useShowDetails = (showId: string) => {
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
  }, []);

  const getShowDetails = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:9000/api/v1/show/${showId}`,
      );

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

      const { data } = await axios.get(
        `http://localhost:9000/api/v1/show/${showId}/progress`,
        {
          headers: {
            token: typeof token === 'string' && token,
          },
        },
      );

      Object.keys(data).length ? setProgress(data) : setProgress({});
    } catch (error) {
      console.log(error);
    }
  };

  return { added, loading, showDetails, progress, setAdded };
};

export default useShowDetails;
