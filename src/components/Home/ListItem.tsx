import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from '../../values/colors';
import { dimensions } from '../../values/dimensions';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../types/navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useHome from '../../hooks/useHome';
import Text from '../Text';
import Pressable from '../Pressable';
import moment from 'moment';
import useShow from '../../hooks/useShow';
import AnimatedProgressbar from '../AnimatedProgressbar';

interface Props {
  item: any;
}

const ListItem = ({ item }: Props) => {
  return (
    <>
      {Object.keys(item.seasons).length > 0 &&
      moment(item.firstAirDate).isBefore(moment()) ? (
        <Item item={item} />
      ) : null}
    </>
  );
};

const Item = ({ item }) => {
  const { findUpNext, progress } = useHome(item);

  const { markEpisodeWatched } = useShow();
  const { navigate } = useNavigation<RootNavigationProp>();

  let upNext = findUpNext();
  if (!upNext) return null;

  const episodeTitle = upNext.name;
  const showId = item.id.toString();
  const seasonNumber = upNext.season_number.toString();
  const episodeNumber = upNext.episode_number.toString();
  const airDate = upNext.air_date;

  return (
    <>
      {moment(airDate).isBefore(moment()) && (
        <Pressable
          shrinkScale={0.98}
          onPress={() =>
            navigate('ShowDetails', {
              showId,
              title: item.name,
            })
          }
          style={styles.container}>
          <View style={styles.posterContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
              }}
              style={styles.poster}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode="tail"
                fontFamily="Bold">
                {item.name}
              </Text>
              <Text
                style={[styles.text, { fontSize: 14 }]}
                fontFamily="Medium"
                numberOfLines={1}
                ellipsizeMode="tail">
                {`Season ${seasonNumber} Episode ${episodeNumber}`}
              </Text>
              <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                {episodeTitle}
              </Text>
            </View>
            <View style={styles.progressbarContainer}>
              <AnimatedProgressbar
                progress={progress}
                height={7}
                width="100%"
              />
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Pressable
              onPress={() =>
                markEpisodeWatched(showId, seasonNumber, episodeNumber)
              }
              style={styles.watchBtn}>
              <Icon name="eye-outline" size={20} color={colors.primaryText} />
            </Pressable>
          </View>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 95,
    flexDirection: 'row',
    margin: 16,
  },

  posterContainer: {
    flex: 1.8,
    borderRadius: dimensions.cardBorderRadius,
    overflow: 'hidden',
  },

  infoContainer: {
    flex: 6.2,
    paddingHorizontal: 8,
  },

  iconContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  textContainer: {
    flex: 7.5,
    justifyContent: 'space-around',
  },

  progressbarContainer: {
    flex: 2.5,
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
  },

  text: {
    color: colors.mutedText,
  },

  watchBtn: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dimensions.cardBorderRadius,
    borderWidth: 2,
    borderColor: colors.secondaryBackground,
  },
});

export default ListItem;
