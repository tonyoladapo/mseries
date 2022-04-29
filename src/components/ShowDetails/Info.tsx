import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../values/colors';
import Text from '../Text';

interface Props {
  rating: number;
  genre: string;
  network: string;
  runtime: number | string;
}

const Info = ({ rating, runtime, genre, network }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text fontFamily="Heavy" style={styles.columnTitle}>
          RATING
        </Text>
        <Text fontFamily="Bold" style={styles.columnValue}>
          {rating ? rating : 'N/A'}
        </Text>
      </View>

      <View style={styles.column}>
        <Text fontFamily="Heavy" style={styles.columnTitle}>
          GENRE
        </Text>
        <Text fontFamily="Bold" style={styles.columnValue}>
          {genre ? genre : 'N/A'}
        </Text>
      </View>

      <View style={styles.column}>
        <Text fontFamily="Heavy" style={styles.columnTitle}>
          NETWORK
        </Text>
        <Text fontFamily="Bold" style={styles.columnValue}>
          {network ? network : 'N/A'}
        </Text>
      </View>

      <View style={styles.column}>
        <Text fontFamily="Heavy" style={styles.columnTitle}>
          RUNTIME
        </Text>
        <Text fontFamily="Bold" style={styles.columnValue}>
          {runtime ? `${runtime} min` : 'N/A'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
  },

  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  columnTitle: {
    color: colors.mutedText,
    fontSize: 10,
    flex: 1,
  },

  columnValue: {
    fontSize: 15,
    flex: 9,
    textAlign: 'center',
  },
});

export default Info;
