import React from 'react';
import {
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
    View,
    TextInput,
    StyleSheet,
    Platform
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../common.map";
import {connect} from 'react-redux';
import {Colors, CONFIG} from "../common.constants";
import {valid_phone} from "../common.helpers";
import IconLoading from "../components/IconLoading";
import {callAPI} from "../api/callAPI";

class RegisterScreen extends React.Component {
    static navigationOptions = {
        title: 'Gửi phản hồi'
    };

    state = {
        loading: false,
        alertObj: null,
        phone: this.props.visitor.phone.toString() || "",
        content: ""
    };

    onChangePhone = (phone) => {
        this.setState({phone: phone});
    };

    onChangeContent = (content) => {
        this.setState({content: content});
    };

    submit = async () => {
        Keyboard.dismiss();
        if(this.state.loading === false){
            if(!valid_phone(this.state.phone)){
                this.alert("Vui lòng nhập số điện thoại của bạn", "info", 3);
                return false;
            }else if(this.state.content.length < 5){
                this.alert("Nội dung quá ngắn", "info", 3);
                return false;
            }else{
                this.setState({loading: true});
                let result = await callAPI('user/feedback',{
                    title: this.state.phone,
                    content: this.state.content,
                    platform_type: Platform.OS,
                    platform_version: Platform.Version
                });
                if(result.error === 0){
                    this.alert("Chúng tôi đã nhận được phản hồi của bạn!", "success", 5);
                    this.setState({content: ""});
                }else{
                    this.alert(result.message, "error", 5);
                }
                this.setState({loading: false});
            }
        }else{
            alert("Vui lòng đợi...");
        }
    };


    alert = (message, type, second) => {
        if(this.state.alertObj !== null){
            clearTimeout(this.state.alertObj);
        }
        switch (type) {
            case 'loading':
                this.props.alert_loading(message);
                break;
            case 'error':
                this.props.alert_error(message);
                break;
            case 'success':
                this.props.alert_success(message);
                break;
            default:
                this.props.alert_info(message);
                break;
        }
        this.state.alertObj = setTimeout(() => {
            this.props.hide_alert();
        }, 1000*second);
    };

    render() {
        return (

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{flex: 1}}>
            <View style={styles.container}>
                    <View style={styles.container_inner}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Số điện thoại</Text>
                            <TextInput style={styles.input} value={this.state.phone} onChangeText={this.onChangePhone} keyboardType={`phone-pad`} autoFocus={false}  enablesReturnKeyAutomatically={true} returnKeyType={`done`}/>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Ý kiến phản hồi</Text>
                            <TextInput style={styles.textarea} value={this.state.content} onChangeText={this.onChangeContent} keyboardType={`default`} autoFocus={false}  multiline={true} />
                        </View>
                        <View style={styles.right_row}>
                            <TouchableOpacity style={styles.submit} onPress={this.submit}>
                                {this.state.loading?<IconLoading/>:<Text style={styles.submitText}>Gửi</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{alignItems: `center`,
                        height: 100,
                        padding: 10,
                        justifyContent: `flex-end`}}>
                        <View style={styles.chargeNoticeHead}>
                            <Text style={styles.chargeNoticeHeadText}>CSKH: </Text>
                            <Text style={styles.sab01e43a}>{CONFIG.hotline}</Text>
                        </View>
                        <View style={styles.chargeNoticeTime}>
                            <Text style={styles.chargeNoticeTimeText}>({CONFIG.support_time})</Text>
                        </View>
                    </View>
            </View>
            </TouchableWithoutFeedback>
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
        ...getAppPropMap(dispatch)
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    container_inner: {
        flex: 1
    },
    right_row: {
        marginBottom: 10,
        minHeight: 40,
        alignItems: `flex-end`
    },
    row: {
        marginBottom: 10,
        minHeight: 40
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        backgroundColor: Colors.lightGray,
        borderRadius: 3,
        padding: 10
    },
    textarea: {
        fontSize: 16,
        backgroundColor: Colors.lightGray,
        borderRadius: 3,
        padding: 10,
        minHeight: 150,
        maxHeight: 150,
        textAlignVertical: `top`
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
    },
    chargeNoticeHead: {
        alignItems: `center`,
        flex: 1,
        flexDirection: `row`,
        justifyContent: `center`,
        marginBottom: 5,
        marginTop: 15
    },
    chargeNoticeTime: {
        alignItems: `center`,
        flex: 1,
        justifyContent: `center`,
        marginBottom: 15,
    },
    chargeNoticeTimeText: {
        color: Colors.gray
    },
    sab01e43a: {color: `rgba(246, 0, 0, 1)`, fontWeight: `bold`},
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
