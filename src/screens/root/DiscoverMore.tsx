import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import useDiscover from '../../hooks/useDiscover';

const DiscoverMore = ({ route }: any) => {
  const [shows, setShows] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const { listParams } = route.params;
  const { getMoreDiscoverShows } = useDiscover();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMoreDiscoverShows(listParams, page);
      setShows([data]);
    };

    fetchData();
  }, [page]);

  return (
    <View style={styles.container}>
      <FlatList
        extraData={shows}
        onEndReached={() => setPage(page + 1)}
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
