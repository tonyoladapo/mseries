import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../values/colors';
import Text from '../Text';

interface Props {
  title: string;
  data: any;
}

const SectionHeader = ({ title, data }: Props) => {
  return (
    <>
      {data.length ? (
        <View style={styles.container}>
          <Text fontFamily="Bold" style={styles.title}>
            {title}
          </Text>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  title: {
    color: colors.primaryGreen,
    fontSize: 16,
  },
});

export default SectionHeader;
