import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../values/colors';
import Text from '../Text';

interface Props {
  item: any;
}

const CategoryTitle = ({ item }: Props) => {
  const category = () => {
    if (item.show_id)
      return (
        <View>
          <Text
            fontFamily="Semibold"
            style={{ color: colors.mutedText, fontSize: 15 }}>
            More like
          </Text>
          <Text numberOfLines={2} fontFamily="Bold" style={{ fontSize: 18 }}>
            {item.listTitle}
          </Text>
        </View>
      );
    return (
      <Text numberOfLines={2} fontFamily="Bold" style={styles.title}>
        {item.listTitle}
      </Text>
    );
  };
  return <View style={styles.container}>{category()}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  title: {
    fontSize: 18,
  },
});

export default CategoryTitle;
