import React from 'react';
import { FlatGrid, FlatGridProps } from 'react-native-super-grid';

interface Props extends FlatGridProps<any> {
  title: string;
  containerStyles?: any;
  data: any[];
}

const Searchlist = ({ title, data, containerStyles, ...restProps }: Props) => {
  return (
    <FlatGrid
      data={data}
      spacing={16}
      itemDimension={130}
      showsVerticalScrollIndicator={false}
      {...restProps}
    />
  );
};

export default Searchlist;
