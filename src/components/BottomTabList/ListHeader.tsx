import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import SearchbarToggle from '../Discover/SearchbarToggle';
import Text from '../Text';

interface Props extends ViewProps {
  title: string;
  setListHeaderHeight: (height: number) => void;
  searchbarShown?: boolean;
}

const ListHeader: React.FC<Props> = ({
  title,
  setListHeaderHeight,
  style,
  searchbarShown,
  ...restProps
}) => {
  return (
    <>
      <View
        style={styles.container}
        onLayout={e => setListHeaderHeight(e.nativeEvent.layout.height)}
        {...restProps}>
        <Text fontFamily="Black" style={styles.title}>
          {title}
        </Text>
      </View>
      {searchbarShown && <SearchbarToggle />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 35,
  },
});

export default ListHeader;
