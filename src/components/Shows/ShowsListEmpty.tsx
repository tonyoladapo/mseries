import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../Text';
import Void from '../../assets/svg/void.svg';

const ShowsListEmpty = () => {
  return (
    <View style={styles.container}>
      <View style={{ height: 200 }}>
        <Void height="100%" width="100%" />
      </View>
      <Text
        fontFamily="Bold"
        style={{ paddingVertical: 16, textAlign: 'center', fontSize: 18 }}>
        No shows added!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ShowsListEmpty;
