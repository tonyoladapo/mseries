import React from 'react';
import { StyleSheet } from 'react-native';
import Text from '../Text';
import Pressable from '../Pressable';
import moment from 'moment';
import useShow from '../../hooks/useShow';

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
  let key = Object.keys(item.seasons).reduce((key, val) =>
    val.slice(7) < key.slice(7) ? val : key,
  );

  const upNext = item.seasons[key][0];

  const { markEpisodeWatched } = useShow();

  const episodeTitle = upNext.name;
  const showId = item.id.toString();
  const seasonNumber = upNext.season_number.toString();
  const episodeNumber = upNext.episode_number.toString();
  const airDate = upNext.air_date;

  return (
    <>
      {moment(airDate).isBefore(moment()) && (
        <Pressable
          onPress={() =>
            markEpisodeWatched(showId, seasonNumber, episodeNumber)
          }
          style={styles.container}>
          <Text>{item.name}</Text>
          <Text>{episodeTitle}</Text>
          <Text>{`Season ${seasonNumber} episode ${episodeNumber}`}</Text>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'tomato',
    marginVertical: 2,
  },
});

export default ListItem;
