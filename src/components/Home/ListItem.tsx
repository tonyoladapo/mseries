import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../values/colors';
import { dimensions } from '../../values/dimensions';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../types/navigation';
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
  const { findUpNext, progress, numOfWatchedEpisodes } = useHome(item);

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
          style={styles.container}
          shrinkScale={0.98}
          onPress={() =>
            navigate('ShowDetails', {
              showId,
              title: item.name,
            })
          }>
          <View style={styles.posterContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
              }}
              style={styles.poster}
            />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text
                fontFamily="Heavy"
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text
                fontFamily="Bold"
                style={styles.episodeNumber}
                numberOfLines={1}
                ellipsizeMode="tail">
                {`Season ${seasonNumber} Episode ${episodeNumber}`}
              </Text>
              <Text
                fontFamily="Bold"
                style={styles.episodeTitle}
                numberOfLines={1}
                ellipsizeMode="tail">
                {episodeTitle}
              </Text>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.watchButtonContainer}>
                <TouchableOpacity
                  style={styles.watchButton}
                  onPress={() =>
                    markEpisodeWatched(
                      showId,
                      seasonNumber,
                      episodeNumber,
                      numOfWatchedEpisodes,
                    )
                  }>
                  <Text fontFamily="Bold" style={styles.watchButtonText}>
                    Mark as watched
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.progressbarContainer}>
                <AnimatedProgressbar progress={progress} />
              </View>
            </View>
          </View>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 130,
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: dimensions.cardBorderRadius,
    overflow: 'hidden',
  },

  posterContainer: {
    flex: 2.5,
    borderRadius: dimensions.cardBorderRadius,
    overflow: 'hidden',
  },

  contentContainer: {
    flex: 7.5,
  },

  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  textContainer: {
    flex: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  bottomContainer: {
    flex: 5,
    justifyContent: 'space-evenly',
    paddingHorizontal: 8,
  },

  progressbarContainer: {
    flex: 4,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  watchButtonContainer: {
    flex: 6,
  },

  watchButton: {
    alignSelf: 'flex-start',
    flex: 1,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  watchButtonText: {
    color: colors.primaryGreen,
  },

  title: {
    fontSize: 16,
  },

  episodeNumber: {
    fontSize: 14,
    color: colors.mutedText,
  },

  episodeTitle: {
    fontSize: 14,
    color: colors.mutedText,
  },
});

export default ListItem;
