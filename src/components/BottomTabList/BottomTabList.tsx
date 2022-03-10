import React, { useState } from 'react';
import { FlatList as RNFlatlist, FlatListProps } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleIsHeaderTransparent } from '../../actions/pref';
import ListHeader from './ListHeader';

interface Props extends FlatListProps<any> {
  title: string;
}

const BottomTabList = ({ title, ...restProps }: Props) => {
  const dispatch = useDispatch();

  const [listHeaderHeight, setListHeaderHeight] = useState(0);

  return (
    <RNFlatlist
      showsVerticalScrollIndicator={false}
      onScroll={({
        nativeEvent: {
          contentOffset: { y },
        },
      }) => {
        y >= listHeaderHeight
          ? dispatch(toggleIsHeaderTransparent(true))
          : dispatch(toggleIsHeaderTransparent(false));
      }}
      ListHeaderComponent={
        <ListHeader title={title} setListHeaderHeight={setListHeaderHeight} />
      }
      {...restProps}
    />
  );
};

export default BottomTabList;
