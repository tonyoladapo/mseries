import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../types/navigation';
import BottomTabList from '../../components/BottomTabList/BottomTabList';
import ListItem from '../../components/Home/ListItem';
import HomeEmptyList from '../../components/Home/HomeEmptyList';

const Home = () => {
  const { isNewUser, unwatched, headerHeight } = useSelector(
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
      <BottomTabList
        title="Home"
        data={unwatched}
        contentContainerStyle={
          unwatched.length
            ? {
                paddingTop: headerHeight,
              }
            : {
                paddingTop: headerHeight,
                flex: 1,
              }
        }
        keyExtractor={({ name }, index) => `${index}-${name}`}
        renderItem={({ item }) => <ListItem item={item} />}
        ListEmptyComponent={<HomeEmptyList />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
