import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { colors } from '../../values/colors';
import { dimensions } from '../../values/dimensions';
import Text from '../../components/Text';
import useAuth from '../../hooks/useAuth';
import Logo from '../../components/Logo';
import HeaderText from '../../components/HeaderText';
import LottieView from 'lottie-react-native';
import Pressable from '../../components/Pressable';
import Icon from 'react-native-vector-icons/AntDesign';

const SignIn = () => {
  const { authWithGoogle, authAnonymously } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.headerTextContainer}>
          <HeaderText style={styles.signinText}>Sign In!</HeaderText>
          <Text fontFamily="Bold" style={styles.subtitle}>
            Sign in with your Google account to back up your data.
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <LottieView
          autoPlay
          source={require('../../assets/lottieAnims/signin.json')}
        />
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.signinButton} onPress={authWithGoogle}>
          <View style={styles.buttonImageContainer}>
            <Image
              source={require('../../assets/images/google_logo.png')}
              style={styles.buttonImage}
            />
          </View>
          <View style={styles.buttonTextContainer}>
            <Text fontFamily="Bold">Sign in with Google</Text>
          </View>
        </Pressable>

        <Pressable style={styles.skipButton} onPress={authAnonymously}>
          <Text fontFamily="Bold" style={styles.skipButtonText}>
            Skip
          </Text>
          <Icon name="right" size={18} color={colors.mutedText} />
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

  signinText: {
    fontSize: 35,
    fontWeight: 'bold',
    paddingVertical: 2,
  },

  subtitle: {
    color: colors.mutedText,
    paddingVertical: 2,
  },

  body: {
    flex: 0.35,
  },

  footer: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  signinButton: {
    flexDirection: 'row',
    backgroundColor: colors.secondaryBackground,
    width: '55%',
    borderRadius: dimensions.buttonBorderRadius,
    height: 40,
    overflow: 'hidden',
  },

  buttonImageContainer: {
    flex: 0.15,
    backgroundColor: '#212121',
    padding: 10,
  },

  buttonImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },

  buttonTextContainer: {
    flex: 0.85,
    alignItems: 'center',
    justifyContent: 'center',
  },

  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '25%',
    padding: 16,
  },

  skipButtonText: {
    fontSize: 15,
    color: colors.mutedText,
  },
});

export default SignIn;
