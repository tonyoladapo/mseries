import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useAuth from '../../hooks/useAuth';

const Home = () => {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ padding: 16 }} onPress={signOut}>
        <Text>Sign out</Text>
      </TouchableOpacity>
      <Text>Home</Text>
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

export default Home;
