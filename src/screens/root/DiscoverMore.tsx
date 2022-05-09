import React from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import ListItem from '../../components/DiscoverMore/ListItem';
import Text from '../../components/Text';
import useDiscoverMore from '../../hooks/useDiscoverMore';

const DiscoverMore = ({ route }) => {
  const { category } = route.params;
  const { loading, page, fetchMore, shows } = useDiscoverMore(category);

  const renderItem = ({ item }) => <ListItem item={item} />;
  const keyExtractor = ({ name, id }, index) => `${index}-${name}-${id}`;

  return (
    <>
      {loading && page === 1 ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatGrid
            spacing={16}
            itemDimension={80}
            showsVerticalScrollIndicator={false}
            data={shows}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            onEndReachedThreshold={0.9}
            onEndReached={() => page <= 5 && fetchMore()}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DiscoverMore;
