/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BarCodeReader from './BarCodeReader';

AppRegistry.registerComponent(appName, () => BarCodeReader);
