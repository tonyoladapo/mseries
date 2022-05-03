import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import Text from '../Text';
import SeasonItem from './SeasonItem';

const Seasons = ({ showId, progress, added }) => {
  const renderItem = ({ item }) => (
    <SeasonItem
      firstAirDate={progress.firstAirDate}
      showId={showId}
      seasonName={item}
      season={progress.seasons[item]}
    />
  );
  const keyExtractor = (seasonName, index) => `${index}-${seasonName}`;

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
        <Text style={styles.title} fontFamily="Heavy">
          Seasons
        </Text>

        <>
          <FlatList
            data={seasons}
            keyExtractor={keyExtractor}
            scrollEnabled={false}
            renderItem={renderItem}
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
    fontSize: 15,
    marginBottom: 8,
  },
});

export default Seasons;
