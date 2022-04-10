import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../values/colors';
import { dimensions } from '../../values/dimensions';
import AnimatedProgressbar from '../AnimatedProgressbar';
import Text from '../Text';
import Pressable from '../Pressable';

const SeasonItem = ({ seasonName, numOfWatchedEpisodes, numOfEpisodes }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(
      numOfEpisodes > 0 ? (numOfWatchedEpisodes / numOfEpisodes) * 100 : 0,
    );
  }, [numOfWatchedEpisodes, numOfEpisodes, seasonName]);

  return (
    <Pressable style={styles.container}>
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
          {numOfWatchedEpisodes}/{numOfEpisodes}
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          paddingVertical: 16,
        }}></View>
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
