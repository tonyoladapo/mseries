import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../types/navigation';

const Shows = () => {
  const { userShows } = useSelector(({ show }: ReducerTypes) => show);

  return (
    <View style={styles.container}>
      <FlatList
        data={userShows}
        keyExtractor={({ id, name }, index) => `${index}-${name}-${id}`}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  );
};

const Item = ({ item }: any) => {
  const { navigate } = useNavigation<RootNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigate('ShowDetails', {
          show: item,
        })
      }
      style={{
        flex: 1,
        height: 150,
        width: 100,
        marginHorizontal: 2,
      }}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
        }}
        style={{ width: '100%', height: '100%', borderRadius: 7 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Shows;
