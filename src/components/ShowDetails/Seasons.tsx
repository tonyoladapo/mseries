import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors } from '../../values/colors';
import Text from '../Text';
import SeasonItem from './SeasonItem';

const AnimatedView = Animated.createAnimatedComponent(View);

const Seasons = ({ added, showId, seasonDetails }) => {
  const [animVal] = useState(new Animated.Value(0));
  const [isShowing, setIsShowing] = useState(added);

  const show = () => {
    setIsShowing(true);

    Animated.timing(animVal, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const hide = () => {
    Animated.timing(animVal, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsShowing(false);
    });
  };

  useEffect(() => {
    added ? show() : hide();
  }, [added]);

  const seasons: any = [];

  for (let key in seasonDetails.seasons) {
    seasons.push(key);
  }

  return (
    <>
      {isShowing && (
        <View style={styles.container}>
          <AnimatedView
            style={{
              //   height: heightInterpolator,
              opacity: animVal,
            }}>
            <Text style={styles.title} fontFamily="Bold">
              Seasons
            </Text>

            <View>
              {seasons.map((season, index) => {
                return (
                  <SeasonItem
                    key={`${index}-${showId}-${season}`}
                    season={seasonDetails.seasons[season]}
                    seasonName={season}
                    numOfWatchedEpisodes={seasonDetails.numOfWatchedEpisodes}
                    numOfAiredEpisodes={seasonDetails.numOfAiredEpisodes}
                  />
                );
              })}
            </View>
          </AnimatedView>
        </View>
      )}
    </>
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
