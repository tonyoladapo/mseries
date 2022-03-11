import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../values/colors';
import { dimensions } from '../../values/dimensions';
import { useNavigation } from '@react-navigation/native';
import { BottomNavigationProp } from '../../types/navigation';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../Text';
import Pressable from '../Pressable';

const HomeEmptyList = () => {
  const { navigate } = useNavigation<BottomNavigationProp>();

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop={false}
        style={styles.lottie}
        source={require('../../assets/lottieAnims/popcorn.json')}
      />
      <Pressable
        style={styles.addShowButton}
        onPress={() => navigate('Discover')}>
        <Icon name="plus" size={24} color={colors.primaryGreen} />
        <Text fontFamily="Bold" style={styles.buttonText}>
          Add a show
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addShowButton: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.secondaryBackground,
    borderRadius: dimensions.cardBorderRadius,
  },

  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
  },

  lottie: { width: 200, height: 200 },
});

export default HomeEmptyList;
