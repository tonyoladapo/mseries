import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../values/colors';
import { dimensions } from '../../values/dimensions';
import AnimatedProgressbar from '../AnimatedProgressbar';
import Text from '../Text';

const SeasonItem = ({
  season,
  seasonName,
  numOfWatchedEpisodes,
  numOfAiredEpisodes,
}) => {
  console.log(numOfWatchedEpisodes, numOfAiredEpisodes);

  return (
    <View style={styles.container}>
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
        <AnimatedProgressbar progress={100} width="70%" />
        <Text
          fontFamily="Semibold"
          style={{ color: colors.mutedText, fontSize: 15 }}>
          s
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          paddingVertical: 16,
        }}></View>
    </View>
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
