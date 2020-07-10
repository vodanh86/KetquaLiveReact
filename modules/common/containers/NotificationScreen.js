import React from 'react';
import {
    WebView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Platform
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../common.map";
import {connect} from 'react-redux';
import styles from '../styles/NotificationStyle';
import {Colors, window} from "../common.constants";
import IconItem from "../components/IconItem";

class NotificationScreen extends React.Component {
    static navigationOptions = {
        title: 'Thông báo',
    };
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <IconItem name={`alarm${Platform.OS==='ios'?'-outline':''}`} size={40} />
                    <Text style={styles.noMessage}>Hiện không có thông báo nào</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);