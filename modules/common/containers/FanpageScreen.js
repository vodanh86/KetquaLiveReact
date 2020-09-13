import React from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet
} from 'react-native';
import { WebView } from 'react-native-webview'
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import {CONFIG} from "../common.constants";

class FanpageScreen extends React.Component {
    static navigationOptions = {
        title: 'Fanpage'
    };
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    style={styles.viewContainer}
                    javaScriptEnabled={true}
                    source={{
                        uri: CONFIG.fanpage_url,
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewContainer: {
        flex: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(FanpageScreen);
