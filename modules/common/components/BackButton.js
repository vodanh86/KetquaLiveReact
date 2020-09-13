import React from 'react';
import {Colors} from "../../common/common.constants";
import {withNavigation} from 'react-navigation';
import {Platform, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux';
import {getAppPropMap, getAppStateMap} from "../common.map";

class BackButton extends React.Component {
    render(){
        return (
            <TouchableOpacity style={{width: 50}} onPress={() => this.props.clickBack(this.props.navigation)}>
                <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                    size={26}
                    style={{marginLeft: 15}}
                    color={Colors.tintTextColor}
                />
            </TouchableOpacity>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(BackButton));