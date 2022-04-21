import React, {useState, useRef} from 'react';
import {Image} from 'react-native';
import {StyleSheet, Platform, View, Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';
import FAB from 'react-native-paper/src/components/FAB/FAB';
import {MainColors} from './colors';
import {initialZoomValue} from './Service';
import {CamerInnerView} from './CameraInnerView';
import ImageEditor, {ImageCropData} from '@react-native-community/image-editor';
import {CamerController} from './CameraController';
import ProgressDialog from 'react-native-progress-dialog';
import VerticalSlider from 'react-native-vertical-slider-component';




interface ScanViewProps {
  predicting: boolean;
  scanning: boolean;
  captureViewRef: React.RefObject<View>;
  stopScan: () => void;
  startScan: () => void;
  checkForMatrixAsync: Function;
}
var RNFS = require('react-native-fs');
const heightOfDevice = Dimensions.get('window').height;
const widthtOfDevice = Dimensions.get('window').width;

export const ScanView: React.FC<ScanViewProps> = ({
  predicting,
  scanning,
  captureViewRef,
  stopScan,
  startScan,
  checkForMatrixAsync,
}) => {
  const [flashMode, setFlashMode] = useState<any>(
    RNCamera.Constants.FlashMode.off,
  );
   
  const [zoom, setZoom] = useState<number>(0.0);
  const [ratio, setratio] = useState<any>();
  
  const DESIRED_RATIO = "16:9";
  const toggleCamLight = () => {
    if (flashMode === RNCamera.Constants.FlashMode.torch) {
      setFlashMode(RNCamera.Constants.FlashMode.off);
    } else {
      setFlashMode(RNCamera.Constants.FlashMode.torch);
    }
  };
  const [barcodeCodes, setbarcodeCodes] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [columns, setColumns] = useState<number>(6);
  const [rows, setRows] = useState<number>(4);
  const camRef = useRef<RNCamera>(null);
  const [value, setValue] = React.useState('left');
  const onBarCodeRead = (scanResult: any) => {
    console.warn(scanResult.type);
    console.warn(scanResult.data);
    if (scanResult.data != null) {
      // if (!barcodeCodes.includes(scanResult.data)) {
      //   // barcodeCodes.push(scanResult.data);
      //   console.warn('onBarCodeRead call');
      // }
    }
    return;
  };
  const changecolumns = (value: number) => {
    setColumns(value);
  };
  const changerows = (value: number) => {
    setRows(value);
  };

  const changeOperation = (value: any) => {
    setbarcodeCodes(value === 'barcode' ? true : false);
  };
  const takePicture = async function (camera: any) {
    setLoading(true)
    let height: number = 0;
    let width: number = 0;
    let h: number = 0;
    let w: number = 0;
    let count = 0;

    if (camera.current) {
      const options = {quality: 0.5, base64: true, fixOrientation: true};
      const data = await camera.current.takePictureAsync(options);
      const mainUri = data.uri;



      // const mainUri = await ImageEditor.cropImage(data.uri, {
      //   offset: { x: 0, y: 0 },
      //   size: { width: 500, height: 500 },
      //   resizeMode :'cover'
      // });


   

      await Image.getSize(
        mainUri,
        (width: number, height: number) => {
          height = height;
          width = width;
          h = height / rows;
          w = width / columns;
        },
        (        err: any) => {
          console.error('splitImage Image.getSize', err);
        },
      );
      await splitImages(mainUri, width, height, w, h);
    }
  };



  const splitImages = async function (
    uri: string,
    width: number,
    height: number,
    w: number,
    h: number,
  ) {
    try {
      let imgParts: string[] = [];
      imgParts = await getImagePathArray(imgParts, w, h, uri);

      checkForMatrixAsync(imgParts, uri, columns, rows);
    } catch (error) {
      console.error('splitImage ImageEditor.cropImage', error);
    }
  };

  const getImagePathArray = async (
    imgParts: string[],
    w: number,
    h: number,
    uri: string,
  ) => {
    h = 350;
    w = 350;
    try {
      for (let col = 0; col < rows; col++) {
        for (let col1 = 0; col1 < columns; col1++) {
          const cropData: ImageCropData = {
            offset: {x: w * col1, y: h * col},
            size: {width: w, height: h},
            resizeMode: 'contain',
          };
          const cropedUri = await ImageEditor.cropImage(uri, cropData);
          imgParts.push(cropedUri);
        }
      }
    } catch (error) {
      console.error('getImagePathArray', error);
    }

    return imgParts;
  };

  return (
    <View style={styles.container}>
      <ProgressDialog visible={loading}/>
      <View>
          <CamerController value={value} changeOperation={changeOperation} />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <RNCamera
              ref={camRef}
              autoFocus={RNCamera.Constants.AutoFocus.on}
              style={styles.camera}
              zoom={zoom}
              type={RNCamera.Constants.Type.back}
              onBarCodeRead={onBarCodeRead}
              flashMode={flashMode}
              androidCameraPermissionOptions={{
                title: 'Permission to use the camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              captureAudio={false}>
              <CamerInnerView
                barcodeCodes={barcodeCodes}
                columns={columns}
                rows={rows}
                values={value}
                changeOperation={changeOperation}
                changerows={changerows}
                changecolumns={changecolumns}
              />
            </RNCamera>
            <View style={styles.slider}>
         <VerticalSlider
          value={zoom}
          disabled={false}
          min={0.1}
          max={0.5}
          onChange={(value: number) => {
            setZoom(value)
          }}
          onComplete={(value: number) => {
            setZoom(value)
          }}
          width={20}
          height={300}
          step={0.1}
          borderRadius={15}
          minimumTrackTintColor= {MainColors.black}
          maximumTrackTintColor={MainColors.white}
        />
         </View>
          </View>
        </View>
       

      <FAB
        style={styles.fab}
        label={barcodeCodes ? 'Scan Barcode' : 'Capture Image'}
        icon={barcodeCodes ? 'barcode' : 'table'}
        onPress={() => takePicture(camRef)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scanContainer: {
    // height: 208, //TODO: fix value
    // width: 240, //TODO: fix value
  },
  predictingBorder: {
    borderColor: MainColors.infoBlue,
    borderWidth: 4,
  },
  scanningBorder: {
    borderColor: MainColors.errorRed,
    borderWidth: 4,
  },
  camera: {
    height: 400, //TODO: fix value
    width: 300, //TODO: fix value
    overflow: 'hidden',
    justifyContent: 'center',
  },

  btnContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15, //TODO: fix value
    width: 300, //TODO: fix value
  },
  slider: {marginHorizontal: 10, justifyContent: 'center', height: 400},
  predictionContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50, //TODO: fix value
    width: 300, //TODO: fix value
  },
  fab: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 20,
    backgroundColor: MainColors.darkBlue,
    color: MainColors.yellow,
  },
  container: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
