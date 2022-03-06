import React from 'react';
import Text from './Text';
import { StyleSheet, TextProps } from 'react-native';

const HeaderText = ({ children, style, ...restProps }: TextProps) => {
  return (
    <Text fontFamily="Black" style={[styles.headerText, style]} {...restProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
});

export default HeaderText;
