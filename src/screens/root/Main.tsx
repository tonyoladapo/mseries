import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import useAuth from '../../hooks/useAuth';

const Main = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <TouchableOpacity onPress={signOut}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
