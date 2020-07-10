import React, {Fragment} from 'react';
import {
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/LotoStyle';
import MenuLeftButton from '../../../modules/common/components/MenuLeftButton';
import MenuNotifyButton from '../../../modules/common/components/MenuNotifyButton';
import Vietlott from "../components/Vietlott";
import Loto from "../components/Loto";

class LotoScreen extends React.Component {
    static navigationOptions = {
        title: 'Xổ số',
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
        return (
            <View style={styles.container}>
                <View style={styles.mainTab}>
                    <TouchableOpacity
                        onPress={() => {this.changeTab('loto')}}
                        style={styles.mainTabItem}
                    >
                        <View style={styles.mainTabItemView}>
                            <Text style={this.state.tab==='loto'?styles.mainTabItemTextActive:styles.mainTabItemText}>Truyền thống</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {this.changeTab('vietlott')}}
                        style={styles.mainTabItem}
                    >
                        <View style={styles.mainTabItemView}>
                            <Text style={this.state.tab==='vietlott'?styles.mainTabItemTextActive:styles.mainTabItemText}>Vietlott</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.state.tab === 'loto' && <Loto />}
                {this.state.tab === 'vietlott' && <Vietlott />}
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
