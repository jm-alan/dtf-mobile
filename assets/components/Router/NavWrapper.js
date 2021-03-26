import React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Router from '../../store/router';
import * as UI from '../../store/uiController';
const { width } = Dimensions.get('window');

export default function NavWrapper () {
  const dispatch = useDispatch();
  const sidebar = useSelector(state => state.uiController.sidebar);

  const homeClick = () => {
    dispatch(Router.GoHome());
    dispatch(UI.HideSidebar());
  };
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        onPress={() => dispatch(UI.ToggleSidebar())}
      >
        <Icon
          name={sidebar ? 'close' : 'menu'}
          color='white'
          size={60}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={homeClick}
      >
        <Icon
          color='white'
          name='home'
          size={60}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'steelblue',
    height: 90,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black',
    width
  }
});
