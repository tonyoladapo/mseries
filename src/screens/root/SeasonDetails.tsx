import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { colors } from '../../values/colors';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import EpisodeItem from '../../components/SeasonDetails/EpisodeItem';
import AnimatedProgressbar from '../../components/AnimatedProgressbar';

const SeasonDetails = ({ route }) => {
  const renderItem = ({ item }) => <EpisodeItem item={item} showId={showId} />;
  const keyExtractor = ({ id, episode_number, season_number }, index) =>
    `${index}-s${season_number}e${episode_number}-${id}`;

  const { episodes, showId, seasonName } = route.params;

  const [progress, setProgress] = useState(0);

  const { unwatchedCollection } = useSelector(({ show }: ReducerTypes) => show);
  const { numOfWatchedEpisodes, seasons } = unwatchedCollection[showId];
  const { numberOfAiredEpisodes, numberOfWatchedEpisodes } =
    seasons[seasonName];

  useEffect(() => {
    setProgress(
      numberOfAiredEpisodes > 0
        ? Math.floor((numberOfWatchedEpisodes / numberOfAiredEpisodes) * 100)
        : 0,
    );
  }, [numOfWatchedEpisodes]);

  return (
    <>
      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
        <AnimatedProgressbar progress={progress} width="100%" />
      </View>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        data={episodes}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingVertical: 16 }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 4,
    marginHorizontal: 16,
    borderWidth: 0.5,
    borderColor: colors.secondaryBackground,
  },
});

export default SeasonDetails;
