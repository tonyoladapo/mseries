import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Animated } from 'react-native';
import useGenre from '../../hooks/useGenre';
import { Genre } from '../../types/show';
import { colors } from '../../values/colors';
import Text from '../Text';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  item: any;
  addGenre: (genre: Genre) => void;
  removeGenre: (genre: Genre) => void;
}

const GenreItem = ({ item, addGenre, removeGenre }: Props) => {
  const [selected, setSelected] = useState(false);
  const [animVal] = useState(new Animated.Value(0));

  const interpolator = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.secondaryBackground, colors.primaryRed],
  });

  useEffect(() => {
    Animated.timing(animVal, {
      toValue: selected ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [selected]);

  const handlePress = () => {
    setSelected(!selected);
    selected ? removeGenre(item) : addGenre(item);
  };

  return (
    <AnimatedPressable
      style={[
        styles.container,
        {
          backgroundColor: interpolator,
          borderWidth: 1,
          borderColor: selected ? interpolator : colors.mutedText,
        },
      ]}
      onPress={handlePress}>
      <Text fontFamily="Semibold">{item.name}</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 10,
    margin: 4,
  },
});

export default GenreItem;
