
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function Home () {
  const dispatch = useDispatch();
  const page = useSelector(state => state.router.page);
  const user = useSelector(state => state.session.user);

  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>Home</Text>
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
  bigText: {
    fontSize: 100
  },
  buttonText: {
    color: 'white'
  }
});
