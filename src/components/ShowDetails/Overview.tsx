import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../values/colors';
import Text from '../Text';

const Overview = ({ overview }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title} fontFamily="Heavy">
        Overview
      </Text>
      <Text numberOfLines={expanded ? undefined : 3}>{overview}</Text>
      <TouchableOpacity
        style={styles.readMoreButton}
        onPress={() => setExpanded(!expanded)}>
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
    fontSize: 15,
    marginBottom: 8,
  },

  readMore: {
    color: colors.primaryGreen,
  },

  readMoreButton: {
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
});

export default Overview;
