import React, {useContext, useEffect} from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import QrScanScreen from './src/screens/QrScanScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectEventScreen from './src/screens/SelectEventScreen';
import {colors} from './src/styles';
import {AuthContext} from './src/contextWrappers/AuthContext/context';
import styled from 'styled-components/native';
import LoadingScreen from './src/screens/LoadingScreen';
import AuthContextWrapper from './src/contextWrappers/AuthContext/component';
import LoginScreen from './src/screens/LoginScreen';
import AutoLoginScreen from './src/screens/AutoLoginScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from './src/screens/SettingsScreen';
import QrIcon from './assets/images/qrcode.svg';
import SettingsIcon from './assets/images/settings.svg';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const animationName = 'fade_from_bottom';

const config = {
  screens: {
    AutoLogin: {
      path: 'auto-login/:saleId/:email/:password',
    },
  },
};

const linking = {
  prefixes: ['underooftickets://'],
  config,
};

function App(): JSX.Element {
  return (
    <AuthContextWrapper>
      <NavigationContainer linking={linking} theme={DarkTheme}>
        <Navigation />
      </NavigationContainer>
    </AuthContextWrapper>
  );
}

function Navigation() {
  const authContext = useContext(AuthContext);
  const {token, loading, restoreToken} = authContext;

  useEffect(() => {
    restoreToken();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  if (token) {
    return <SignedInNavigator />;
  }
  return <SignedOutNavigator />;
}

function SignedOutNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SelectEvent"
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Stack.Screen
        name="SelectEvent"
        component={SelectEventScreen}
        options={{animation: animationName}}
      />
      <Stack.Screen
        // @ts-ignore
        name="LoginScreen"
        // @ts-ignore
        component={LoginScreen}
        options={{animation: animationName}}
      />
      <Stack.Screen
        // @ts-ignore
        name="AutoLogin"
        // @ts-ignore
        component={AutoLoginScreen}
        options={{animation: animationName}}
      />
    </Stack.Navigator>
  );
}

function SignedInNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SignedInTabNavigator"
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Stack.Screen
        name="SignedInTabNavigator"
        component={SignedInTabNavigator}
        options={{
          animation: animationName,
        }}
      />
      <Stack.Screen
        // @ts-ignore
        name="AutoLogin"
        // @ts-ignore
        component={AutoLoginScreen}
        options={{animation: animationName}}
      />
    </Stack.Navigator>
  );
}

function SignedInTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="QrScanScreen"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.white,
        tabBarStyle: {
          paddingTop: 10,
          borderTopColor: colors.darkGrey,
          height: 60,
          borderTopWidth: 1,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: () => <QrIcon />,
          tabBarLabelStyle: {
            paddingBottom: 10,
          },
        }}
        name="QrScanScreen"
        component={QrScanScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: () => <SettingsIcon />,
          tabBarLabelStyle: {
            paddingBottom: 10,
          },
        }}
        name="SettingsScreen"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}

export default App;
