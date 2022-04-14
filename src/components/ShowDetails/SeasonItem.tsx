import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../values/colors';
import { dimensions } from '../../values/dimensions';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../types/navigation';
import AnimatedProgressbar from '../AnimatedProgressbar';
import Text from '../Text';
import Pressable from '../Pressable';
import CheckBox from '../CheckBox';
import useShow from '../../hooks/useShow';

const SeasonItem = ({ seasonName, season, showId }) => {
  const {
    completed,
    numberOfAiredEpisodes,
    numberOfWatchedEpisodes,
    numberOfEpisodes,
    episodes,
  } = season;

  const seasonNumber = parseInt(seasonName.slice(7));

  const { navigate } = useNavigation<RootNavigationProp>();

  const [progress, setProgress] = useState(0);

  const { markSeasonWatched, markSeasonUnwatched } = useShow();

  const handleChecked = async () => {
    if (completed) {
      markSeasonUnwatched(showId.toString(), seasonNumber);
    } else {
      markSeasonWatched(showId.toString(), seasonNumber);
    }
  };

  useEffect(() => {
    setProgress(
      numberOfAiredEpisodes > 0
        ? Math.floor((numberOfWatchedEpisodes / numberOfAiredEpisodes) * 100)
        : 0,
    );
  }, [
    numberOfWatchedEpisodes,
    numberOfAiredEpisodes,
    seasonName,
    numberOfEpisodes,
  ]);

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigate('SeasonDetails', {
          showId,
          episodes,
          seasonName,
        })
      }>
      <View
        style={{
          flex: 2.5,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 16,
        }}>
        <Text style={{ fontSize: 15 }} fontFamily="Semibold">
          {seasonName}
        </Text>
      </View>
      <View
        style={{
          flex: 5.5,
          paddingVertical: 16,
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <AnimatedProgressbar progress={progress} width="70%" />
        <Text
          fontFamily="Semibold"
          style={{ color: colors.mutedText, fontSize: 15 }}>
          {numberOfWatchedEpisodes}/{numberOfEpisodes}
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          paddingVertical: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CheckBox checked={completed} onPress={handleChecked} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 4,
    borderRadius: dimensions.cardBorderRadius,
    overflow: 'hidden',
    backgroundColor: colors.secondaryBackground,
  },
});

export default SeasonItem;
