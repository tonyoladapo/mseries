import React, { useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import { setSearchResults } from '../../actions/search';
import { FlatGrid } from 'react-native-super-grid';
import SearchItem from '../../components/Search/SearchItem';
import Searchbar from '../../components/Search/Searchbar';

const Search = () => {
  const renderItem = ({ item }) => <SearchItem item={item} />;
  const keyExtractor = ({ id, name }, index) => `${index}-${name}-${id}`;

  const { searchResults } = useSelector(({ search }: ReducerTypes) => search);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchResults([]));
    };
  }, []);

  return (
    <View style={styles.container}>
      <Searchbar />
      <FlatGrid
        spacing={16}
        itemDimension={80}
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1 }}
        data={searchResults}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Search;
