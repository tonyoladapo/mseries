import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import useDiscover from '../../hooks/useDiscover';

const Discover = () => {
  const [discoverShows, setDiscoverShows] = useState([]);
  const { getDiscoverShows, loading } = useDiscover();

  const fetchDiscoverShows = async () => {
    setDiscoverShows(await getDiscoverShows());
  };

  useEffect(() => {
    fetchDiscoverShows();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchDiscoverShows} />
        }
        data={discoverShows}
        keyExtractor={({ listTitle }, index) => `${index}-${listTitle}`}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  );
};

const Item = ({ item: { listTitle, shows } }: any) => {
  return (
    <>
      <Text>{listTitle}</Text>
      <FlatList
        horizontal
        data={shows}
        keyExtractor={({ name, id }, index) => `${index}-${name}-${id}`}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              height: 150,
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
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Discover;
