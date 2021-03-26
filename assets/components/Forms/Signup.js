import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function Signup () {
  return (
    <View style={styles.container}>
      <Text style={styles.formHeading}>
        Signup
      </Text>
      <TextInput />
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
  }
});
