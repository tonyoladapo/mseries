import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import { Genre } from '../../types/show';
import GenreItem from './GenreItem';

interface Props {
  addGenre: (genre: Genre) => void;
  removeGenre: (genre: Genre) => void;
}

const GenresList = ({ addGenre, removeGenre }: Props) => {
  const renderItem = ({ item }) => (
    <GenreItem item={item} addGenre={addGenre} removeGenre={removeGenre} />
  );

  const keyExtractor = ({ id, name }, index) => `${index}-${name}-${id}`;

  const { genres } = useSelector(({ show }: ReducerTypes) => show);
  return (
    <FlatList
      data={genres}
      numColumns={3}
      contentContainerStyle={{ alignItems: 'center' }}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default GenresList;
