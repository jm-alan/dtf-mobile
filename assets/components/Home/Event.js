import React from 'react';
import { StyleSheet, Dimensions, View, Text, Image } from 'react-native';

const { width } = Dimensions.get('window');

export default function Event ({ event }) {
  const slotsRemaining = event.maxGroup - event.AttendingUsers.length;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.userTitleContainer}>
        <View style={styles.userContainer}>
          <Image
            style={styles.hostAvatar}
            source={{ uri: event.Host.Avatar && event.Host.Avatar.url }}
          />
          <Text style={styles.hostName}>
            {event.Host.firstName}
          </Text>
        </View>
        <Text style={styles.title}>
          {event.title.toTitleCase()}
        </Text>
        <Text style={styles.distance}>
          {event.distance.toFixed(0)} miles away
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          {event.AttendingUsers.length || ''} {event.AttendingUsers.length === 1
            ? 'person is'
            : event.AttendingUsers.length
              ? 'people are'
              : 'No one is'} going{!!event.AttendingUsers.length || ' yet'},
          {` ${slotsRemaining}` || 'No'} spot{slotsRemaining !== 1 && 's'} left
        </Text>
        <Text style={styles.footerText}>
          {(new Date(event.dateTime)).toLocaleDateString({ dateStyle: 'short' })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: width - 20,
    marginBottom: 5,
    marginTop: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    elevation: 1
  },
  userTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  footerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  hostAvatar: {
    height: 50,
    width: 50,
    borderRadius: 50
  },
  hostName: {
    fontSize: 20
  },
  title: {
    fontSize: 30
  },
  footerText: {
    fontSize: 20
  }
});
