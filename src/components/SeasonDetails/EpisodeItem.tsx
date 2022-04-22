import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../values/colors';
import moment from 'moment';
import useShow from '../../hooks/useShow';
import Text from '../Text';
import CheckBox from '../CheckBox';

const EpisodeItem = ({ item, showId }) => {
  const { name, season_number, episode_number, air_date, watched } = item;

  const { markEpisodeWatched, markEpisodeUnwatched } = useShow();
  const [checked, setChecked] = useState(watched);

  const handleCheck = () => {
    setChecked(!checked);

    if (checked) {
      markEpisodeUnwatched(showId, season_number, episode_number);
    } else {
      markEpisodeWatched(showId, season_number, episode_number);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} fontFamily="Heavy">
          {name}
        </Text>
        <Text
          fontFamily="Bold"
          style={
            styles.episodeText
          }>{`season ${season_number} episode ${episode_number}`}</Text>
        <Text fontFamily="Bold" style={styles.episodeText}>
          {air_date.length > 0 ? moment(air_date).format('MMM Do YYYY') : 'TBA'}
        </Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={checked}
          onPress={handleCheck}
          disabled={
            !moment(air_date).isValid() || moment(air_date).isAfter(moment())
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 8,
  },

  titleContainer: {
    flex: 9,
  },

  checkboxContainer: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
  },

  episodeText: {
    fontSize: 14,
    color: colors.mutedText,
  },
});

export default EpisodeItem;
