import mseries from '../apis/mseries';

const useDiscover = () => {
  const getDiscoverShows = async () => {
    try {
      const genres = [
        { id: '16', name: 'Animation' },
        { id: '35', name: 'Comedy' },
        { id: '10759', name: 'Action & Adventure' },
      ];

      const similarShowIds = [
        { id: '60059', name: 'Better Call Saul' },
        { id: '1399', name: 'Game of Thrones' },
        { id: '60625', name: 'Rick and Morty' },
      ];

      const { data } = await mseries.get('/discover', {
        params: {
          genres: JSON.stringify(genres),
          similar_ids: JSON.stringify(similarShowIds),
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return { getDiscoverShows };
};

export default useDiscover;
