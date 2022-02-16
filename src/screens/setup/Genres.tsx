import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Genre, ReducerTypes } from '../../types/reducerTypes';
import { setSetupComplete, setIsNewUser } from '../../actions/pref';
import { useNavigation } from '@react-navigation/native';

const Genres = () => {
  const { genres } = useSelector(({ show }: ReducerTypes) => show);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const { navigate, goBack } = useNavigation();

  const dispatch = useDispatch();

  const addGenre = (genre: Genre) => {
    setSelectedGenres([...selectedGenres, genre]);
  };

  const removeGenre = (genre: Genre) => {
    setSelectedGenres(selectedGenres.filter((g: Genre) => g.id !== genre.id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={3}
        data={genres}
        keyExtractor={({ id, name }, index) => `${index}-${name}-${id}`}
        renderItem={({ item }) => (
          <Item item={item} addGenre={addGenre} removeGenre={removeGenre} />
        )}
      />

      {selectedGenres.length >= 3 && (
        <TouchableOpacity
          style={{ padding: 16 }}
          onPress={() => {
            dispatch(setIsNewUser(false));
            dispatch(setSetupComplete(true));
            goBack();
          }}>
          <Text>Finish</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const Item = ({ item, addGenre, removeGenre }: any) => {
  const [selected, setSelected] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(!selected);
        selected ? removeGenre(item) : addGenre(item);
      }}
      style={{
        padding: 16,
        borderRadius: 50,
        margin: 3,
        backgroundColor: selected ? 'tomato' : '#ccc',
      }}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Genres;
