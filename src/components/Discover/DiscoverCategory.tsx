import React, { memo } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../values/colors';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../types/navigation';
import Text from '../../components/Text';
import CategoryItem from './CategoryItem';
import CategoryTitle from './CategoryTitle';

interface Props {
  item: any;
}

const DiscoverCategory = ({ item }: Props) => {
  const renderItem = ({ item }) => <CategoryItem item={item} />;
  const keyExtractor = ({ name, id }, index) => `${index}-${name}-${id}`;

  const { navigate } = useNavigation<RootNavigationProp>();

  const category =
    item.listTitle === 'Trending Now 🔥'
      ? 'trending'
      : item.listTitle === 'Most Anticipated Shows 🎬' && 'anticipated';

  return (
    <>
      {item.shows.length > 0 && (
        <View style={styles.container}>
          <View style={styles.header}>
            <CategoryTitle item={item} />
            {(category === 'trending' || category === 'anticipated') && (
              <TouchableOpacity
                onPress={() =>
                  navigate('DiscoverMore', {
                    category,
                    listTitle: item.listTitle,
                  })
                }
                style={styles.seeAllButton}>
                <Text fontFamily="Bold" style={styles.seeAll}>
                  See All
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.body}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              data={item.shows}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 4,
  },

  header: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  body: {
    flex: 8,
  },

  title: {
    padding: 16,
  },

  seeAll: {
    color: colors.primaryGreen,
  },

  seeAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default memo(DiscoverCategory);
