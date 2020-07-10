import React from 'react';
import {createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator} from 'react-navigation';
import {connect} from 'react-redux';

import MainTabNavigator from './navigator.tab';
import SideMenu from "../modules/common/components/SideMenu";
import BackButton from "../modules/common/components/BackButton";
import {Colors} from '../modules/common/common.constants';
import {getAppPropMap, getAppStateMap} from "../modules/common/common.map";
import LoginScreen from "../modules/profile/containers/LoginScreen";
import CheckLoginScreen from "../modules/profile/containers/CheckLoginScreen";

// Login stack
const LoginStack = createStackNavigator({
    Login: LoginScreen
}, {
    headerMode: 'none'
});

const AppNavigator = createDrawerNavigator({
    Main: MainTabNavigator
}, {
    contentComponent: props => <SideMenu {...props} />,
    defaultNavigationOptions: {
        headerTintColor: Colors.tintTextColor,
        headerStyle: {
            backgroundColor: Colors.tintColor
        },
        headerLeft:
            <BackButton/>
    }
});

const mapStateToProps = (state) => {
    return {
        ...getAppStateMap(state),
        isLoggedIn: state.common.isLoggedIn
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...getAppPropMap(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(createAppContainer(createSwitchNavigator({
    CheckLogin:  CheckLoginScreen,
    App: AppNavigator,
    Auth: LoginStack
},{
    initialRouteName: "CheckLogin"
})))