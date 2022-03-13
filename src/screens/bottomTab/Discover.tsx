import React, { useEffect } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import useDiscover from '../../hooks/useDiscover';
import BottomTabList from '../../components/BottomTabList/BottomTabList';
import DiscoverCategory from '../../components/Discover/DiscoverCategory';

const Discover = () => {
  const { discoverShows, headerHeight } = useSelector(
    ({ discover, pref }: ReducerTypes) => ({ ...discover, ...pref }),
  );
  const { getDiscoverShows, loading } = useDiscover();

  useEffect(() => {
    getDiscoverShows();
  }, []);

  return (
    <View style={styles.container}>
      <BottomTabList
        searchbarShown
        title="Discover"
        data={discoverShows}
        keyExtractor={({ listTitle }, index) => `${index}-${listTitle}`}
        renderItem={({ item }) => <DiscoverCategory item={item} />}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getDiscoverShows}
            progressViewOffset={headerHeight}
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
