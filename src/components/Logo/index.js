import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';

function Logo(props) {
  return (
    <View style={[styles.logoContainer, props.style]}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/original-logo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
  logo: {
    width: 150,
    height: 110,
  },
});

export default Logo;
