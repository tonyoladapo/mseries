import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SetupNavigationProp } from '../../types/navigation';
import { useDispatch } from 'react-redux';
import { setFirstRun } from '../../actions/pref';
import { colors } from '../../values/colors';
import { dimensions } from '../../values/dimensions';
import Text from '../../components/Text';
import useSetup from '../../hooks/useSetup';
import Logo from '../../components/Logo';
import Pressable from '../../components/Pressable';
import Icon from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';

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
          <Text fontFamily="Black" style={styles.welcomeText}>
            Welcome!
          </Text>
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
          <Icon name="right" size={20} color={colors.primaryText} />
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
    fontSize: 40,
    fontWeight: 'bold',
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
    backgroundColor: colors.primaryGreen,
    padding: 16,
    borderRadius: dimensions.buttonBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Welcome;
