import React, { useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import useDiscover from '../../hooks/useDiscover';
import DiscoverCategory from '../../components/Discover/DiscoverCategory';
import SearchbarToggle from '../../components/Discover/SearchbarToggle';

const Discover = () => {
  const renderItem = ({ item }) => <DiscoverCategory item={item} />;
  const keyExtractor = ({ listTitle }, index) => `${index}-${listTitle}`;

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
      {loading ? (
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator />
        </SafeAreaView>
      ) : (
        <FlatList
          data={discoverShows}
          contentInsetAdjustmentBehavior="automatic"
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={<SearchbarToggle />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Discover;
