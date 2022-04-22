import mseries from '../apis/mseries';
import { useSelector, useDispatch } from 'react-redux';
import { setUnwatched, setUnwatchedCollection } from '../actions/show';
import { ReducerTypes } from '../types/reducerTypes';

const useSync = () => {
  const dispatch = useDispatch();

  const { unwatched, unwatchedCollection, user } = useSelector(
    ({ show, auth }: ReducerTypes) => ({ ...show, ...auth }),
  );

  const sync = async () => {
    if (unwatched.length) {
      const token = await user?.getIdToken();

      const { data } = await mseries.post(
        '/sync',
        {
          progress: unwatchedCollection,
        },
        {
          headers: {
            token: typeof token === 'string' && token,
          },
        },
      );

      let arr: any[] = [];

      Object.keys(data).forEach(key => {
        arr.push(data[key]);
      });

      dispatch(setUnwatchedCollection(data));
      dispatch(setUnwatched(arr));
    }
  };

  return { sync };
};

export default useSync;
