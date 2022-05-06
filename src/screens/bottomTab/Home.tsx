import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../types/navigation';
import { colors } from '../../values/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedHeader from '../../components/AnimatedHeader';
import ListItem from '../../components/Home/ListItem';
import Separator from '../../components/Separator';

const Home = () => {
  const renderItem = ({ item }) => <ListItem item={item} />;
  const keyExtractor = ({ name }, index) => `${index}-${name}`;

  const offset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

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
      <AnimatedHeader title="Home" animatedValue={offset} />
      <FlatList
        contentContainerStyle={{ paddingTop: 80 + insets.top, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        data={unwatched}
        extraData={unwatched}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false },
        )}
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
