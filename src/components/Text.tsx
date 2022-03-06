import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { colors } from '../values/colors';

interface Props extends TextProps {
  style: TextStyles | TextStyles[];
}

interface TextStyles extends TextStyle {
  fontFamily?:
    | 'SFProDisplay-Bold'
    | 'SFProDisplay-Regular'
    | 'SFProDisplay-BlackItalic'
    | 'SFProDisplay-HeavyItalic'
    | 'SFProDisplay-LightItalic'
    | 'SFProDisplay-Medium'
    | 'SFProDisplay-SemiboldItalic'
    | 'SFProDisplay-ThinItalic'
    | 'SFProDisplay-UltralightItalic';
}

const Text = ({ children, style, ...restProps }: Props) => {
  return (
    <RNText
      style={[
        { fontFamily: 'SFProDisplay-Regular', color: colors.primaryText },
        style,
      ]}
      {...restProps}>
      {children}
    </RNText>
  );
};

export default Text;
