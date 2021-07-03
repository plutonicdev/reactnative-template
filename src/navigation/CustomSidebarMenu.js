//This is an example code for Navigation Drawer with Custom Side bar//
import React, {Component} from 'react';
import {CommonActions} from '@react-navigation/native';

import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-feather1s';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import Strings from '../theme/Strings';``
import {getUserDetails, logout} from '../utils/LocalStorage';
import {act} from 'react-test-renderer';

export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
    //Setting up the Main Top Large Image of the Custom Sidebar
    this.proileImage =
      'https://aboutreact.com/wp-content/uploads/2018/07/sample_img.png';

    this.items = [
      {
        navOptionThumb: 'home',
        navOptionName: 'Home',
        screenToNavigate: 'Home',
      },
      {
        navOptionThumb: 'user',
        navOptionName: 'My Profile',
        screenToNavigate: 'Profile',
      },
      {
        navOptionThumb: 'grid',
        navOptionName: 'Category',
        screenToNavigate: 'Category',
      },
      {
        navOptionThumb: 'gift',
        navOptionName: 'My Offers',
        screenToNavigate: 'Offers',
      },
      {
        navOptionThumb: 'command',
        navOptionName: 'New Products',
        screenToNavigate: 'NewProducts',
      },
      {
        navOptionThumb: 'codesandbox',
        navOptionName: 'Popular Products',
        screenToNavigate: 'PopularProducts',
      },
      {
        navOptionThumb: 'heart',
        navOptionName: 'WishList',
        screenToNavigate: 'WishList',
      },
      {
        navOptionThumb: 'map-pin',
        navOptionName: 'Address',
        screenToNavigate: 'Address',
      },

      {
        navOptionThumb: 'shopping-cart',
        navOptionName: 'My Cart',
        screenToNavigate: 'MyCart',
      },
      {
        navOptionThumb: 'file-text',
        navOptionName: 'My Order',
        screenToNavigate: 'MyOrder',
      },
    ];
  }

  async componentDidMount() {
    let user = await getUserDetails();
    this.setState({user: user});
  }

  logoutUser = () => {
    logout();
    // this.props.navigation.replace('Login');

    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Login'}],
      }),
    );
  };

  getActiveRouteState = (name) => {
    active = false;
    if (this.props.state !== undefined) {
      let activeIndex = this.props.state.index;
      let activeRouteName = this.props.state.routes[activeIndex].name;
      if (activeRouteName === name) {
        active = true;
      }
    }
    return active;
  };

  render() {
    return (
      <View style={styles.sideMenuContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.profileContainer}>
            <Image
              source={require('../assets/images/user.png')}
              style={styles.sideMenuProfileIcon}
            />
            {this.state.user !== null ? (
              <Text style={styles.title}>{this.state.user.name}</Text>
            ) : null}
          </View>

          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#e2e2e2',
            }}
          />

          <View style={{width: '100%'}}>
            {this.items.map((item, key) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: this.getActiveRouteState(
                    item.screenToNavigate,
                  )
                    ? '#F7F7F7'
                    : Colors.white,
                }}
                key={key}>
                <View style={{marginRight: 15, marginLeft: 20}}>
                  <Icon
                    name={item.navOptionThumb}
                    size={22}
                    color={
                      this.getActiveRouteState(item.screenToNavigate)
                        ? Colors.colorPrimary
                        : '#808080'
                    }
                  />
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    color: this.getActiveRouteState(item.screenToNavigate)
                      ? Colors.colorPrimary
                      : 'black',
                  }}
                  onPress={() => {
                    global.currentScreenIndex = key;
                    this.props.navigation.navigate(item.screenToNavigate);
                  }}>
                  {item.navOptionName}
                </Text>
              </View>
            ))}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <View style={{marginRight: 10, marginLeft: 20}}>
                <Icon name="log-out" size={24} color="#808080" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                }}
                onPress={() => {
                  this.logoutUser();
                }}>
                Logout
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const BAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    color: Colors.white,
    fontSize: 16,
    marginLeft: 10,
  },

  profileContainer: {
    width: '100%',
    height: 80,
    marginTop: BAR_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.iconBGd,
    paddingLeft: 20,
    paddingRight: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.colorPrimary,
    display: 'flex',
  },
});
