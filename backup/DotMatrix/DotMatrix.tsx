import React, { useState, useEffect, useRef } from 'react';
import { Alert, View } from 'react-native';
import Tflite from 'tflite-react-native';
import { captureRef } from 'react-native-view-shot';
import { ScanView } from './ScanView';
import {
  clearCells,
  matrixSetting,
  splitImage,
} from './Service';
import { ResultConfirmation } from './ResultConfirmation';
var RNFS = require('react-native-fs');
interface DotMatrixProps {
  onMatrixConfirmed?: (result: string, cells: MatrixCell[]) => Promise<void>;
}

const tflite = new Tflite();

export const DotMatrix: React.FC<DotMatrixProps> = ({
  onMatrixConfirmed: onMatrixConfirmed,
}) => {
  const [matrixCells, setMatrixCells] = useState<MatrixCell[]>([]);
  const [predicting, setPredicting] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);
  const [columns, setcolumns] = useState<number>(1);
  const captureViewRef = useRef<View>(null);
  let scanTimer = 0; //TIMER

  const startScan = () => {
    setScanning(true);
  };
  const stopScan = () => {
    setScanning(false);
  };

  const changecolumns = (value:number) => {
    setcolumns(value);
  };

  useEffect(() => {
    tflite.loadModel(
      {
        // model:"vgg_tflite.tflite",
        //model: 'model_quant2.tflite', //transfer, good but to slow for auto
        model: 'model-tfjs-big3.tflite', //self trained, fast(ish) but not so good
        labels: 'label.txt',
      },
      (error: any, res: any) => {
        if (error) {
          console.error('tflite.loadModel', error);
          Alert.alert('Error!', 'There was an error loading the model.'); //TODO: Fix text
        } else {
          console.log('tf model loaded ' + res);
        }
      },
    );

    return () => {
      tflite.close();
      clearCells(matrixCells);
      console.log('tf closed');
    };
  }, []);

  useEffect(() => {
    if (!checking && scanning) {
      scan();
    }
  }, [checking]);

  useEffect(() => {
    if (scanning) {
      scan();
    }
  }, [scanning]);

  const scan = async (): Promise<void> => {
    if (predicting) {
      setScanning(false);
      return;
    }

    try {
      scanTimer = Date.now(); //TIMER
      await clearCells(matrixCells);

      //let captureRefTimer = Date.now(); //TIMER
      const uri = await captureRef(captureViewRef, {
        width: matrixSetting.w * matrixSetting.x,
        height: matrixSetting.h * matrixSetting.y,
        format: 'jpg',
      });
      //console.log(`captureRef took: ${Date.now() - captureRefTimer} ms`); //TIMER

      //let splitTimer = Date.now(); //TIMER
      const imgs = await splitImage(uri, true);
      //console.log(`Split took: ${Date.now() - splitTimer} ms`); //TIMER

      await checkForMatrixAsync(imgs, uri);

    } catch (error) {
      console.error('scan', error);
      setScanning(false);
      setPredicting(false);
      setChecking(false);
      Alert.alert('Error!', 'The scanner ran in to an error.');
    }
  };

  /**
   * Check the corners of the camera view for the matrix pattern, Async
   * Requires the tflite-react-native library to be modified to use async/await (see Notes.txt)
   */
  const checkForMatrixAsync = async (imgs: string[], uri: string,columns:number,rows:number) => {
    let result: string = '';
    let cells: MatrixCell[] = [];
    for (let i = 0; i < imgs.length; i++) {

      try {
         tflite.runModelOnImage({
          path: imgs[i],
          numResultsPerClass: 1,
        },
          (err: any, res: any) => {
            if (err)
              console.log(err);
            else { 
              console.log(res)
              const cell: MatrixCell = {
                id: i,
                img: imgs[i],
                pred: res,
                newValue: null,
              };
              cells.push(cell);
              if(i == imgs.length - 1)
              {
                setMatrixCells(cells)
                setcolumns(columns)
              }
            }
          });
          

      } catch (error) {
        console.error(error);
      }
    } 
  };



  /**
   * Change the value of a cell in the matrix
   */
  const changeCellValue = (index: number): void => {
    if (index + 1 > matrixCells.length || index < 0) {
      return;
    }
    let cells = [...matrixCells];




    if (cells[index].newValue != null) {
      console.log(cells[index].newValue)
      cells[index].newValue =  cells[index].newValue  === '0' ? '1' : '0';
      console.log(cells[index].newValue)
    } 
    else {
      console.log(cells[index].newValue)
      cells[index].newValue =  cells[index].newValue  === '0' ? '1' : '0';
      console.log(cells[index].newValue)
    }
    setMatrixCells(cells);
  };

  /**
   * For the end user to validate that the matrix is correct
   */
  const confirmMatrix = async (): Promise<void> => {
    let matrixString = '';
    for (let i = 0; i < matrixCells.length; i++) {
      const cell = matrixCells[i];
      matrixString += cell.newValue === null ? cell.pred.label : cell.newValue;
    }

    if (onMatrixConfirmed) {
      try {
        await onMatrixConfirmed(matrixString, [...matrixCells]);
      } catch (error) {
        console.error('onMatrixConfirmed', error);
        Alert.alert('Error!', 'The confirmation function ran in to an error.');
      }
    }

    await clearCells(matrixCells);
    setMatrixCells([]);
  };

  /**
   * For the end user to cancel the matrix validation and go back to scanning
   */
  const cancelMatrixConfirmation = async (): Promise<void> => {
    await clearCells(matrixCells);
    setMatrixCells([]);
  };

  return (
    <>
      {matrixCells.length < 1 ? (
        <ScanView
          predicting={predicting}
          scanning={scanning}
          captureViewRef={captureViewRef}
          startScan={startScan}
          stopScan={stopScan}
          checkForMatrixAsync={checkForMatrixAsync}
        />
      ) : (
        <ResultConfirmation
          onCellPress={changeCellValue}
          onMatrixConfirmed={confirmMatrix}
          onCancelMatrixConfirmation={cancelMatrixConfirmation}
          matrixCells={matrixCells}
          columns={columns}
        />
      )}
    </>
  );
};
