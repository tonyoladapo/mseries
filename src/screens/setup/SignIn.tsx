import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import useAuth from '../../hooks/useAuth';

const SignIn = () => {
  const { authWithGoogle, authAnonymously } = useAuth();

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        onPress={async () => await authWithGoogle()}
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
      />

      <TouchableOpacity
        style={styles.skipBtn}
        onPress={async () => await authAnonymously()}>
        <Text>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  skipBtn: {
    padding: 16,
    marginVertical: 8,
  },
});

export default SignIn;
