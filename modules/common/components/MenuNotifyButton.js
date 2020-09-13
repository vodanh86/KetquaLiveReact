import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import {Colors} from "../common.constants";
import { Ionicons } from '@expo/vector-icons';
import {withNavigation} from 'react-navigation';
import {getAppPropMap, getAppStateMap} from "../common.map";
import {connect} from 'react-redux';

class MenuNotifyButton extends React.Component {
    render(){
        return (<TouchableOpacity onPress={() => this.props.goToRoute(this.props.navigation, 'Notification')}>
            <Ionicons
                name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'}
                size={26}
                style={{marginRight: 15}}
                color={Colors.tintTextColor}
            />
        </TouchableOpacity>)
    }
}


const mapStateToProps = (state) => {
    return {
        ...getAppStateMap(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...getAppPropMap(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(MenuNotifyButton));