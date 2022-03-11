import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { dimensions } from '../../values/dimensions';
import Pressable from '../Pressable';
import Text from '../Text';

interface Props {
  item: any;
}

const SearchItem = ({ item }: Props) => {
  return (
    <Pressable shrinkScale={0.98} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          fontFamily="Bold"
          style={styles.title}>
          {item.name}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 290,
    borderRadius: dimensions.cardBorderRadius,
    overflow: 'hidden',
  },

  imageContainer: {
    flex: 8,
  },

  textContainer: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 6,
  },

  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: dimensions.cardBorderRadius,
  },

  title: {},
});

export default SearchItem;
