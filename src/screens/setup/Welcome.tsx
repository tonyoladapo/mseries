import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SetupNavigationProp } from '../../types/navigation';
import { useDispatch } from 'react-redux';
import { setFirstRun } from '../../actions/pref';
import { colors } from '../../values/colors';
import Text from '../../components/Text';
import useSetup from '../../hooks/useSetup';
import Logo from '../../components/Logo';
import Pressable from '../../components/Pressable';
import Icon from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';
import HeaderText from '../../components/HeaderText';

const Welcome = () => {
  const dispatch = useDispatch();

  const { navigate } = useNavigation<SetupNavigationProp>();
  const { getGenres } = useSetup();

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.headerTextContainer}>
          <HeaderText style={styles.welcomeText}>Welcome!</HeaderText>
          <Text fontFamily="Bold" style={styles.subtitle}>
            Track your favorite TV shows and get notified when a new episode
            airs.
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <LottieView
          autoPlay
          loop
          source={require('../../assets/lottieAnims/watching_tv.json')}
        />
      </View>
      <View style={styles.footer}>
        <Pressable
          style={styles.nextButton}
          onPress={() => {
            dispatch(setFirstRun(false));
            navigate('SignIn');
          }}>
          <Text fontFamily="Bold" style={styles.getStartedText}>
            Get Started
          </Text>
          <Icon name="right" size={18} color={colors.primaryGreen} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    flex: 0.35,
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  welcomeText: {
    paddingVertical: 2,
  },

  subtitle: {
    color: colors.mutedText,
    paddingVertical: 2,
  },

  body: {
    flex: 0.45,
  },

  footer: {
    flex: 0.25,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '35%',
  },

  getStartedText: {
    fontSize: 18,
    color: colors.primaryGreen,
  },
});

export default Welcome;
