import ImageEditor, {ImageCropData} from '@react-native-community/image-editor';
import {Image} from 'react-native';
import RNFS from 'react-native-fs';

export const matrixSetting: MatrixSettings = {
  x: 6, // number of columns
  y: 4, // number of rows
  h: 100, // height of each image in pixels
  w: 100, // width of each image in pixels
};

/**
 * Initial value for the camera zoom.
 * Used in ScanView.
 */
export const initialZoomValue: number = 0.1; //0.1 - 1.0

/**
 * Threshold to alert the user that the confidence is low from the ML model.
 * Used in ResultConfirmation.
 */
export const confidenceThreshold: number = 0.65; //0.5 - 1.0

/**
 * Validates the matrix shape and returns null if invalid.
 * If it's valid it returns the result string and reversed if matrix is upside down.
 */
export const validateMatrixShape = (matrixString: string) => {
  const dotList = matrixString.split('');
  if (dotList.length !== matrixSetting.x * matrixSetting.y) {
    return null;
  }

  if (
    dotList[0] === '1' &&
    dotList[matrixSetting.x - 1] === '1' &&
    dotList[matrixSetting.x * (matrixSetting.y - 1)] === '1' &&
    dotList[matrixSetting.x * matrixSetting.y - 1] === '0'
  ) {
    return matrixString;
  }

  let index = 0;
  const flippedList: string[] = [];
  dotList.forEach(d => {
    flippedList[index] = dotList[dotList.length - 1 - index];
    index++;
  });

  if (
    flippedList[0] === '1' &&
    flippedList[matrixSetting.x - 1] === '1' &&
    flippedList[matrixSetting.x * (matrixSetting.y - 1)] === '1' &&
    flippedList[matrixSetting.x * matrixSetting.y - 1] === '0'
  ) {
    return flippedList.join('');
  }

  return null;
};

/**
 * Splits the image into a grid of cells.
 * If justCorners is true, only the corners of the grid are returned.
 */
export const splitImage = async (
  path: string,
  justCorners?: boolean,
): Promise<string[]> => {
  let h: number = 0;
  let w: number = 0;
  await Image.getSize(
    path,
    (width, height) => {
      h = height / matrixSetting.y;
      w = width / matrixSetting.x;
    },
    err => {
      console.error('splitImage Image.getSize', err);
    },
  );
  let imgParts: string[] = [];

  let x: number = 0;
  let y: number = 0;
  for (let i = 0; i < matrixSetting.y; i++) {
    for (let j = 0; j < matrixSetting.x; j++) {
      const cropData: ImageCropData = {
        offset: {x: x, y: y},
        size: {width: w, height: h},
        displaySize: {width: matrixSetting.w, height: matrixSetting.h},
      };
      try {
        if (justCorners) {
          if (
            (i === 0 && j === 0) ||
            (i === 0 && j === matrixSetting.x - 1) ||
            (i === matrixSetting.y - 1 && j === 0) ||
            (i === matrixSetting.y - 1 && j === matrixSetting.x - 1)
          ) {
            const url = await ImageEditor.cropImage(path, cropData);
            imgParts.push(url);
          }
        } else {
          const url = await ImageEditor.cropImage(path, cropData);
          imgParts.push(url);
        }
      } catch (error) {
        console.error('splitImage ImageEditor.cropImage', error);
      }

      x += w;
    }
    x = 0;
    y += h;
  }
  return imgParts;
};

export const deleteCacheFiles = async (paths: string[]): Promise<void> => {
  for (let i = 0; i < paths.length; i++) {
    const file = paths[i];
    const filePath = file.split('///').pop() as string;

    await RNFS.exists(filePath)
      .then(async (res: any) => {
        if (res) {
          await RNFS.unlink(filePath)
            .then(() => {
              //file is deleted
            })
            .catch((error: any) => {
              console.error('clearCacheDir RNFS.unlink', error.message);
            });
        } else {
          console.log('FILE Not exist: ' + i);
        }
      })
      .catch((error: any) => {
        console.error('clearCacheDir RNFS.exists', error.message);
      });
  }
};

/**
 * Deletes the cached image files for a scan run.
 */
export const clearCells = async (matrixCells: MatrixCell[]): Promise<void> => {
  let imgPaths: string[] = [];
  for (let i = 0; i < matrixCells.length; i++) {
    const cell = matrixCells[i];
    imgPaths.push(cell.img);
  }
  // await deleteCacheFiles(imgPaths);
};
