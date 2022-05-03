import React, { useState, useEffect } from 'react';
import { Image as RNImage, ImageProps, Animated } from 'react-native';
//@ts-ignore
import placeholder from '../assets/images/placeholder.png';

const AnimatedImage = Animated.createAnimatedComponent(RNImage);

const Image = ({ style, source, ...restProps }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [placeholderHidden, setIsPlaceholderHidden] = useState(false);

  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    isLoaded &&
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsPlaceholderHidden(true);
      });
  }, [isLoaded]);

  return (
    <>
      {!placeholderHidden && (
        <AnimatedImage source={placeholder} style={style} {...restProps} />
      )}

      <AnimatedImage
        onLoad={() => setIsLoaded(true)}
        style={[{ opacity, position: 'absolute' }, style]}
        source={source}
        {...restProps}
      />
    </>
  );
};

export default Image;
