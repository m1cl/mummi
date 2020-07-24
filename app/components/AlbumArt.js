import React, {Component} from 'react';

import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

export default function AlbumArt({onPress, url}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.image} source={{uri: url}} />
      </TouchableOpacity>
    </View>
  );
}
const {width, height} = Dimensions.get('window');
const imageSize = width - 120;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 60,
    paddingRight: 60,
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
});
