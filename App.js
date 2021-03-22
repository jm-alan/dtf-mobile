import React, { useEffect } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';

import Home from './assets/components/Home';
import Sidebar from './assets/components/Sidebar';

import configureStore from './assets/store/index.js';
// import { getCSRFtoken } from './assets/store/csrf';

const store = configureStore();

const { width, height } = Dimensions.get('window');

export default function App () {
  useEffect(() => {
    // getCSRFtoken();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={{
        width,
        height,
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
      }}
      >
        <Sidebar />
        <Home />
      </SafeAreaView>
    </Provider>
  );
}
