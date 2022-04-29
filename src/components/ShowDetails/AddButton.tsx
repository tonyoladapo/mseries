import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../values/colors';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import { dimensions } from '../../values/dimensions';
import useShow from '../../hooks/useShow';
import Pressable from '../Pressable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddButton = ({ show, added }) => {
  const { loading } = useSelector(
    ({ showDetails }: ReducerTypes) => showDetails,
  );

  const { addShow, removeShow } = useShow();

  return (
    <Pressable
      disabled={loading}
      style={styles.container}
      onPress={
        added ? () => removeShow(show.id.toString()) : () => addShow(show)
      }>
      <ActivityIndicator
        animating={loading}
        size={24}
        style={{ padding: 12, alignSelf: 'flex-end' }}
        color={colors.mutedText}
      />
      <View
        style={{
          padding: 12,
          backgroundColor: added ? colors.darkGreen : colors.transparent,
          borderRadius: dimensions.buttonBorderRadius,
          borderWidth: 1,
          borderColor: added ? colors.darkGreen : colors.mutedText,
          alignSelf: 'flex-end',
        }}>
        <Icon
          name={added ? 'check' : 'plus'}
          size={24}
          color={added ? colors.primaryGreen : colors.mutedText}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default AddButton;
