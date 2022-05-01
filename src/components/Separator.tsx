import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../values/colors';

interface Props {
  style?: ViewStyle;
}

const Separator = ({ style }: Props) => {
  return <View style={[styles.container, style]} />;
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
