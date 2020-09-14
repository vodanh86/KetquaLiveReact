import React from 'react';
import {
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
    View,
    TextInput,
    AsyncStorage,
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../common.map";
import {connect} from 'react-redux';
import {Colors, CONFIG} from "../common.constants";
import {valid_phone} from "../common.helpers";
import IconLoading from "../components/IconLoading";
import {callAPI} from "../api/callAPI";

class LogoutScreen extends React.Component {
    static navigationOptions = {
        title: 'Gửi phản hồi'
    };

    state = {
        loading: false,
        alertObj: null,
        phone: this.props.visitor.phone.toString() || "",
        content: ""
    };

    componentDidMount() {
        AsyncStorage.removeItem('code').then(value => {
            this.props.navigation.navigate('Auth');
          });
        //AsyncStorage.removeItem('code', (err) => {
        // key 'key' will be removed, if they existed
        // callback to do some action after removal of item
       // });
        //this.props.navigation.navigate('Auth');
    }

    render() {
        return (

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{flex: 1}}>
            <View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen);
