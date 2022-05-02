import { useEffect, useState } from 'react';
import { ReducerTypes } from './../types/reducerTypes';
import { useSelector } from 'react-redux';
import moment from 'moment';

const useMyShows = () => {
  const { userShows } = useSelector(({ show }: ReducerTypes) => show);

  const [listData, setListData] = useState<any[]>([]);

  useEffect(() => {
    setListData([
      {
        title: 'Returning Shows',
        data: userShows.filter(
          ({ status }: any) => status === 'Returning Series',
        ),
      },
      {
        title: 'Unreleased Shows',

        data: userShows.filter(
          ({ first_air_date }: any) =>
            moment(first_air_date).isAfter(moment()) || !first_air_date,
        ),
      },
      {
        title: 'Ended Shows',
        data: userShows.filter(
          ({ status, lastEpisodeToAir }: any) =>
            status === 'Ended' || status === 'Canceled',
        ),
      },
    ]);
  }, [userShows]);

  return { listData, userShows };
};

export default useMyShows;
