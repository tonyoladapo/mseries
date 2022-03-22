import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { colors } from '../../values/colors';
import { dimensions } from '../../values/dimensions';
import Text from '../Text';
import AddButton from './AddButton';

interface Props {
  showId: number | string;
  title: string;
  posterPath: string;
  status: string;
  year: number | string;
  added: boolean;
  show: any;
}

const Header = ({ title, posterPath, status, year, show }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.posterContainer}>
        <Image
          style={styles.poster}
          source={{
            uri: `https://image.tmdb.org/t/p/original${posterPath}`,
          }}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View
          style={{
            flex: 7,
            justifyContent: 'space-around',
            paddingHorizontal: 16,
          }}>
          <Text fontFamily="Heavy" style={styles.title}>
            {title}
          </Text>
          <Text fontFamily="Bold" style={styles.year}>
            {year}
          </Text>
          <Text fontFamily="Bold" style={styles.year}>
            {status}
          </Text>
        </View>
        <View style={{ flex: 3 }}>
          <AddButton show={show} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 130,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
  },

  posterContainer: {
    flex: 2.5,
  },

  detailsContainer: {
    flex: 7.5,
  },

  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: dimensions.cardBorderRadius,
  },

  title: {
    fontSize: 16,
  },

  year: {
    fontSize: 14,
    color: colors.mutedText,
  },
});

export default Header;
