import React, { useState } from 'react';
import { SectionList as RNSectionlist, SectionListProps } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsHeaderTransparent } from '../../actions/pref';
import { ReducerTypes } from '../../types/reducerTypes';
import { SectionGrid, SectionGridAllowedProps } from 'react-native-super-grid';
import ListHeader from './ListHeader';

interface Props extends SectionGridAllowedProps<any> {
  title: string;
  containerStyles?: any;
  sections: any[];
}

const SectionList = ({
  title,
  sections,
  containerStyles,
  ...restProps
}: Props) => {
  const dispatch = useDispatch();
  const { headerHeight } = useSelector(({ pref }: ReducerTypes) => pref);

  const [listHeaderHeight, setListHeaderHeight] = useState(0);

  return (
    <SectionGrid
      spacing={16}
      itemDimension={130}
      sections={sections}
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
      contentContainerStyle={
        //@ts-ignore
        sections.length
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

export default SectionList;
