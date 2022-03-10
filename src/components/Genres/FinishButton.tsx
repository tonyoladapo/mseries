import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { colors } from '../../values/colors';
import Text from '../Text';

const AnimatedView = Animated.createAnimatedComponent(TouchableOpacity);

const FinishButton = ({ selectedGenres, saveGenres }) => {
  const [animVal] = useState(new Animated.Value(0));
  const [shown, setShown] = useState(false);

  const show = () => {
    Animated.timing(animVal, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const hide = () => {
    Animated.timing(animVal, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setShown(false);
    });
  };

  useEffect(() => {
    if (selectedGenres.length >= 3 && !shown) {
      setShown(() => {
        show();
        return true;
      });
    }
    if (selectedGenres.length < 3) hide();
  }, [selectedGenres]);

  return (
    <>
      {shown && (
        <AnimatedView
          disabled={!shown}
          style={[styles.container, { opacity: animVal }]}
          onPress={saveGenres}>
          <Text fontFamily="Bold" style={styles.text}>
            Finish
          </Text>
        </AnimatedView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  text: {
    color: colors.primaryGreen,
    fontSize: 18,
  },
});

export default FinishButton;
