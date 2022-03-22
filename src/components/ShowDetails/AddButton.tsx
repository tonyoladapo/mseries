import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../../values/colors';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import useShow from '../../hooks/useShow';
import Text from '../Text';

const AddButton = ({ show }) => {
  const { loading, added } = useSelector(
    ({ showDetails }: ReducerTypes) => showDetails,
  );

  const { addShow, removeShow } = useShow();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={loading}
        onPress={
          added ? () => removeShow(show.id.toString()) : () => addShow(show)
        }
        style={{
          alignContent: 'flex-start',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: added ? colors.primaryRed : colors.primaryGreen,
          }}
          fontFamily="Bold">
          {added ? 'Remove show' : 'Add show'}
        </Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddButton;
