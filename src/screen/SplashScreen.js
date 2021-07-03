import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {getUserDetails} from '../utils/LocalStorage';
import AppBar from '../components/AppBar';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 3000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    const user = await getUserDetails();
    if (data !== null) {
      if (user !== null) {
        if (user.phone_verified) {
          this.props.navigation.replace('HomeScreen');
        } else {
          this.props.navigation.replace('Login');
        }
      } else {
        this.props.navigation.replace('WelcomeScreen');
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <AppBar/>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',
  },
  logo: {
    height: 150,
    width: 150,
  },

  bottomImage: {
    height: 150,
    width: 150,
    position: 'absolute',
    bottom: 15,
    right: 80,
  },
});

export default SplashScreen;
