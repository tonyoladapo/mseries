import { useEffect, useState, useCallback } from 'react';
import mseries from '../apis/mseries';

const useDiscoverMore = (category: string) => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [shows, setShows] = useState<any[]>([]);

  const fetchMore = useCallback(() => setShouldFetch(true), []);

  const abortController = new AbortController();

  useEffect(() => {
    setMounted(true);

    if (!shouldFetch) return;

    const fetch = async () => {
      const newShows = await getShows();

      setShouldFetch(false);
      setShows(oldShows => [...oldShows, ...newShows]);

      setPage(page + 1);
    };

    fetch();

    return () => {
      setMounted(false);
      abortController.abort();
    };
  }, [page, shouldFetch]);

  const getShows = async () => {
    try {
      mounted && setLoading(true);

      const { data } = await mseries.get(`/discover/category`, {
        params: {
          category,
          page,
        },

        signal: abortController.signal,
      });

      return data;
    } catch (e) {
      console.log(e);
    } finally {
      mounted && setLoading(false);
    }
  };

  return { loading, shows, fetchMore, page };
};

export default useDiscoverMore;
