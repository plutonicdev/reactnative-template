import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const AppBar=(props)=>{
    return(
        <StatusBar
            animated={props.animated?true:false}
            backgroundColor={props.backgroundColor?props.backgroundColor:Colors.colorPrimaryDark}
            barStyle={props.statusBarStyle?props.statusBarStyle:STYLES[1]}
            showHideTransition={props.transition?props.transition:TRANSITIONS[0]}
            hidden={props.hidden?true:false}
            translucent={props.translucent?true:false}
        />
    );
}

export default AppBar;

