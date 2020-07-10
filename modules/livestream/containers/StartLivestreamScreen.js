import React from 'react';
import {Modal, Alert, View, TouchableHighlight, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {cancelLivestream, startLivestreamSubmit} from "../livestream.actions";
import IconItem from "../../common/components/IconItem";
import {Colors} from "../../common/common.constants";
import styles from '../styles/LivestreamStyle';
import {Camera, Permissions} from 'expo';

class StartLivestreamScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.front,
    };
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    render(){
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <View style={styles.startLivestreamModal}><Text>Bạn cần cài đặt cho phép ứng dụng truy cập máy ảnh</Text></View>;
        } else {
            return <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.showModal} >
                <View style={styles.startLivestreamModal}>
                    <Camera style={styles.camera_preview_wrap} type={this.state.type}>
                        <View style={styles.camera_preview}>
                            <TouchableOpacity style={styles.camera_reverse_button} onPress={() => {
                                this.setState({
                                    type: this.state.type === Camera.Constants.Type.front
                                        ? Camera.Constants.Type.back
                                        : Camera.Constants.Type.front,
                                });
                            }}>
                                <IconItem size={40} color={Colors.white} name="reverse-camera" />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                    <TouchableHighlight style={styles.startLivestreamSubmitButton} onPress={() => {this.props.startLivestreamSubmit()}}>
                        <Text style={styles.startLivestreamSubmitText}>Bắt đầu</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.startLivestreamCancelButton} onPress={() => {this.props.cancelLivestream()}}>
                        <IconItem name="close" size={40} color={Colors.white} />
                    </TouchableHighlight>
                </View>
            </Modal>;
        }
    }
}


const mapStateToProps = (state) => {
    return {
        ...getAppStateMap(state),
        showModal: state.livestream.showModal
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...getAppPropMap(dispatch),
        startLivestreamSubmit: () => {
            dispatch(startLivestreamSubmit())
        },
        cancelLivestream: () => {
            dispatch(cancelLivestream())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartLivestreamScreen);