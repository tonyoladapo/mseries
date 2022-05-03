import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../types/navigation';
import { colors } from '../../values/colors';
import ListItem from '../../components/Home/ListItem';
import Separator from '../../components/Separator';

const Home = () => {
  const renderItem = ({ item }) => <ListItem item={item} />;
  const keyExtractor = ({ name }, index) => `${index}-${name}`;

  const { isNewUser, unwatched } = useSelector(
    ({ pref, show }: ReducerTypes) => ({ ...pref, ...show }),
  );
  const { navigate } = useNavigation<RootNavigationProp>();

  useEffect(() => {
    setTimeout(() => {
      isNewUser && navigate('Genres');
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        data={unwatched}
        extraData={unwatched}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={() => <Separator />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  separator: {
    marginVertical: 16,
    borderWidth: 0.5,
    borderColor: colors.secondaryBackground,
  },
});

export default Home;
