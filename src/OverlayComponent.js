import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';


export const OverLayComponent = ({ columns, rows })=> {
  const getAllBoxes = (noOfBox)=> {
    let even = {
      *[Symbol.iterator]() {
        for (let i = 0; i < noOfBox; i++) {
          yield i;
        }
      },
    };
    return Array.from(even);
  }



  const renderItem = () => (
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
    width: 40,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
  },
 
});
