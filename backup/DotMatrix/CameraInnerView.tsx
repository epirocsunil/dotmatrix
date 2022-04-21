import React, { FC, useState } from 'react';
import {
  StyleSheet, View, Text, Animated
} from 'react-native';
import { CamerController } from './CameraController';
import { MainColors } from './colors';
import { OverLayComponent } from './OverlayComponent';
import { Chip } from 'react-native-paper';
import { GridSelector } from './GridSelector';
interface CamerInnerViewProps {
  barcodeCodes: boolean,
  columns: number,
  rows: number,
  values: string,
  changeOperation: Function, changerows: Function, changecolumns: Function
}

export const CamerInnerView: FC<CamerInnerViewProps> = ({
  barcodeCodes, columns, rows, values, changeOperation, changecolumns, changerows
}): JSX.Element => {
  return (
    <View style={{ flex: 1 }}>
      {barcodeCodes ?
         <View style={styles.container}>
          <View style={styles.innerview}>
            <View style={styles.barcodeCell}></View>
          </View>
          </View>
          :
          <><OverLayComponent columns={columns} rows={rows} />
            <GridSelector changecolumns={changecolumns} changerows={changerows} />
          </>}
    </View>
  );
};

const styles = StyleSheet.create({
  barcodeCell: {
    width: 250,
    height: 200,
    borderRadius: 5,
    borderColor: MainColors.white,
    borderWidth: 2,
    justifyContent: 'center',

  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerview: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

