import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { dimensions } from '../../values/dimensions';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../types/navigation';
import { colors } from '../../values/colors';
import Text from '../Text';
import Pressable from '../Pressable';

const ListItem = ({ item }) => {
  const { navigate } = useNavigation<RootNavigationProp>();

  return (
    <Pressable
      shrinkScale={0.98}
      style={styles.container}
      onPress={() =>
        navigate('ShowDetails', {
          showId: item.id,
          title: item.name,
        })
      }>
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
    height: 190,
    borderRadius: dimensions.cardBorderRadius,
    overflow: 'hidden',
  },

  imageContainer: {
    flex: 8,
  },

  textContainer: {
    flex: 2,
    justifyContent: 'center',
  },

  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: dimensions.cardBorderRadius,
  },

  title: {
    color: colors.mutedText,
  },
});

export default ListItem;
