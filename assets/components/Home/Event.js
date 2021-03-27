import React from 'react';
import { StyleSheet, Dimensions, View, Text, Image } from 'react-native';

const { width } = Dimensions.get('window');

export default function Event ({ event }) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.userTitleContainer}>
        <View style={styles.userContainer}>
          <Image
            style={styles.hostAvatar}
            source={{ uri: event.Host.Avatar && event.Host.Avatar.url }}
          />
          <Text style={styles.title}>
            {event.Host.firstName}
          </Text>
        </View>
        <Text style={styles.title}>
          {event.title.toTitleCase()}
        </Text>
      </View>
      <Text style={styles.title}>
        {(new Date(event.dateTime)).toLocaleDateString({ dateStyle: 'short' })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: width * 0.85,
    marginBottom: 10,
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
  hostAvatar: {
    height: 50,
    width: 50,
    borderRadius: 50
  },
  title: {
    fontSize: 20
  }
});
