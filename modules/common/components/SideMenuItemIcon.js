import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {Colors} from '../../common/common.constants';

export default class SideMenuItemIcon extends React.Component {
    render() {
        return (
            <Ionicons
                name={this.props.name}
                size={26}
                style={{ marginRight: 3 }}
                color={Colors.tintColor}
            />
        );
    }
}