import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TextInput,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import {Colors} from '../../common/common.constants';

export default class EditPasswordPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ""
        };
    }
    render() {
        return (
            <KeyboardAvoidingView behavior={ Platform.OS === 'android' ? 'padding' :  null} enabled>
            <View style={styles.form}>
                <View style={styles.row}>
                    <TextInput placeholder={"Mật khẩu dùng để đăng nhập"} secureTextEntry={true} value={this.state.password} style={styles.input} onChangeText={this.onChangeText}  enablesReturnKeyAutomatically={true} returnKeyType={`done`}/>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.submit} onPress={this.submitEdit}><Text style={styles.submitText}>Lưu lại</Text></TouchableOpacity>
                </View>
            </View>
            </KeyboardAvoidingView>
        );
    }

    onChangeText = pass => {
        this.setState({password: pass});
    };

    submitEdit = () => {
        this.props.onChange(this.state.password);
    };
}

const styles = StyleSheet.create({
    form: {
        padding: 15
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    row: {
        marginBottom: 15,
        minHeight: 40
    },
    input: {
        fontSize: 16,
        backgroundColor: Colors.lightGray,
        borderRadius: 3,
        padding: 10
    },
    submit: {
        backgroundColor: Colors.tintColor,
        width: `100%`,
        padding: 10,
        borderRadius: 3,
        borderWidth: 0,
        justifyContent: `center`,
        alignItems: `center`
    },
    submitText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: `bold`,
        textAlign: `center`
    }
});