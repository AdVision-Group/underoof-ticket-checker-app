/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {Counter} from './src/components/Counter';
import QrScanScreen from './src/screens/QrScanScreen';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <QrScanScreen />
    </SafeAreaView>
  );
}

export default App;
