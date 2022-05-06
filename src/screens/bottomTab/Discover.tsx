import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  SafeAreaView,
  Animated,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/reducerTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useDiscover from '../../hooks/useDiscover';
import DiscoverCategory from '../../components/Discover/DiscoverCategory';
import SearchbarToggle from '../../components/Discover/SearchbarToggle';
import AnimatedHeader from '../../components/AnimatedHeader';

const Discover = () => {
  const renderItem = ({ item }) => <DiscoverCategory item={item} />;
  const keyExtractor = ({ listTitle }, index) => `${index}-${listTitle}`;

  const offset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const { discoverShows } = useSelector(({ discover, pref }: ReducerTypes) => ({
    ...discover,
    ...pref,
  }));
  const { getDiscoverShows, loading } = useDiscover();

  useEffect(() => {
    getDiscoverShows();
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedHeader title="Discover" animatedValue={offset} />
      {loading ? (
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator />
        </SafeAreaView>
      ) : (
        <FlatList
          style={{ paddingTop: 16 }}
          data={discoverShows}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ paddingTop: 80 + insets.top }}
          renderItem={renderItem}
          ListHeaderComponent={<SearchbarToggle />}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: false },
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Discover;
