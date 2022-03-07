import React from 'react';
import { Text as RNText, TextProps, Platform } from 'react-native';
import { colors } from '../values/colors';

interface Props extends TextProps {
  fontFamily?:
    | 'Black'
    | 'BlackItalic'
    | 'Heavy'
    | 'HeavyItalic'
    | 'Bold'
    | 'BoldItalic'
    | 'Semibold'
    | 'SemiboldItalic'
    | 'Medium'
    | 'MediumItalic'
    | 'Regular'
    | 'RegularItalic'
    | 'Thin'
    | 'ThinItalic'
    | 'Light'
    | 'LightItalic'
    | 'UltralightItalic'
    | 'Ultralight';
}

const Text = ({
  children,
  style,
  fontFamily = 'Regular',
  ...restProps
}: Props) => {
  const font = () => {
    switch (fontFamily) {
      case 'Black':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-Black'
          : 'sfprodisplay_black';
      case 'BlackItalic':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-BlackItalic'
          : 'sfprodisplay_blackitalic';
      case 'Heavy':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-Heavy'
          : 'sfprodisplay_heavy';
      case 'HeavyItalic':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-HeavyItalic'
          : 'sfprodisplay_heavyitalic';
      case 'Bold':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-Bold'
          : 'sfprodisplay_bold';
      case 'BoldItalic':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-BoldItalic'
          : 'sfprodisplay_bolditalic';
      case 'Semibold':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-Semibold'
          : 'sfprodisplay_semibold';
      case 'SemiboldItalic':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-SemiboldItalic'
          : 'sfprodisplay_semibolditalic';
      case 'Medium':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-Medium'
          : 'sfprodisplay_medium';
      case 'MediumItalic':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-MediumItalic'
          : 'sfprodisplay_mediumitalic';
      case 'Regular':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-Regular'
          : 'sfprodisplay_regular';
      case 'RegularItalic':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-RegularItalic'
          : 'sfprodisplay_regularitalic';
      case 'Thin':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-Thin'
          : 'sfprodisplay_thin';
      case 'ThinItalic':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-ThinItalic'
          : 'sfprodisplay_thinitalic';
      case 'Light':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-Light'
          : 'sfprodisplay_light';
      case 'LightItalic':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-LightItalic'
          : 'sfprodisplay_lightitalic';
      case 'Ultralight':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-Ultralight'
          : 'sfprodisplay_ultralight';
      case 'UltralightItalic':
        return Platform.OS === 'ios'
          ? 'SFProDisplay-UltralightItalic'
          : 'sfprodisplay_ultralightitalic';
      default:
        return Platform.OS === 'ios'
          ? 'SFProDisplay-Regular'
          : 'sfprodisplay_regular';
    }
  };

  return (
    <RNText
      style={[{ fontFamily: font(), color: colors.primaryText }, style]}
      {...restProps}>
      {children}
    </RNText>
  );
};

export default Text;
