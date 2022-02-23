import { useState } from 'react';
import { Show } from '../types/show';
import docRef from '../firebase/docRef';
import mseries from '../apis/mseries';

const useShow = () => {
  const { userDataRef } = docRef();

  const [loading, setLoading] = useState(false);
  const [fullShow, setFullShow] = useState<Show | null>(null);

  const [added, setAdded] = useState<boolean | undefined>(false);

  const checkAdded = (id: string) => {
    try {
      userDataRef
        .collection('user_shows')
        .doc(id)
        .get()
        .then(doc => {
          if (doc.exists) setAdded(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addShow = async (showId: string) => {
    try {
      setLoading(true);

      const { data } = await mseries.get(`/show/details/${showId}`);
      setFullShow(data);
      await userDataRef.collection('user_shows').doc(showId).set(data);
      setAdded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeShow = async (showId: string) => {
    try {
      setLoading(true);

      await userDataRef.collection('user_shows').doc(showId).delete();
      setFullShow(null);
      setAdded(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fullShow, added, checkAdded, addShow, removeShow };
};

export default useShow;
