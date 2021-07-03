import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/screen/SplashScreen';
import WelcomeScreen from './src/screen/WelcomeScreen';
import HomeScreen from './src/screen/HomeScreen';
import CustomSidebarMenu from './src/navigation/CustomSidebarMenu';
import AsyncStorage from '@react-native-community/async-storage';

import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const ProductStack = createStackNavigator();
const OrderStack = createStackNavigator();
const Drawer = createDrawerNavigator();

global.currentScreenIndex = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createDrawer = () => (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );

  MainStackScreen = () => (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <MainStack.Screen name="SplashScreen" component={SplashScreen} />
      <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </MainStack.Navigator>
  );

  RootStackScreen = () => (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <RootStack.Screen name="Main" component={this.MainStackScreen} />
      <RootStack.Screen name="Home" children={this.createDrawer} />
    </RootStack.Navigator>
  );
  componentDidMount = async () => {
    this.createNotificationListeners();
  };
  async createNotificationListeners() {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }
  render() {
    return <NavigationContainer>{this.RootStackScreen()}</NavigationContainer>;
  }
}

export default App;
