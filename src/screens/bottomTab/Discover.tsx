import React, { useEffect } from 'react';
import { StyleSheet, RefreshControl, FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import useDiscover from '../../hooks/useDiscover';
import DiscoverCategory from '../../components/Discover/DiscoverCategory';
import SearchbarToggle from '../../components/Discover/SearchbarToggle';

const Discover = () => {
  const { discoverShows } = useSelector(({ discover, pref }: ReducerTypes) => ({
    ...discover,
    ...pref,
  }));
  const { getDiscoverShows, loading } = useDiscover();

  useEffect(() => {
    getDiscoverShows();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={discoverShows}
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={({ listTitle }, index) => `${index}-${listTitle}`}
        renderItem={({ item }) => <DiscoverCategory item={item} />}
        ListHeaderComponent={<SearchbarToggle />}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getDiscoverShows}
            tintColor="#b9b9b9"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Discover;
