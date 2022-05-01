import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';
import useMyShows from '../../hooks/useMyShows';
import SectionHeader from '../../components/BottomTabList/SectionHeader';
import ListItem from '../../components/Shows/ListItem';
import Separator from '../../components/Separator';

const Shows = () => {
  const { listData } = useMyShows();

  return (
    <View style={styles.container}>
      <SectionGrid
        spacing={16}
        itemDimension={80}
        contentInsetAdjustmentBehavior="automatic"
        sections={listData}
        showsVerticalScrollIndicator={false}
        extraData={listData}
        keyExtractor={({ id, name }, index) => `${index}-${name}-${id}`}
        renderItem={({ item }) => <ListItem item={item} />}
        renderSectionHeader={({ section: { title, data } }) => (
          <SectionHeader title={title} data={data} />
        )}
        ListHeaderComponent={() => <Separator />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 15,
    marginHorizontal: 16,
  },

  contentContainer: {
    marginVertical: 16,
  },
});

export default Shows;
