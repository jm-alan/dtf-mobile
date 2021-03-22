import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { HideSidebar } from '../../store/uiController';

const { width, height } = Dimensions.get('window');

export default function Sidebar () {
  const dispatch = useDispatch();
  const display = useSelector(state => state.uiController.sidebar);

  const translateX = useRef(new Animated.Value(-width)).current;

  const dummies = ['These', 'are', 'some', 'example', 'containers'];

  const sideBar = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 325,
      useNativeDriver: true
    }).start();
  };

  const hideBar = () => {
    Animated.timing(translateX, {
      toValue: -width,
      duration: 325,
      useNativeDriver: true
    }).start();
  };

  useEffect(() => {
    display && sideBar();
    !display && hideBar();
  }, [display]);

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: [{ translateX }]
      }}
    >
      {dummies.map((dummy, idx) => (
        <View
          key={idx}
          style={styles.subContainer}
        >
          <Text>{dummy}</Text>
        </View>
      ))}
      <TouchableOpacity
        onPress={() => dispatch(HideSidebar())}
        style={styles.navButton}
      >
        <Text style={styles.buttonText}>
          Hide
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 1,
    position: 'absolute',
    zIndex: 999,
    width,
    height,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subContainer: {
    borderWidth: 1,
    borderColor: 'darkgrey',
    width: '100%'
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
