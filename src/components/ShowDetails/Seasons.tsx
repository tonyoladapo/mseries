import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { colors } from '../../values/colors';
import Text from '../Text';
import SeasonItem from './SeasonItem';

const Seasons = ({ showId, progress, added }) => {
  const [seasons, setSeasons] = useState<string[]>([]);
  const [scrollviewWidth, setScrollviewWidth] = useState(0);

  const scrollviewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (added && progress != null) {
      let arr: string[] = [];

      for (let key in progress.seasons) {
        arr.push(key);
      }

      setSeasons(
        arr.sort((a, b) => {
          return parseInt(a.slice(7)) - parseInt(b.slice(7));
        }),
      );
    }
  }, [added]);

  return (
    <ScrollView
      ref={scrollviewRef}
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }) => setScrollviewWidth(width)}
      style={styles.container}
      horizontal
      scrollEnabled={false}>
      <View style={{ width: scrollviewWidth }}>
        <Text style={styles.title} fontFamily="Bold">
          Seasons
        </Text>

        <>
          <FlatList
            data={seasons}
            keyExtractor={(seasonName, index) =>
              `${index}-${seasonName}-${Date.now()}`
            }
            scrollEnabled={false}
            renderItem={({ item }) => (
              <SeasonItem
                seasonName={item}
                numOfEpisodes={progress.seasons[item].numberOfEpisodes}
                numOfWatchedEpisodes={
                  progress.seasons[item].numberOfWatchedEpisodes
                }
              />
            )}
          />
        </>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },

  title: {
    color: colors.primaryGreen,
    marginVertical: 6,
  },
});

export default Seasons;
