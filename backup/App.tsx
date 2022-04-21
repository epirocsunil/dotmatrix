import React, { useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { DotMatrix } from './DotMatrix/DotMatrix';
import { matrixSetting } from './DotMatrix/Service';
var RNFS = require('react-native-fs');

const App = () => {
//   React.useEffect(()=>{
//     RNFS.readDir(RNFS.TemporaryDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
//     .then((result: any) => {
//       console.log('GOT RESULT', result);
//     })
//     .catch((err: { message: any; code: any; }) => {
//       console.log(err.message, err.code);
//     });
// });


  const onMatrixConfirmed = async (result: string, cells: MatrixCell[]) => {
    // const cellsData = cells.map((cell, index) => {
    //   console.log(JSON.stringify(cell))
    //   let val = cell.newValue === null ? cell.pred.label : cell.newValue;
    //   val += ' - ' + (cell.pred.confidence * 100).toFixed(1) + '% | ';
    //   if ((index + 1) % matrixSetting.x === 0) {
    //     val += '\n';
    //   }
    //   return val;
    // });
    Alert.alert("Successfully ", "Data Saved successfully");
  };

  return (
    <View style={styles.mainView}>
      <DotMatrix onMatrixConfirmed={onMatrixConfirmed} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc72c',
  },
});

export default App;
