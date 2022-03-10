import React from 'react';
import { View, StyleSheet } from 'react-native';
import Pressable from '../../components/Pressable';
import Text from '../../components/Text';
import useAuth from '../../hooks/useAuth';

const More = () => {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Pressable onPress={signOut}>
        <Text>Logout</Text>
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
});

export default More;
