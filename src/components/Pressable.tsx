import React, { useState } from 'react';
import {
  Pressable as RNPressable,
  PressableProps,
  Animated,
} from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(RNPressable);

interface Props extends PressableProps {
  defaultScale?: number;
  shrinkScale?: number;
}

const Pressable = ({
  children,
  defaultScale = 1,
  shrinkScale = 0.95,
  style,
  ...restProps
}: Props) => {
  const [scaleValue] = useState(new Animated.Value(defaultScale));

  const animatedStyles = {
    transform: [
      {
        scale: scaleValue,
      },
    ],
  };

  const shrink = () => {
    Animated.timing(scaleValue, {
      toValue: shrinkScale,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const grow = () => {
    Animated.timing(scaleValue, {
      toValue: defaultScale,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedPressable
      //@ts-ignore
      style={[style, animatedStyles]}
      onPressIn={shrink}
      onPressOut={grow}
      {...restProps}>
      {children}
    </AnimatedPressable>
  );
};

export default Pressable;
