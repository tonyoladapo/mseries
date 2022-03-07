import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import Text from '../Text';

interface Props extends ViewProps {
  title: string;
  setListHeaderHeight: (height: number) => void;
}

const ListHeader: React.FC<Props> = ({
  title,
  setListHeaderHeight,
  style,
  ...restProps
}) => {
  return (
    <View
      style={styles.container}
      onLayout={e => setListHeaderHeight(e.nativeEvent.layout.height)}
      {...restProps}>
      <Text fontFamily="Black" style={styles.title}>
        {title}
      </Text>
    </View>
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
