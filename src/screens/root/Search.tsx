import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import { setSearchResults } from '../../actions/search';
import SearchItem from '../../components/Search/SearchItem';
import Searchlist from '../../components/Search/Searchlist';
import Searchbar from '../../components/Search/Searchbar';

const Search = () => {
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
      <Searchlist
        data={searchResults}
        title="Search"
        keyExtractor={({ id, name }, index) => `${index}-${name}-${id}`}
        renderItem={({ item }) => <SearchItem item={item} />}
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
