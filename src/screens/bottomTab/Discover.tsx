import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import useDiscover from '../../hooks/useDiscover';

const Discover = () => {
  const [discoverShows, setDiscoverShows] = useState([]);
  const { getDiscoverShows } = useDiscover();

  useEffect(() => {
    const fetch = async () => {
      setDiscoverShows(await getDiscoverShows());
    };

    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
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
              // alignItems: 'center',
              // justifyContent: 'center',
            }}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
              }}
              style={{ width: '100%', height: '100%' }}
            />
            {/* <Text>{item.name}</Text> */}
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
