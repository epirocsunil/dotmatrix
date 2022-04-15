import React, { useState,useImperativeHandle,forwardRef } from 'react';
import {View,Text,Button} from 'react-native'
import {ScanView} from './src/ScanView.js'


const takePicture =  async  ( w, h, uri,columns,rows)=> {
   try {
    let imgParts = [];
    imgParts = await getImagePathArray(imgParts, w, h, uri,columns,rows);
  }
  catch (error) {
    console.error('splitImage ImageEditor.cropImage', error);
  }
  return imgParts;
};

const getImagePathArray = async ( imgParts, w,h, uri,columns,rows) => {
  try {
    for (let col = 0; col < rows; col++) {
      for (let col1 = 0; col1 < columns; col1++) {
        const cropData =  {
          offset: { x: w * col1, y: h * col },
          size: { width: w, height: h },
          resizeMode: 'contain'
        };
        const cropedUri = await ImageEditor.cropImage(uri, cropData);
        imgParts.push(cropedUri);
      }
    }
  }
  catch (error) {
    console.error('getImagePathArray', error);
  }
  return imgParts;
}


const  Scanner = (props) => {

  return (
   <View>
      <ScanView 
    columns={props.columns}
    rows={props.rows}
    mode={props.mode}
    barcodeView={props.barcodeView}
    />
   </View>
  );
};
Scanner.defaultProps = {
  columns:1,
  rows:1,
  mode:'barcode'
}
export  {Scanner , takePicture};

