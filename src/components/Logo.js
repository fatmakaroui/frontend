import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/logo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    maxWidth:500,
    maxHeight:150,
    marginBottom:75,
    
  },
});

export default memo(Logo);
