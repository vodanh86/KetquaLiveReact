import React from 'react';
import {View, Text, Animated, Easing, SafeAreaView, Platform, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import IconLoading from "../components/IconLoading";
import styles from '../styles/WrapStyle';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import IconItem from "../components/IconItem";
import {Colors, INIT_STATE} from "../common.constants";
import ModalAlert from "../components/ModalAlert";

class WrapScreen extends React.Component {
    render() {
        return (<View style={styles.container}>
            {this.props.children}
            {this._renderAlert()}
            {this._renderModal()}
        </View>)
    }

    _renderAlert = () => {
        if(this.props.alert.is_visible === true){
            if(this.props.alert.theme === 'loading'){
                return (<View style={styles.alert_loading}>
                    <SafeAreaView style={Platform.OS==='android'?{paddingTop: 25}:{}}>
                        <View style={styles.alert_container}>
                            <IconLoading style={styles.alert_icon} />
                            <Text style={styles.white_text}>{this.props.alert.message}</Text>
                        </View>
                    </SafeAreaView>
                </View>);
            }else if(this.props.alert.theme === 'info'){
                return (<View style={styles.alert_loading}>
                    <SafeAreaView style={Platform.OS==='android'?{paddingTop: 25}:{}}>
                    <View style={styles.alert_container}>
                        <Text style={styles.white_text}>{this.props.alert.message}</Text>
                    </View>
                    </SafeAreaView>
                </View>);
            }else if(this.props.alert.theme === 'error'){
                return (<View style={styles.alert_error}>
                    <SafeAreaView style={Platform.OS==='android'?{paddingTop: 25}:{}}>
                        <View style={styles.alert_container}>
                            <IconItem type={`mc`} name={`alert-octagon`} color={Colors.white} style={styles.alert_icon} size={20} />
                            <Text style={styles.white_text}>{this.props.alert.message}</Text>
                        </View>
                    </SafeAreaView>
                </View>);
            }else if(this.props.alert.theme === 'success'){
                return (<View style={styles.alert_success}>
                    <SafeAreaView style={Platform.OS==='android'?{paddingTop: 25}:{}}>
                        <View style={styles.alert_container}>
                            <IconItem type={`mc`} name={`check-circle`} color={Colors.white} style={styles.alert_icon} size={20} />
                            <Text style={styles.white_text}>{this.props.alert.message}</Text>
                        </View>
                    </SafeAreaView>
                </View>);
            }else{
                return (<View style={styles.alert_normal}>
                    <SafeAreaView style={Platform.OS==='android'?{paddingTop: 25}:{}}>
                        <View style={styles.alert_container}>
                            <Text style={styles.black_text}>{this.props.alert.message}</Text>
                        </View>
                    </SafeAreaView>
                </View>);
            }
        }
    };

    _renderModal = () => {
        if(this.props.modal.is_visible === true){
            return (<ModalAlert visible={this.props.modal.is_visible} ref={popup => this.popup = popup} title={this.props.modal.title!=""?this.props.modal.title:INIT_STATE.modal.title}>
                    <Text>{this.props.modal.message}</Text>
            </ModalAlert>);
        }
    };
}


const mapStateToProps = (state) => {
    return {
        ...getAppStateMap(state),
        alert: state.common.alert,
        modal: state.common.modal
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...getAppPropMap(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(WrapScreen);