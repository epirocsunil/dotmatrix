import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import { MainColors } from './colors';
import { Subheading, Text } from 'react-native-paper'
import { confidenceThreshold, matrixSetting } from './Service';

interface ResultConfirmationProps {
  onCellPress: (index: number) => void;
  onMatrixConfirmed: () => Promise<void>;
  onCancelMatrixConfirmation: () => Promise<void>;
  matrixCells: MatrixCell[];
  columns: number

}

export const ResultConfirmation: React.FC<ResultConfirmationProps> = ({
  matrixCells,
  onCellPress,
  onMatrixConfirmed,
  onCancelMatrixConfirmation, columns
}) => {





  const renderItem = useCallback((cell) => {
    return <Pressable
    key={cell.item.id + 'Btn'}
    onPress={() => onCellPress(cell.item.id)}>
    <View
      key={cell.item.id + 'View'}
      style={[
        styles.matrixCell,
        cell.item.pred.confidence < confidenceThreshold && {
          backgroundColor: MainColors.transparentRed,
        },
      ]}>

      <Image
        key={cell.item.id + 'Img'}
        source={{ uri: cell.item.img }}
        resizeMode="contain"
        // resizeMethod="resize"
        style={styles.matrixCellImage}
      />

      <Text
        key={cell.item.id + matrixCells.length}
        style={styles.centerAlignText}>
        {cell.item.newValue === null
          ? "X" : cell.item.newValue === '1'
            ? '⬤'
            : '✅'
          }
      </Text>
      {/* <Text
      key={cell.item.id + matrixCells.length}
      style={styles.centerAlignText}>
      {JSON.stringify(cell.item.pred)}
    </Text> */}
    </View>
  </Pressable>
  }, [])

// const keyExtractor = useCallback((cell,index)=>(index.toString()),[]);

  return (
    <View style={styles.resultView}>

      <Subheading >Double click on the card to change value</Subheading>

      <FlatList
        style={styles.mBottom}
        data={matrixCells}
        renderItem={renderItem}
        numColumns={columns}
        key={columns}
        // keyExtractor={keyExtractor}
      />
      <View style={styles.btnContainer}>
        <Button
          title="Back" 
          color={MainColors.errorRed}
          onPress={onCancelMatrixConfirmation}
        />
        <View style={{width:20}}></View>
        <Button
          title="Confirm"
          color={MainColors.darkBlue}
          onPress={onMatrixConfirmed}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultView: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
  },
  matrixCellsRow: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  matrixCell: {
    backgroundColor: MainColors.white,
    margin: 3,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 12, // Android
  },
  matrixCellImage: {
    width: 40, //TODO: fix value
    height:40,
    margin: 3,
    aspectRatio: 1,
  },
  infoText: {
    flex: 0,
    textAlign: 'center',
    alignSelf: 'center',
    color: MainColors.darkBlue,
  },
  btnContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent:'space-around',
    margin:20
  },
  mBottom: {
    marginBottom: 20,
  },
  centerAlignText: { textAlign: 'center' },
});
