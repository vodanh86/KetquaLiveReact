import React,{Component} from 'react';
import { Ionicons } from '@expo/vector-icons';

import {Colors} from '../../common/common.constants';

export default class TabBarIcon extends Component {
  render() {
    return (
      <Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}