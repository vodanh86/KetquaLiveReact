import React,{Component} from 'react';
import * as Icon from '@expo/vector-icons';
import { Platform } from 'react-native';
import {Colors} from '../../common/common.constants';

export default class IconItem extends Component {
    render() {
        if(this.props.type && (this.props.type === 'awesome' || this.props.type === 'fa')){
            return (
                <Icon.FontAwesome
                    name={this.props.name}
                    size={this.props.size ? this.props.size : 26}
                    style={this.props.style ? this.props.style : {}}
                    color={this.props.color ? this.props.color : Colors.iconDefault}
                />
            );
        }else if(this.props.type && this.props.type === 'mc'){
            return (
                <Icon.MaterialCommunityIcons
                    name={this.props.name}
                    size={this.props.size ? this.props.size : 26}
                    style={this.props.style ? this.props.style : {}}
                    color={this.props.color ? this.props.color : Colors.iconDefault}
                />
            );
        }else{
            return (
                <Icon.Ionicons
                    name={Platform.OS === 'ios' ? `ios-${this.props.name}`: `md-${this.props.name}`}
                    size={this.props.size ? this.props.size : 26}
                    style={this.props.style ? this.props.style : {}}
                    color={this.props.color ? this.props.color : Colors.iconDefault}
                />
            );
        }
    }
}