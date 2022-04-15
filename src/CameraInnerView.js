import React from 'react';
import {Text,
  View
} from 'react-native';
import { OverLayComponent } from './OverlayComponent.js';


export const CamerInnerView = ({ mode, columns, rows,barcodeView }) => {
  return (
    <View >
      {mode == "barcode" ?
       barcodeView
        :
        <OverLayComponent columns={columns} rows={rows}/>}
    </View>
  );
};




