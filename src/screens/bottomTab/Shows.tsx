import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';
import useMyShows from '../../hooks/useMyShows';
import SectionHeader from '../../components/BottomTabList/SectionHeader';
import ListItem from '../../components/Shows/ListItem';
import Separator from '../../components/Separator';
import ShowsListEmpty from '../../components/Shows/ShowsListEmpty';

const Shows = () => {
  const renderItem = ({ item }) => <ListItem item={item} />;
  const keyExtractor = ({ id, name }, index) => `${index}-${name}-${id}`;

  const { listData, userShows } = useMyShows();

  return (
    <View style={styles.container}>
      {userShows.length > 0 ? (
        <SectionGrid
          style={{ flex: 1 }}
          spacing={16}
          itemDimension={80}
          contentInsetAdjustmentBehavior="automatic"
          sections={listData}
          showsVerticalScrollIndicator={false}
          extraData={listData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title, data } }) => (
            <SectionHeader title={title} data={data} />
          )}
          ListHeaderComponent={() => <Separator />}
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
