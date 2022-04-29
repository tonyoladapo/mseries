import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../values/colors';
import Text from '../Text';
import SimilarShowItem from './SimilarShowItem';

const SimilarShows = ({ similar }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} fontFamily="Heavy">
        Similar shows
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        data={similar}
        keyExtractor={({ id, name }, index) => `${index}-${name}-${id}`}
        renderItem={({ item }) => <SimilarShowItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },

  contentContainer: {
    paddingHorizontal: 16,
  },

  title: {
    marginBottom: 16,
    marginHorizontal: 16,
    fontSize: 15,
  },
});

export default SimilarShows;
