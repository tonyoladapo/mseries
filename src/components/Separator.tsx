import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../values/colors';

const Separator = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1,
    backgroundColor: colors.secondaryBackground,
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

export default Separator;
