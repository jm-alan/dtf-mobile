import React, { useState, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Dimensions, View, Text, Image, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as Router from '../../store/router';
import * as Session from '../../store/session';
import * as UI from '../../store/uiController';

const { width, height } = Dimensions.get('window');

export default function Sidebar () {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const display = useSelector(state => state.uiController.sidebar);

  const [pressedLogin, setPressedLogin] = useState(false);
  const [pressedSignup, setPressedSignup] = useState(false);

  const translateX = useRef(new Animated.Value(-width)).current;

  const sideBar = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    }).start();
  };

  const hideBar = () => {
    Animated.timing(translateX, {
      toValue: -width,
      duration: 250,
      useNativeDriver: true
    }).start();
  };

  const sidebarAction = after => {
    dispatch(after);
    dispatch(UI.HideSidebar());
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
      {
      user
        ? (
          <>
            <View style={styles.navHeader}>
              <Image
                style={styles.navatar}
                source={{ uri: user.Avatar.url }}
                resizeMode='cover'
                resizeMethod='resize'
              />
              <Text style={styles.navUsername}>{user.firstName}</Text>
            </View>
            <TouchableHighlight
              style={styles.navButton}
              underlayColor='steelblue'
              onShowUnderlay={() => setPressedLogin(true)}
              onHideUnderlay={() => setPressedLogin(false)}
              onPress={() => sidebarAction(Session.LogOut())}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: pressedLogin ? 'white' : 'steelblue'
                }}
              >
                Logout
              </Text>
            </TouchableHighlight>
          </>
          )
        : (
          <>
            <TouchableHighlight
              style={styles.navButton}
              underlayColor='steelblue'
              onShowUnderlay={() => setPressedLogin(true)}
              onHideUnderlay={() => setPressedLogin(false)}
              onPress={() => sidebarAction(Router.GoLogin())}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: pressedLogin ? 'white' : 'steelblue'
                }}
              >
                Login
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.navButton}
              underlayColor='steelblue'
              onShowUnderlay={() => setPressedSignup(true)}
              onHideUnderlay={() => setPressedSignup(false)}
              onPress={() => sidebarAction(Router.GoSignup())}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: pressedSignup ? 'white' : 'steelblue'
                }}
              >
                Signup
              </Text>
            </TouchableHighlight>
          </>
          )
}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 1,
    borderTopWidth: 0,
    position: 'absolute',
    zIndex: 999,
    width,
    height,
    flex: 1,
    backgroundColor: '#fff'
  },
  navHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1
  },
  navatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  navUsername: {
    fontSize: 60
  },
  navButton: {
    width: '100%',
    height: 50,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomWidth: 1
  },
  buttonText: {
    fontSize: 30
  }
});
