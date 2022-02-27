import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../types/navigation';
import useAuth from '../../hooks/useAuth';

const Home = () => {
  const { isNewUser, unwatched } = useSelector(
    ({ pref, show }: ReducerTypes) => ({ ...pref, ...show }),
  );
  const { signOut } = useAuth();
  const { navigate } = useNavigation<RootNavigationProp>();

  useEffect(() => {
    setTimeout(() => {
      isNewUser && navigate('Genres');
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={unwatched}
        keyExtractor={({ name }, index) => `${index}-${name}`}
        renderItem={({ item }) =>
          Object.keys(item.seasons).length > 0 ? <Item item={item} /> : null
        }
      />
      <TouchableOpacity style={{ padding: 16 }} onPress={signOut}>
        <Text>Sign out</Text>
      </TouchableOpacity>
      <Text>Home</Text>
    </View>
  );
};

const Item = ({ item }: any) => {
  let key = Object.keys(item.seasons).reduce((key, v) =>
    v.slice(7) < key.slice(7) ? v : key,
  );

  const upNext = item.seasons[key][0];

  return (
    <TouchableOpacity>
      <Text>{item.name}</Text>
      <Text>{`Season ${upNext.season_number} episode ${upNext.episode_number}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
