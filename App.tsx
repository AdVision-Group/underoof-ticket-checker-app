import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import QrScanScreen from './src/screens/QrScanScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectEventScreen from './src/screens/SelectEventScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SelectEvent"
        screenOptions={{
          headerShown: false,
          orientation: 'portrait',
        }}>
        <Stack.Screen name="SelectEvent" component={SelectEventScreen} />
        <Stack.Screen name="QrScanScreen" component={QrScanScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
