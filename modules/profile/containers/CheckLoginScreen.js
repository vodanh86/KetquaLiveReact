import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';
import styles from '../styles/LoginStyle';
import {connect} from 'react-redux';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {loginNormalSuccess} from "../profile.actions";
import {loginAPI} from "../api/LoginAPI";

class CheckLoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('code', () => {});
        if(userToken !== null){
            const user = await loginAPI(userToken);
            if(user){
                await this.props.loginSuccess(user);
                this.props.navigation.navigate('App');
            }else{
                this.props.navigation.navigate('Auth');
            }
        }else{
            this.props.navigation.navigate('Auth');
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        ...getAppStateMap(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...getAppPropMap(dispatch),
        loginSuccess: (user) => {
            dispatch(loginNormalSuccess(user));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckLoginScreen);