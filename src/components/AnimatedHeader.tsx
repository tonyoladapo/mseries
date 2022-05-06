import React from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../values/colors';
import { BlurView } from 'expo-blur';

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const AnimatedView = Animated.createAnimatedComponent(View);

const HEADER_HEIGHT = 80;

interface Props {
  animatedValue: Animated.Value;
  title: string;
  children?: React.ReactNode;
}

const AnimatedHeader = ({ children, animatedValue, title }: Props) => {
  const insets = useSafeAreaInsets();

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 44],
    extrapolateRight: 'clamp',
  });

  const fontSize = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [30, 20],
    extrapolate: 'clamp',
  });

  const blurIntensity = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const separatorOpacity = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.container, { height: headerHeight }]}>
      <AnimatedBlurView
        style={StyleSheet.absoluteFill}
        intensity={blurIntensity}
        tint="dark"
      />
      <AnimatedText
        style={[
          styles.title,
          {
            fontSize,
            fontFamily:
              Platform.OS === 'ios'
                ? 'SFProDisplay-Black'
                : 'sfprodisplay_black',
          },
        ]}>
        {title}
      </AnimatedText>
      <AnimatedView style={[styles.separator, { opacity: separatorOpacity }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: colors.transparent,
    justifyContent: 'flex-end',
  },

  title: {
    color: colors.primaryText,
    marginVertical: 8,
    includeFontPadding: false,
    paddingHorizontal: 16,
  },

  separator: {
    backgroundColor: colors.secondaryBackground,
    height: 1,
  },
});

export default AnimatedHeader;
