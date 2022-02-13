import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SetupNavigationProp } from '../../types/navigation';

const Welcome = () => {
  const { navigate } = useNavigation<SetupNavigationProp>();

  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigate('SignIn')}>
        <Text>Get Started</Text>
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

  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
    padding: 16,
    borderRadius: 7,
    marginVertical: 8,
  },
});

export default Welcome;
