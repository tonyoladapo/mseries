import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../values/colors';
import Text from '../Text';

const Overview = ({ overview }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} fontFamily="Bold">
        Overview
      </Text>
      <Text numberOfLines={3}>{overview}</Text>
      <TouchableOpacity style={styles.readMoreButton}>
        <Text style={styles.readMore} fontFamily="Bold">
          Read more
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 8,
  },

  title: {
    color: colors.primaryGreen,
    marginVertical: 6,
  },

  readMore: {
    color: colors.darkGreen,
  },

  readMoreButton: {
    paddingVertical: 8,
  },
});

export default Overview;
