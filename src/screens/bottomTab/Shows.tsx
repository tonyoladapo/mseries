import React from 'react';
import { View, StyleSheet } from 'react-native';
import SectionList from '../../components/BottomTabList/SectionList';
import useMyShows from '../../hooks/useMyShows';
import SectionHeader from '../../components/BottomTabList/SectionHeader';
import ListItem from '../../components/Shows/ListItem';

const Shows = () => {
  const { listData } = useMyShows();

  return (
    <View style={styles.container}>
      <SectionList
        title="My Shows"
        sections={listData}
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
