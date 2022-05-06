import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../values/colors';
import { dimensions } from '../../values/dimensions';
import { RootNavigationProp } from '../../types/navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pressable from '../Pressable';
import Text from '../Text';

const SearchbarToggle = () => {
  const { navigate } = useNavigation<RootNavigationProp>();

  return (
    <Pressable
      style={styles.container}
      shrinkScale={0.98}
      onPress={() => navigate('Search')}>
      <View
        style={{
          flex: 1,
          padding: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="magnify" size={24} color={colors.mutedText} />
      </View>
      <View
        style={{
          flex: 9,
          padding: 8,
          justifyContent: 'center',
        }}>
        <Text fontFamily="Semibold" style={styles.searchText}>
          Search for shows
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
    flexDirection: 'row',
    borderRadius: dimensions.cardBorderRadius,
    overflow: 'hidden',
    marginHorizontal: 16,
  },

  searchText: {
    color: colors.mutedText,
  },
});

export default SearchbarToggle;
