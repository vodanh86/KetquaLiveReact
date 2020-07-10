import React from 'react';
import {
    ScrollView,
    Text,
    View
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../common.map";
import {connect} from 'react-redux';
import styles from '../styles/RankingStyle';

class RankingScreen extends React.Component {
    static navigationOptions = {
        title: 'Bảng xếp hạng',
    };
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View>
                        <Text>Bảng xếp hạng</Text>
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(RankingScreen);