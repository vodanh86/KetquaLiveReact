import React, {Fragment} from 'react';
import {
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import Loto from "../components/Loto";
import styles from '../styles/LotoStyle';
import MenuLeftButton from '../../common/components/MenuLeftButton';
import MenuNotifyButton from '../../common/components/MenuNotifyButton';

class LotoScreen extends React.Component {
    static navigationOptions = {
        title: 'Đọc truyện',
        headerLeft: <MenuLeftButton />,
        headerRight: <MenuNotifyButton />,
    };
    state = {
        tab: 'loto'
    };

    changeTab = (tab) => {
        this.setState({tab: tab});
    };

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.mainTab}>
                    <TouchableOpacity
                        onPress={() => {this.changeTab('loto')}}
                        style={styles.mainTabItem}
                    >
                        <View style={styles.mainTabItemView}>
                            <Text style={this.state.tab==='loto'?styles.mainTabItemTextActive:styles.mainTabItemText}>Truyện Audio</Text>
                        </View>
                    </TouchableOpacity>
                    {/*<TouchableOpacity
                        onPress={() => {this.changeTab('vietlott')}}
                        style={styles.mainTabItem}
                    >
                        <View style={styles.mainTabItemView}>
                            <Text style={this.state.tab==='vietlott'?styles.mainTabItemTextActive:styles.mainTabItemText}>Truyện Chữ</Text>
                        </View>
                    </TouchableOpacity>*/}
                </View>
                <Loto navigation={navigation}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LotoScreen);
