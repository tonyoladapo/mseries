import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../values/colors';
import Logo from '../../components/Logo';
import HeaderText from '../../components/HeaderText';
import Text from '../../components/Text';
import GenresList from '../../components/Genres/GenresList';
import FinishButton from '../../components/Genres/FinishButton';
import useGenre from '../../hooks/useGenre';

const Genres = () => {
  const { addGenre, removeGenre, selectedGenres, saveGenres } = useGenre();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.headerTextContainer}>
          <HeaderText style={styles.genreText}>Genres</HeaderText>
          <Text fontFamily="Bold" style={styles.subtitle}>
            Pick your favorite genres to get recommendations.
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <GenresList addGenre={addGenre} removeGenre={removeGenre} />
      </View>
      <View style={styles.footer}>
        <FinishButton selectedGenres={selectedGenres} saveGenres={saveGenres} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    flex: 0.35,
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  genreText: {
    paddingVertical: 2,
  },

  subtitle: {
    color: colors.mutedText,
    paddingVertical: 2,
  },

  body: {
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    flex: 0.25,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default Genres;
