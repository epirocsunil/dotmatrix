import React, { FC, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import { MainColors } from './colors';
interface OverLayComponentProps {
  columns: number,
  rows: number
}

export const OverLayComponent: FC<OverLayComponentProps> = ({ columns, rows }): JSX.Element => {

  function getAllBoxes(noOfBox: number) {

    let even = {
      *[Symbol.iterator]() {
        for (let i = 0; i < noOfBox; i++) {
          yield i;
        }
      },
    };
    return Array.from(even);
  }
  const renderItem = ({ item }) => (
    <View
      style={styles.cell}/>
  );


  return (
    <FlatList
      data={getAllBoxes(rows * columns)}
      renderItem={renderItem}
      key={columns}
      initialNumToRender={100}
      numColumns={columns}
    />
  );
};

const styles = StyleSheet.create({
  cell:{
    width: 35,
    height: 35,
    borderColor: MainColors.white,
    borderWidth: 1,
  },
 
});
