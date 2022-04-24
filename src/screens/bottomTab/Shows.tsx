import React from 'react';
import { StyleSheet, View } from 'react-native';
import useMyShows from '../../hooks/useMyShows';
import SectionHeader from '../../components/BottomTabList/SectionHeader';
import ListItem from '../../components/Shows/ListItem';
import { SectionGrid } from 'react-native-super-grid';

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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Shows;
