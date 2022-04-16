import { useEffect, useState } from 'react';

const useHome = item => {
  const [progress, setProgress] = useState(0);

  const numOfWatchedEpisodes = item.numOfWatchedEpisodes;
  const numOfAiredEpisodes = item.numOfAiredEpisodes;

  // console.log(numOfWatchedEpisodes, numOfAiredEpisodes);

  useEffect(() => {
    setProgress(Math.floor((numOfWatchedEpisodes / numOfAiredEpisodes) * 100));
  }, [numOfWatchedEpisodes, numOfAiredEpisodes]);

  const findUpNext = () => {
    let arr: string[] = [];

    Object.keys(item.seasons).forEach(key => {
      if (!item.seasons[key].completed) arr.push(key);
    });

    if (arr.length) {
      let k = arr.reduce((key, val) => {
        return parseInt(val.replace(/^.*?(\d+).*/, '$1')) <
          parseInt(key.replace(/^.*?(\d+).*/, '$1'))
          ? val
          : key;
      });

      return item.seasons[k].episodes.find(({ watched }) => !watched);
    }

    return null;
  };

  return { findUpNext, progress, numOfWatchedEpisodes, numOfAiredEpisodes };
};

export default useHome;
