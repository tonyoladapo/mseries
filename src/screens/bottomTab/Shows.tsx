import React, { useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useMyShows from '../../hooks/useMyShows';
import SectionHeader from '../../components/BottomTabList/SectionHeader';
import ListItem from '../../components/Shows/ListItem';
import ShowsListEmpty from '../../components/Shows/ShowsListEmpty';
import AnimatedHeader from '../../components/AnimatedHeader';

const Shows = () => {
  const renderItem = ({ item }) => <ListItem item={item} />;
  const keyExtractor = ({ id, name }, index) => `${index}-${name}-${id}`;

  const offset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const { listData, userShows } = useMyShows();

  return (
    <View style={styles.container}>
      <AnimatedHeader title="My shows" animatedValue={offset} />
      {userShows.length > 0 ? (
        <SectionGrid
          spacing={16}
          itemDimension={80}
          sections={listData}
          contentContainerStyle={{ paddingTop: 80 + insets.top }}
          showsVerticalScrollIndicator={false}
          extraData={listData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title, data } }) => (
            <SectionHeader title={title} data={data} />
          )}
          stickySectionHeadersEnabled={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: false },
          )}
        />
      ) : (
        <ShowsListEmpty />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Shows;
