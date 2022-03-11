import React, { useState } from 'react';
import { FlatList as RNFlatlist, FlatListProps } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsHeaderTransparent } from '../../actions/pref';
import { ReducerTypes } from '../../types/reducerTypes';
import ListHeader from './ListHeader';

interface Props extends FlatListProps<any> {
  title: string;
  containerStyles?: any;
  searchbarShown?: boolean;
}

const BottomTabList = ({
  title,
  data,
  containerStyles,
  searchbarShown,
  ...restProps
}: Props) => {
  const dispatch = useDispatch();
  const { headerHeight } = useSelector(({ pref }: ReducerTypes) => pref);

  const [listHeaderHeight, setListHeaderHeight] = useState(0);

  return (
    <RNFlatlist
      data={data}
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
        <ListHeader
          title={title}
          setListHeaderHeight={setListHeaderHeight}
          searchbarShown={searchbarShown}
        />
      }
      contentContainerStyle={
        //@ts-ignore
        data.length
          ? [
              {
                paddingTop: headerHeight,
              },
              containerStyles,
            ]
          : [
              {
                paddingTop: headerHeight,
                flex: 1,
              },
              containerStyles,
            ]
      }
      {...restProps}
    />
  );
};

export default BottomTabList;
