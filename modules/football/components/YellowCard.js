import React,{Component} from 'react';
import {
    View,
    StyleSheet, Text
} from 'react-native';
import {Colors} from "../../common/common.constants";

export default class YellowCard extends Component {
    render() {
        return (
            <View style={{
                width: 12,
                height: 18,
                backgroundColor: Colors.darkYellow,
                borderRadius: 2,
                alignItems: `center`,
                justifyContent: `center`,
                marginLeft: 1,
                marginRight: 1
            }}><Text style={{fontSize: 10}}>{this.props.num||""}</Text></View>
        );
    }
}