import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import useDiscover from '../../hooks/useDiscover';
import Image from '../../components/Image';

const DiscoverMore = ({ route }: any) => {
  const [shows, setShows] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const { listParams } = route.params;
  const { getMoreDiscoverShows } = useDiscover();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMoreDiscoverShows(listParams, page);
      console.log(`page - ${page}`, data.length, data[0].name);

      // setShows([...shows, ...data]);
    };

    fetchData();
  }, [page]);

  setInterval(() => {
    setPage(page + 1);
  }, 3000);

  return (
    <View style={styles.container}>
      <FlatList
        extraData={shows}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.1}
        numColumns={3}
        data={shows}
        keyExtractor={({ id, name }, index) => `${index}-${name}-${id}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flex: 1,
              height: 190,
              width: 100,
              backgroundColor: 'tomato',
              marginHorizontal: 2,
              borderRadius: 7,
            }}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DiscoverMore;
