import React,{Component} from 'react';
import {View, Button, TouchableWithoutFeedback, Animated, StyleSheet, Text, Keyboard} from 'react-native';
import {Colors, window} from "../common.constants";
import IconItem from "./IconItem";
import {getAppPropMap, getAppStateMap} from "../common.map";
import {connect} from "react-redux";

class PopupExtra extends Component {
    state = {
        visible: false,
        modalAnimatedValue: new Animated.Value(0)
    };
    open = () => {
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
            const opacity = this.state.modalAnimatedValue;
            const translateY = this.state.modalAnimatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0],
            });
            return (
                <View
                    style={StyleSheet.absoluteFill}
                    pointerEvents={this.state.visible ? 'auto' : 'none'}>
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        flex: 1,
                        flexDirection: `row`,
                        justifyContent: `center`,
                        alignItems: `center`
                    }}>

                        <TouchableWithoutFeedback onPress={this.close}>
                            <Animated.View style={[styles.overlay, { opacity }]} />
                        </TouchableWithoutFeedback>
                    <Animated.View
                        style={{
                            backgroundColor: `#FFFFFF`,
                            transform: [{ translateY }],
                            width: window.width*0.8,
                            minHeight: 100,
                            maxHeight: window.height*0.8,
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: Colors.tintColor
                        }}
                        >

                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{flex: 1}}>
                            <View style={styles.toolbar}>
                                {this.props.title &&
                                    <Text style={styles.toolbarLeftText}>{this.props.title}</Text>
                                }
                                <TouchableWithoutFeedback onPress={this.close} style={{paddingHorizontal: 7}}><View><IconItem style={{fontWeight: `bold`}} name={`close`} color={Colors.white} size={30}/></View></TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                        {this.props.children}
                    </Animated.View>
                    </View>
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
        maxHeight: 50,
        backgroundColor: Colors.tintColor,
        paddingVertical: 5,
        paddingHorizontal: 15,
        flexDirection: `row`,
        justifyContent: `space-between`,
        alignItems: `center`
    },
    toolbarLeftText: {
        fontSize: 14,
        fontWeight: `bold`,
        color: Colors.white
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

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(PopupExtra);