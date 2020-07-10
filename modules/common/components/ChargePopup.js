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
import IconItem from "./IconItem";
import IconLoading from "./IconLoading";
import {connect} from "react-redux";
import {getAppPropMap, getAppStateMap} from "../common.map";

class ChargePopup extends Component {
    state = {
        alertObj: null,
        disabled: false,
        loading: false,
        region: '',
        price: 0,
        label: 'Chọn đúng mệnh giá',
        serial: "",
        num: ""
    };

    onChangeSerial = (serial) => {
        this.setState({serial: serial});
    };

    onChangeNumber = (num) => {
        this.setState({num: num});
    };

    onChangePrice = (price) => {
        this.setState({price: price.price, label: price.label});
    };

    submit = () => {
        if(this.state.serial === ""){
            this.onError("Vui lòng nhập Serial");
            return false;
        }else if(this.state.num === ""){
            this.onError("Vui lòng nhập mã thẻ");
            return false;
        }else if(this.state.price === 0){
            this.onError("Vui lòng chọn đúng mệnh giá");
            return false;
        }
        if(this.props.onSubmit !== undefined){
            this.props.onSubmit(this.state.serial, this.state.num, this.state.price);
        }
    };

    onError = (message) => {
        if(this.state.alertObj !== null){
            clearTimeout(this.state.alertObj);
        }
        this.props.alert_info(message);
        this.state.alertObj = setTimeout(() => {
            this.props.hide_alert();
        }, 3000);
    };

    render() {
        return (
            <KeyboardAvoidingView behavior={ Platform.OS === 'android' ? 'padding' :  null} enabled>
            <View style={styles.chargePopup}>
                <View style={styles.row}>
                    <Text style={styles.label}>Seri thẻ</Text>
                    <TextInput style={styles.input} value={this.state.serial} onChangeText={this.onChangeSerial} keyboardType={`numeric`} enablesReturnKeyAutomatically={true} returnKeyType={`done`}/>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Mã số thẻ</Text>
                    <TextInput style={styles.input} value={this.state.num} onChangeText={this.onChangeNumber} keyboardType={`numeric`} enablesReturnKeyAutomatically={true} returnKeyType={`done`}/>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Mệnh giá</Text>
                    <TouchableOpacity style={styles.select} onPress={() => this.props.priceModal.open()}>
                        <Text style={styles.selectText}>{this.state.label}</Text>
                        <IconItem name={`arrow-down`} />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Text style={{textAlign: `center`,color: Colors.gray}}>*Nạp sai 3 lần liên tiếp sẽ bị khóa kênh nạp thẻ qua thẻ cào trong vòng 24h</Text>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.submit} onPress={this.submit}>
                        {this.state.loading?<IconLoading/>:<Text style={styles.submitText}>Nạp</Text>}
                    </TouchableOpacity>
                </View>
            </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    chargePopup: {
        padding: 15
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
    select: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        width: `100%`,
        minHeight: 39.5,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        backgroundColor: Colors.lightGray
    },
    selectText: {
        color: Colors.lightBlack
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

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(ChargePopup);