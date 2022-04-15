import React, {  } from 'react';
import { CamerInnerView } from './CameraInnerView.js';

export const ScanView = ({columns,rows,mode,barcodeView}) => {
  return (
    <CamerInnerView columns={columns} rows={rows} mode={mode}
    barcodeView={barcodeView}/>
  );
};


