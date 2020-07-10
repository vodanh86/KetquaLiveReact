import React from 'react';
import * as Icon  from '@expo/vector-icons';

import {Colors} from '../../common/common.constants';

export default class SideMenuItemIcon extends React.Component {
    render() {
        return (
            <Icon.Ionicons
                name={this.props.name}
                size={26}
                style={{ marginRight: 3 }}
                color={Colors.tintColor}
            />
        );
    }
}