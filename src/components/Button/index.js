import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Dimensions, Fonts} from '../../theme';


const Button=(props)=>{
    return(
        <View style={[styles.container, props.style]}>
            <TouchableOpacity onPress={props.onClick} >
                {props.children?props.children:
                    <Text style={[styles.text, props.textStyle]}>
                    {props.text}
                </Text>}

            </TouchableOpacity>
        </View>



    );

}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:Colors.white,
        margin:10
    },
    text:{
        display:'flex',
        fontSize:Dimensions.defaultTextSize,
        color:Colors.black,
        padding:14
    }

});

export default Button;
