import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Dimensions, BackHandler, SafeAreaView, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import Router from './assets/components/Router';
import NavWrapper from './assets/components/Router/NavWrapper';
import Sidebar from './assets/components/Sidebar';
import { HideSidebar } from './assets/store/uiController';

import configureStore from './assets/store/index.js';
import { getCSRFtoken } from './assets/store/csrf';
import * as session from './assets/store/session';

const store = configureStore();

const { height } = Dimensions.get('window');

// eslint-disable-next-line
String.prototype.toTitleCase = function () {
  if (!this.match(/ /g)) return [this[0].toUpperCase(), this.slice(1)].join('');
  return this
    .split(' ')
    .map($ => [$[0].toUpperCase(), $.slice(1)].join(''))
    .join(' ');
};

Object.deepEq = function ($, _) {
  if (!$ || !_ || typeof $ !== 'object' || typeof _ !== 'object') return false;
  const [$_, __] = [$, _].map(Object.entries);
  if ($_.length !== __.length) return false;
  for (let i = 0; i < $_.length; i++) {
    if (
      (typeof $_[i][1] !== 'object' &&
      $_[i][1] !== __[i][1]) ||
      !Object.deepEq($_[i][1], __[i][1])
    ) return false;
  }
  return true;
};

function App () {
  const dispatch = useDispatch();
  const sidebar = useSelector(state => state.uiController.sidebar);

  useEffect(() => {
    getCSRFtoken()
      .then(() => dispatch(session.RestoreUser()))
      .then(() => dispatch(session.Load()));
    const handleBack = () => {
      if (sidebar) {
        dispatch(HideSidebar());
        return true;
      } else BackHandler.exitApp();
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => backHandler.remove();
  }, [sidebar]);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center'
    }}
    >
      <StatusBar style='light' />
      <NavWrapper />
      <View style={{
        height: height - 90,
        top: 45
      }}
      >
        <Sidebar />
        <Router />
      </View>
    </SafeAreaView>
  );
}

export default function Root () {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
