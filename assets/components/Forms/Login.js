import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Dimensions, Text, View, TextInput } from 'react-native';

import * as Session from '../../store/session';
import * as Router from '../../store/router';

const { width } = Dimensions.get('window');

export default function Login () {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const passRef = useRef(null);

  const onSubmit = () => {
    setShowError(false);
    dispatch(Session.LogIn(email, password))
      .catch(() => setShowError(true));
  };

  if (user) {
    dispatch(Router.GoHome());
    return null;
  }

  return (
    <View style={styles.container}>
      {showError ? <Text>Invalid Username or Password</Text> : null}
      <Text style={styles.formHeading}>
        Login
      </Text>
      <TextInput
        placeholder='email'
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        autoCorrect={false}
        blurOnSubmit={false}
        returnKeyType='next'
        onSubmitEditing={() => passRef.current.focus()}
      />
      <TextInput
        placeholder='password'
        secureTextEntry
        ref={passRef}
        style={styles.input}
        onChangeText={setPassword}
        value={password}
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
