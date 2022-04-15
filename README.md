![](https://camo.githubusercontent.com/53a7f3cb98d43c970cece10bd058b38e1aed6ffb2e9dba51a4c5a1ce3249b0aa/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f72656163742d6e61746976652d70726f67726573732d73746570732e7376673f7374796c653d666c6174)
![](https://img.shields.io/npm/dt/epiroc.svg)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

# epiroc

A simple and fully customizable React Native component that implements a progress stepper UI. 
* Each steps content is displayed inside of a customizable ScrollView. 
* Fully customizable buttons are displayed at the bottom of the component to move between steps.


Example One             |  Example Two
:-------------------------:|:-------------------------:
![](assets/epiroc_1.gif) [examples/ExampleOne.js](examples/ExampleOne.js)| ![](assets/epiroc_2.gif) [examples/ExampleTwo.js](examples/ExampleTwo.js)


## Installation

If using yarn:

```
yarn add epiroc
```

If using npm:

```
npm i epiroc
```

## Usage

```
import {Scanner,takePicture} from 'epiroc_dotmatrix'
```

Simply place a `<ProgressStep />` tag for each desired step within the `<ProgressSteps />` wrapper.

```
 <Scanner
        columns={5}
        rows={5}
        mode={'barcode'}
        barcodeView={<View></View>}
      />
```

## Documentation

### Progress Steps Component
| Name                      | Description                              | Default     | Type    |
|---------------------------|------------------------------------------|-------------|---------|
| columns               | Width of the progress bar between steps  | 1           | Number  |
| rows               | Type of border for the progress bar      | 1       | Number  |
| mode | Outside border color for the active step | barcode     | String  |

### Progress Step Component
| Name | Description | Default | Type |
|------------------|--------------------------------------------------------------------------|----------|---------|
| label | Title of the current step to be displayed | null | String |

## Contributing
Pull requests are always welcome! Feel free to open a new GitHub issue for any changes that can be made.

**Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://)

## Author
Epiroc | [https://epiroc.com](https://epiroc.com)

## License
[MIT](./LICENSE)
