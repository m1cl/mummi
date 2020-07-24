import React, {Component} from 'react';

import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const imageSize = width - 48;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
});

export default function AlbumCover({url, onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.image} source={{uri: url}} />
      </TouchableOpacity>
    </View>
  );
}
