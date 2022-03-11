import React, { useState, useEffect, useRef } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { colors } from '../../values/colors';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../Text';
import useSearch from '../../hooks/useSearch';
import { ReducerTypes } from '../../types/reducerTypes';
import { dimensions } from '../../values/dimensions';

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const textinputRef = useRef<TextInput>(null);

  const { loading } = useSelector(({ search }: ReducerTypes) => search);
  const { searchShow } = useSearch();

  useEffect(() => {
    textinputRef.current?.focus();

    return () => {
      textinputRef.current?.blur();
    };
  }, []);

  useEffect(() => {
    query.length > 0 && searchShow(query);
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="magnify" size={24} color={colors.mutedText} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={textinputRef}
          placeholderTextColor={colors.mutedText}
          placeholder="Search for shows"
          style={{ justifyContent: 'center' }}
          onChangeText={setQuery}>
          <Text fontFamily="Semibold">{query}</Text>
        </TextInput>
      </View>
      <View style={styles.indicatorContainer}>
        <ActivityIndicator color={colors.mutedText} animating={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.secondaryBackground,
    borderRadius: dimensions.cardBorderRadius,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginTop: Platform.OS === 'ios' ? 8 : 0,
  },

  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  inputContainer: {
    flex: 8,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },

  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

export default Searchbar;
