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
  added: boolean | undefined;
  show: any;
}

const Header = ({ title, posterPath, status, year, show, added }: Props) => {
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
      <View style={styles.infoContainer}>
        <Text
          fontFamily="Heavy"
          numberOfLines={3}
          ellipsizeMode="tail"
          style={styles.title}>
          {title}
        </Text>

        <Text fontFamily="Bold" style={styles.status}>
          {status}
        </Text>

        <Text fontFamily="Bold" style={styles.status}>
          {year}
        </Text>
      </View>
      <View style={styles.addBtnContainer}>
        <AddButton show={show} added={added} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    flexDirection: 'row',
    margin: 16,
  },

  posterContainer: {
    flex: 2.5,
    borderRadius: dimensions.cardBorderRadius,
    overflow: 'hidden',
  },

  infoContainer: {
    flex: 5.5,
    paddingHorizontal: 8,
  },

  addBtnContainer: {
    flex: 2,
  },

  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  title: {
    fontSize: 18,
    marginBottom: 4,
  },

  status: {
    fontSize: 14,
    color: colors.mutedText,
    marginVertical: 4,
  },

  year: {
    fontSize: 14,
    color: colors.mutedText,
    marginVertical: 4,
  },
});

export default Header;
