import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Text, FlatList, Alert, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as Location from 'expo-location';

import Event from './Event';
import * as Reel from '../../store/homeReel';

const { height } = Dimensions.get('window');

// dispatch(Reel.Enumerate(-121.49428149672518, 38.57366700738277, -123.5, -99.5, 36.57, 40.57));

export default function Home () {
  const dispatch = useDispatch();
  const page = useSelector(state => state.router.page);
  const user = useSelector(state => state.session.user);
  const events = useSelector(state => state.homeReel.list);

  useEffect(() => {
    Location.hasServicesEnabledAsync()
      .then(res => {
        if (res) return Location.getPermissionsAsync();
        else throw new Error('DownToFriend requires system location services to be enabled in order to function properly.');
      })
      .then(res => {
        if (!res.granted && res.canAskAgain) return Location.requestPermissionsAsync();
        else if (!res.granted && !res.canAskAgain) throw new Error('DownToFriend requires system location services to be enabled in order to function properly.');
        else return res;
      })
      .then(res => {
        if (res.granted) return Location.getLastKnownPositionAsync({ maxAge: 1800000, requiredAccuracy: 1000 });
        else throw new Error('DownToFriend requires system location services to be enabled in order to function properly.');
      })
      .then(res => res ?? Location.getCurrentPositionAsync({ accuracy: 2 }))
      .then(res => dispatch(Reel.Enumerate(res.coords.longitude, res.coords.latitude, res.coords.longitude - 1, res.coords.longitude + 1, res.coords.latitude - 1, res.coords.latitude + 1)))
      .catch(err => Alert.alert('Location Required', err.toString(), [{
        text: 'Ok',
        onPress: () => BackHandler.exitApp(),
        style: 'destructive'
      }]));
  }, [dispatch]);

  return events && (
    <FlatList
      data={events}
      keyExtractor={({ id }) => id.toString()}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => <Event event={item} />}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
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
