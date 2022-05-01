import React from 'react';
import { StyleSheet, View } from 'react-native';
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
    marginTop: 8,
  },

  title: {
    fontSize: 18,
  },
});

export default SectionHeader;
