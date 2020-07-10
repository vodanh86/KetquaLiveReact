import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    View, AsyncStorage
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/LoginStyle';
import {loginFacebookClicked, loginNormalClicked, loginNormalSuccess} from "../profile.actions";
import {CONFIG} from "../../common/common.constants";
import IconLoading from "../../common/components/IconLoading";
import {call, put} from "redux-saga/effects";
import {getUserCodeAPI} from "../api/GetNewUserCodeAPI";
import {loginAPI} from "../api/LoginAPI";

const initialState = {
    loading: false
};

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    login = async () => {
        this.setState({loading: true});
        try {
            let code = AsyncStorage.getItem('code');
            if(!code || typeof code !== "string"){
                const phone_number = AsyncStorage.getItem('phone');
                const verify_code = AsyncStorage.getItem('verify_code');
                code = await getUserCodeAPI(phone_number, verify_code);
            }
            const user = await loginAPI(code);
            if(user){
                this.props.loginSuccess(user);
                await AsyncStorage.setItem('code', user.code);
                this.props.navigation.navigate('App');
            }else{
                alert("Tạm thời không đăng nhập được");
                this.setState({loading: false});
            }
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.login_form}>
                    <Image source={require('../../../assets/images/icon.png')} style={styles.app_icon} />
                    <Text style={styles.app_name}>{CONFIG.name}</Text>
                    <Text style={styles.app_slogan}>{CONFIG.slogan}</Text>
                    <TouchableOpacity onPress={this.login} style={styles.login_button}>
                        {this.state.loading?<IconLoading />:<Text style={styles.login_button_text}>Đăng nhập</Text>}
                    </TouchableOpacity>
                    <View style={styles.hotline}>
                        <Text style={styles.hotline_label}>Hotline: </Text>
                        <TouchableOpacity onPress={() => this.props.callHotline()}><Text style={styles.hotline_text}>{CONFIG.hotline}</Text></TouchableOpacity>
                    </View>
                </View>
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
        loginNormal: (navigator) => {
            dispatch(loginNormalClicked(navigator));
        },
        loginFacebook: (navigator) => {
            dispatch(loginFacebookClicked(navigator));
        },
        loginSuccess: (user) => {
            dispatch(loginNormalSuccess(user));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);