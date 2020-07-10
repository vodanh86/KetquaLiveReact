import React,{Component} from 'react';
import {View, Button, TouchableWithoutFeedback, Animated, StyleSheet, Text, Keyboard} from 'react-native';
import {Colors, window} from "../common.constants";

export default class ModalExtra extends Component {

    state = {
        visible: false,
        modalAnimatedValue: new Animated.Value(0),
    };
    open = () => {
        Keyboard.dismiss();
        if (this.state.visible) {
            return;
        }
        this.setState({ visible: true }, () => {
            Animated.timing(this.state.modalAnimatedValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });
    };
    close = () => {
        Animated.timing(this.state.modalAnimatedValue, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            this.setState({ visible: false });
        });
    };
    render() {
        if(this.state.visible === true){
            const { modalAnimatedValue } = this.state;
            const opacity = modalAnimatedValue;
            const translateY = modalAnimatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0],
            });
            return (
                <View
                    style={StyleSheet.absoluteFill}
                    pointerEvents={this.state.visible ? 'auto' : 'none'}>
                    <TouchableWithoutFeedback onPress={this.close}>
                        <Animated.View style={[styles.overlay, { opacity }]} />
                    </TouchableWithoutFeedback>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            transform: [{ translateY }],
                            maxHeight: window.height*0.6
                        }}>
                        <View style={styles.toolbar}>
                            {this.props.title &&
                                <Text style={styles.toolbarLeftText}>{this.props.title}</Text>
                            }
                            <Button title="Xong" onPress={this.close} />
                        </View>
                        {this.props.children}
                    </Animated.View>
                </View>
            );
        }else{
            return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: `100%`,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.65)',
    },
    toolbar: {
        flex: 1,
        width: `100%`,
        backgroundColor: '#f1f1f1',
        paddingVertical: 5,
        paddingHorizontal: 15,
        flexDirection: `row`,
        justifyContent: `space-between`,
        alignItems: `center`
    },
    toolbarLeftText: {
        fontSize: 14,
        color: Colors.gray
    }
});