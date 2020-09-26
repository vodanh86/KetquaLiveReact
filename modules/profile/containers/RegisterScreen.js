import React from 'react';
import {
    TouchableOpacity,
    TextInput,
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
import {loginAPI, fbloginAPI, mbRegisterAPI} from "../api/LoginAPI";
import * as Facebook from 'expo-facebook';

const initialState = {
    loading: false,
    account: "",
    password: ""
};

class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            account: "",
            password: "",
            rePassword: ""
        };
    }

    login = async () => {
        this.props.navigation.navigate('Auth');
    }

    register = async () => {
        if (this.state.account == "") {
            alert("Vui lòng nhập tài khoản");
            return false;
        }
        if (this.state.password == "") {
            alert("Vui lòng nhập mật khẩu");
            return false;
        }
        if (this.state.rePassword == "") {
            alert("Vui lòng nhập lại mật khẩu");
            return false;
        }
        if (isNaN(this.state.account) || (this.state.account.length < 8) || (this.state.account.length > 12)) {
            alert("Tài khoản phải là số điện thoại");
            return false;
        }
        if (this.state.password != this.state.rePassword) {
            alert("Mật khẩu nhập lại không chính xác");
            return false;
        }
        if (this.state.password.length < 5 || this.state.password.length > 32){
            alert("Mật khẩu phải dài trên 5 ký tự");
            return false;
        }
        this.setState({loading: true,});
        try {
            const user = await mbRegisterAPI(this.state);
            if(user.error == 0){
                this.props.loginSuccess(user.user);
                await AsyncStorage.setItem('code', user.user.code);
                this.props.navigation.navigate('App');
            }else{
                alert(user.message);
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
                    <Text style={styles.app_slogan}>Đăng ký tài khoản</Text>
                    <View style={styles.container_inner}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Số điện thoại</Text>
                            <TextInput style={styles.input} value={this.state.account} keyboardType={`phone-pad`} 
                            onChangeText={(value) => this.setState({account: value})}/>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Mật khẩu</Text>
                            <TextInput style={styles.input} value={this.state.password} secureTextEntry autoCorrect={false} 
                            onChangeText={(value) => this.setState({password: value})}/>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Nhập lại mật khẩu</Text>
                            <TextInput style={styles.input} value={this.state.rePassword} secureTextEntry autoCorrect={false} 
                            onChangeText={(value) => this.setState({rePassword: value})}/>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.register} style={styles.login_button}>
                        {this.state.loading?<IconLoading />:<Text style={styles.login_button_text}>Đăng ký</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.login} style={styles.register_button}>
                        {this.state.loading?<IconLoading />:<Text style={styles.login_button_text}>Trở lại</Text>}
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);