import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Event from './Event';
import * as Reel from '../../store/homeReel';

const { height } = Dimensions.get('window');

export default function Home () {
  const dispatch = useDispatch();
  const page = useSelector(state => state.router.page);
  const user = useSelector(state => state.session.user);
  const events = useSelector(state => state.homeReel.list);

  useEffect(() => {
    dispatch(Reel.EnumerateReel(-121.49428149672518, 38.57366700738277, -123.5, -99.5, 36.57, 40.57));
  }, [dispatch]);

  const listMap = ({ item }) => (
    <Event event={item} />
  );

  return events && (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={events}
      renderItem={listMap}
      keyExtractor={i => i.id.toString()}
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
