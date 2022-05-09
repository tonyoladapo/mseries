import { useEffect, useState, useCallback } from 'react';
import mseries from '../apis/mseries';

const useDiscoverMore = (category: string) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [shows, setShows] = useState<any[]>([]);

  const fetchMore = useCallback(() => setShouldFetch(true), []);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetch = async () => {
      const newShows = await getShows();

      setShouldFetch(false);
      setShows(oldShows => [...oldShows, ...newShows]);

      setPage(page + 1);
    };

    fetch();
  }, [page, shouldFetch]);

  const getShows = async () => {
    try {
      setLoading(true);

      const { data } = await mseries.get(`/discover/category`, {
        params: {
          category,
          page,
        },
      });

      return data;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, shows, fetchMore, page };
};

export default useDiscoverMore;
