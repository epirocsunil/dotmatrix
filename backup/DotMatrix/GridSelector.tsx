import React, { FC } from 'react';
import {
  StyleSheet, View
} from 'react-native';
import { Chip } from 'react-native-paper';
interface GridSelectorProps {
  changerows: Function , changecolumns: Function
}

export const GridSelector: FC<GridSelectorProps> = ({ changerows, changecolumns
}): JSX.Element => {


  return (
    <View
      style={styles.mainView}
    >
      <Chip onPress={() => { changecolumns(6); changerows(4) }}>6 X 4</Chip>
      <Chip onPress={() => { changecolumns(4); changerows(4) }}>4 X 4</Chip>
      <Chip onPress={() => { changecolumns(2); changerows(2) }}>2 X 2</Chip>

    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    margin: 10,
    borderRadius: 0,
    flexDirection: 'row',
    justifyContent: "space-around"
  }
});

