import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function FavoriteScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>Favorite!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});
