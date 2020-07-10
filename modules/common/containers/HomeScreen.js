import React from 'react';
import {
    View
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../common.map";
import {connect} from 'react-redux';
import styles from '../styles/HomeStyle';
import LivestreamLatest from "../../livestream/components/LivestreamLatest";
import MenuLeftButton from '../../../modules/common/components/MenuLeftButton';
import MenuNotifyButton from '../../../modules/common/components/MenuNotifyButton';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Trang chủ',
        headerLeft: <MenuLeftButton />,
        headerRight: <MenuNotifyButton />,
    };
    state = {
        modalVisible: false,
    };

    render() {
        return (
            <View style={styles.container}>
                <LivestreamLatest comment="List livestream" />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
