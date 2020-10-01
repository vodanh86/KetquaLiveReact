import React from 'react';
import {createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator} from 'react-navigation';
import {connect} from 'react-redux';

import MainTabNavigator from './navigator.tab';
import SideMenu from "../modules/common/components/SideMenu";
import BackButton from "../modules/common/components/BackButton";
import {Colors} from '../modules/common/common.constants';
import {getAppPropMap, getAppStateMap} from "../modules/common/common.map";
import LoginScreen from "../modules/profile/containers/LoginScreen";
import MbLoginScreen from "../modules/profile/containers/MbLoginScreen";
import CheckLoginScreen from "../modules/profile/containers/CheckLoginScreen";
import RegisterScreen from "../modules/profile/containers/RegisterScreen";
// Login stack
const LoginStack = createStackNavigator({
    Login: LoginScreen
}, {
    headerMode: 'none'
});
// Login stack
const RegisterStack = createStackNavigator({
    register: RegisterScreen
}, {
    headerMode: 'none'
});
// Login stack
const MbLoginStack = createStackNavigator({
    MbLogin: MbLoginScreen
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
    Auth: LoginStack,
    Register: RegisterStack,
    MbLogin: MbLoginStack
},{
    initialRouteName: "CheckLogin"
})))