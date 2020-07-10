import React from 'react';
import {Animated, Easing, ActivityIndicator} from 'react-native';
import IconItem from "../components/IconItem";
import {Colors} from "../common.constants";

class IconLoading extends React.Component {

    render() {
        return (<ActivityIndicator style={this.props.style||{}} size={this.props.size||`small`} color={this.props.color||Colors.white} />)
    }
}

export default IconLoading;