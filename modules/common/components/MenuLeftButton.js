import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import {Colors} from "../common.constants";
import { Ionicons } from '@expo/vector-icons';
import {withNavigation} from 'react-navigation';

class MenuLeftButton extends React.Component {
    render(){
        return (<TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Ionicons
                name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                size={26}
                style={{marginLeft: 15}}
                color={Colors.tintTextColor}
            />
        </TouchableOpacity>)
    }
}

export default withNavigation(MenuLeftButton);