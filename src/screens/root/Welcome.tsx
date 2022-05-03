import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../values/colors';
import { dimensions } from '../../values/dimensions';
import WelcomeSvg from '../../assets/svg/watching_tv.svg';
import Text from '../../components/Text';
import useSetup from '../../hooks/useSetup';
import Logo from '../../components/Logo';
import Pressable from '../../components/Pressable';
import useAuth from '../../hooks/useAuth';
import Image from '../../components/Image';

const Welcome = () => {
  const { authWithGoogle, authAnonymously, authenticating } = useAuth();
  const { getGenres } = useSetup();

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Logo fontSize={30} />

        <View style={{ flex: 5 }}>
          <WelcomeSvg height="100%" width="100%" />
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'space-around',
          }}>
          <Text fontFamily="Bold" style={{ fontSize: 20, textAlign: 'center' }}>
            Track and manage your watch progress of your favorite TV shows.
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: colors.mutedText,
              textAlign: 'center',
            }}>
            Signing in with Google gives you the ability to backup your progress
            to the cloud.
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Pressable
            style={styles.signinButton}
            onPress={authWithGoogle}
            disabled={authenticating}>
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

          <Pressable
            style={styles.skipButton}
            onPress={authAnonymously}
            disabled={authenticating}>
            <Text fontFamily="Bold" style={styles.skipButtonText}>
              No thanks
            </Text>
          </Pressable>
        </View>
      </View>

      {authenticating && (
        <View
          style={{
            alignSelf: 'center',
            padding: 32,
            backgroundColor: 'rgba(0,0,0,0.8)',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },

  signinText: {
    paddingVertical: 2,
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
    justifyContent: 'center',
    width: '50%',
    padding: 16,
  },

  skipButtonText: {
    fontSize: 15,
    color: colors.mutedText,
  },
});

export default Welcome;
