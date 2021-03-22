
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as Router from '../../store/router';
import * as UI from '../../store/uiController';

export default function Home ({ testText }) {
  const dispatch = useDispatch();
  const page = useSelector(state => state.router.page);

  return (
    <View style={styles.container}>
      <Text>The current page is {page}</Text>
      <Text>{testText}</Text>
      <StatusBar style='auto' />
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => dispatch(Router.GoHome())}
      >
        <Text style={styles.buttonText}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => dispatch(Router.GoLogin())}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => dispatch(Router.GoSignup())}
      >
        <Text style={styles.buttonText}>
          Signup
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => dispatch(UI.ShowSidebar())}
      >
        <Text style={styles.buttonText}>
          Sidebar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => dispatch(UI.HideSidebar())}
      >
        <Text style={styles.buttonText}>
          Hidebar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navButton: {
    height: 50,
    padding: 20,
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white'
  }
});
