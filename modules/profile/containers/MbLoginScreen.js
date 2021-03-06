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
import {loginAPI, fbloginAPI, mbloginAPI} from "../api/LoginAPI";
import * as Facebook from 'expo-facebook';

const initialState = {
    loading: false,
    account: "",
    password: ""
};

class MbLoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            account: "",
            password: ""
        };
    }

    async componentDidMount() {
        let account = await AsyncStorage.getItem('account');
        let password = await AsyncStorage.getItem('password');
        this.setState({
            loading: false,
            account: account,
            password: password
        })
    }

    back = async () => {
        this.props.navigation.navigate('Auth');
    }

    login = async () => {
        if (this.state.account == "") {
            alert("Vui lòng nhập tài khoản");
            return false;
        }
        if (this.state.password == "") {
            alert("Vui lòng nhập mật khẩu");
            return false;
        }
        this.setState({loading: true,});
        await AsyncStorage.setItem('account', this.state.account);
        await AsyncStorage.setItem('password', this.state.password);
        try {
            const user = await mbloginAPI(this.state);
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

    facebookLogIn = async () => {
        try {
          await Facebook.initializeAsync('727625241152278');
          const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile','email'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${token}`);
            //const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            const user = await fbloginAPI(await response.json());
            if(user.error == 0){
                this.props.loginSuccess(user.user);
                await AsyncStorage.setItem('code', user.user.code);
                this.props.navigation.navigate('App');
            }else{
                alert(user.message);
                this.setState({loading: false});
            }
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.login_form}>
                    <View style={styles.container_inner}>
                        <Text style={styles.app_name}>{CONFIG.name}</Text>
                        <Text style={styles.app_slogan}>Đăng nhập</Text>
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
                    </View>
                    <TouchableOpacity onPress={this.login} style={styles.login_button}>
                        {this.state.loading?<IconLoading />:<Text style={styles.login_button_text}>Đăng nhập</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.back} style={styles.register_button}>
                        {<Text style={styles.login_button_text}>Trở lại</Text>}
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

export default connect(mapStateToProps, mapDispatchToProps)(MbLoginScreen);