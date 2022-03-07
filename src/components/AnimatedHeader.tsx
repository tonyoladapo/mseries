import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Animated,
  Text,
  Platform,
  SafeAreaView,
  NativeModules,
} from 'react-native';
import { colors } from '../values/colors';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerTypes } from '../types/reducerTypes';
import { setHeaderHeight } from '../actions/pref';
import { BlurView } from '@react-native-community/blur';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const AnimatedText = Animated.createAnimatedComponent(Text);

const AnimatedHeader = props => {
  const { name } = props.route;

  const [opacity] = useState(new Animated.Value(0));
  const statusBarHeight = NativeModules.StatusBarManager.HEIGHT;

  const { isHeaderTransparent } = useSelector(({ pref }: ReducerTypes) => pref);
  const dispatch = useDispatch();

  const show = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    isHeaderTransparent ? show() : hide();
  }, [isHeaderTransparent]);

  const hide = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView
      onLayout={e => dispatch(setHeaderHeight(e.nativeEvent.layout.height))}
      style={[{ paddingTop: statusBarHeight }, styles.container]}>
      <AnimatedBlurView
        style={[StyleSheet.absoluteFill, { opacity }]}
        blurType="dark"
      />
      <AnimatedText style={[{ opacity }, styles.title]}>{name}</AnimatedText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    overflow: 'hidden',
  },

  title: {
    fontFamily:
      Platform.OS === 'ios' ? 'SFProDisplay-Bold' : 'sfprodisplay_bold',
    color: colors.primaryText,
    fontSize: 18,
    padding: 16,
  },
});

export default AnimatedHeader;
