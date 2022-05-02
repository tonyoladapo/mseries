import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../values/colors';
import Text from './Text';

interface Props {
  fontSize?: number;
}

const Logo = ({ fontSize = 20 }: Props) => {
  return (
    <Text fontFamily="Black" style={{ fontSize }}>
      mSe
      <Text
        fontFamily="Black"
        style={{
          color: colors.primaryGreen,
          fontSize,
        }}>
        ries
      </Text>
    </Text>
  );
};

export default Logo;
