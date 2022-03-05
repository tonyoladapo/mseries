import { DefaultTheme } from '@react-navigation/native';
import { colors } from '../values/colors';

export const appTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primaryGreen,
    background: colors.primaryBackground,
    card: colors.secondaryBackground,
    text: colors.primaryText,
    border: colors.primaryBackground,
  },
};
