import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SetupNavigationProp } from '../../types/navigation';
import { useDispatch } from 'react-redux';
import { setFirstRun } from '../../actions/pref';
import useSetup from '../../hooks/useSetup';

const Welcome = () => {
  const dispatch = useDispatch();

  const { navigate } = useNavigation<SetupNavigationProp>();
  const { getGenres } = useSetup();

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          dispatch(setFirstRun(false));
          navigate('SignIn');
        }}>
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
