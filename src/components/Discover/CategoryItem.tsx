import React, { memo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { colors } from '../../values/colors';
import { dimensions } from '../../values/dimensions';
import Pressable from '../Pressable';
import Text from '../Text';

interface Props {
  item: any;
}

const CategoryItem = ({ item }: Props) => {
  return (
    <Pressable shrinkScale={0.98} style={styles.container}>
      <View style={{ flex: 8 }}>
        <Image
          style={styles.poster}
          source={{
            uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
          }}
        />
      </View>
      <View style={{ flex: 2, justifyContent: 'center' }}>
        <Text
          fontFamily="Bold"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ color: colors.mutedText }}>
          {item.name}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 170,
    width: 100,
    marginHorizontal: 4,
  },

  poster: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: dimensions.cardBorderRadius,
  },
});

export default memo(CategoryItem);
