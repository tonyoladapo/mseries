import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Animated, View } from 'react-native';
import { colors } from '../values/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);

const CheckBox = ({ checked, onPress }) => {
  const [animval] = useState(new Animated.Value(0));

  const backgroundColor = animval.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.transparent, colors.darkGreen],
  });

  const iconOpacity = animval.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    Animated.timing(animval, {
      toValue: checked ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [checked]);

  return (
    <AnimatedPressable
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}>
      <AnimatedView style={{ opacity: iconOpacity }}>
        <Icon name="check" color={colors.primaryGreen} />
      </AnimatedView>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.darkGreen,
  },
});

export default CheckBox;
