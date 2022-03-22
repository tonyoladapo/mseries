import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { colors } from '../values/colors';

const AnimatedView = Animated.createAnimatedComponent(View);

const AnimatedProgressbar = ({ progress, width = '50%' }) => {
  const [progressAnimVal] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progressAnimVal, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const color = progressAnimVal.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [colors.primaryRed, colors.primaryYellow, colors.primaryGreen],
  });

  const animWidth = progressAnimVal.interpolate({
    inputRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    outputRange: [
      '0%',
      '10%',
      '20%',
      '30%',
      '40%',
      '50%',
      '60%',
      '70%',
      '80%',
      '90%',
      '100%',
    ],
  });

  return (
    <View style={[styles.container, { width }]}>
      <AnimatedView
        style={[styles.progress, { backgroundColor: color, width: animWidth }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mutedText,
    height: 5,
    borderRadius: 5,
  },

  progress: {
    borderRadius: 5,
    flex: 1,
  },
});

export default AnimatedProgressbar;
