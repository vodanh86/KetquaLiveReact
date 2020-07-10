import React,{Component} from 'react';
import {
    View,
    StyleSheet, Text
} from 'react-native';
import {Colors} from "../../common/common.constants";


export default class RedCard extends Component {
    render() {
        return (
            <View style={{
                width: 12,
                height: 18,
                borderRightWidth: 2,
                borderBottomWidth: 2,
                borderRightColor: Colors.darkYellow,
                borderBottomColor: Colors.darkYellow,
                backgroundColor: Colors.tintColor,
                borderRadius: 2,
                alignItems: `center`,
                justifyContent: `center`,
                marginLeft: 1,
                marginRight: 1
            }}><Text style={{fontSize: 10, color: Colors.white}}>{this.props.num||""}</Text></View>
        );
    }
}