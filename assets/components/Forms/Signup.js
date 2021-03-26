import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Dimensions, Text, View, TextInput } from 'react-native';

import * as Session from '../../store/session';
import * as Router from '../../store/router';

const { width } = Dimensions.get('window');

export default function Signup () {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passRef = useRef(null);
  const confirmPassRef = useRef(null);

  const onSubmit = () => {
    if (
      firstName &&
      email &&
      password &&
      confirmPassword &&
      (password === confirmPassword)
    ) dispatch(Session.SignUp({ firstName, email, password }));
  };

  if (user) {
    dispatch(Router.GoHome());
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.formHeading}>
        Signup
      </Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        autoCorrect={false}
        autoCapitalize={false}
        blurOnSubmit={false}
        returnKeyType='next'
        onSubmitEditing={() => passRef.current.focus()}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCorrect={false}
        autoCapitalize={false}
        blurOnSubmit={false}
        returnKeyType='next'
        onSubmitEditing={() => passRef.current.focus()}
      />
      <TextInput
        secureTextEntry
        autoCorrect={false}
        autoCapitalize={false}
        blurOnSubmit={false}
        ref={passRef}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={() => confirmPassRef.current.focus()}
      />
      <TextInput
        secureTextEntry
        autoCorrect={false}
        autoCapitalize={false}
        ref={confirmPassRef}
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onSubmitEditing={onSubmit}
      />
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
  formHeading: {
    fontSize: 100
  },
  input: {
    textAlign: 'center',
    borderColor: 'darkgrey',
    borderWidth: 1,
    fontSize: 30,
    height: 60,
    width: width * 0.85
  },
  error: {
    fontSize: 30,
    color: 'red'
  }
});
