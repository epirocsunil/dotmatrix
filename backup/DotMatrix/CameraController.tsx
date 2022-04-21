import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Avatar, ToggleButton} from 'react-native-paper';
interface CamerControllerProps {value:string,changeOperation:any}

export const CamerController: FC<CamerControllerProps> = (
  {value,changeOperation},
): JSX.Element => {
    
  return (
    <View style={styles.navBar}>
      <View style={styles.leftContainer}>
        <ToggleButton.Row
          onValueChange={value => changeOperation(value)}
          value={value}>
          <ToggleButton
            style={styles.toggleButton}
            icon="barcode"
            value="barcode"
          />
          <ToggleButton
            style={[styles.toggleButton,{marginLeft:1}]}
            icon="table"
            value="table"
          />
        </ToggleButton.Row>
      </View>
      <Text style={styles.text}></Text>
      <View style={styles.rightContainer}>
      <ToggleButton
            style={[styles.toggleButton]}
            icon="flash"
            value="table"
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'blue',
    margin: 10,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  rightIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    // backgroundColor: 'white',
  },
  text: {},
  toggleButton: {backgroundColor: 'white',
  borderColor:'white',
  borderWidth:1,
   borderRadius: 0},
});
