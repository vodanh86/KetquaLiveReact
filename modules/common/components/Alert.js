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

class Alert extends Component {
    state = {
        message: this.props.message
    };

    render() {
        return (
            <View style={styles.chargePopup}>
                <Text style={{textAlign: `center`, paddingVertical: 30}}>{this.state.message}</Text>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(Alert);