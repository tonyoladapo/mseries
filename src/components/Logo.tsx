import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../values/colors';
import Text from './Text';

interface Props {
  fontSize?: number;
}

const Logo = ({ fontSize = 20 }: Props) => {
  return (
    <Text style={[styles.text, { fontFamily: 'SFProDisplay-Bold', fontSize }]}>
      mSe
      <Text
        style={[
          styles.text,
          {
            color: colors.primaryGreen,
            fontFamily: 'SFProDisplay-Bold',
            fontSize,
          },
        ]}>
        ries
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default Logo;
