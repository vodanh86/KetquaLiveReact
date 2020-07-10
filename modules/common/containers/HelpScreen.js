import React from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import WebViewExtra from "../../common/components/WebViewExtra";

class HelpScreen extends React.Component {
    static navigationOptions = {
        title: 'Hướng dẫn sử dụng'
    };
    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <WebViewExtra url={`help`} />
                </ScrollView>
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
        ...getAppPropMap(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HelpScreen);
