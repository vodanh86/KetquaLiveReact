import React from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Switch,
    AsyncStorage
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/SettingStyle';
import {Colors, CONFIG} from "../../common/common.constants";
import {logoutClicked} from "../profile.actions";

class SettingScreen extends React.Component {

    static navigationOptions = {
        title: 'Cài đặt'
    };

    state = {
        live: true,
        xsmb: true,
        xsmt: true,
        xsmn: true,
        mega: true,
        max: true,
        chat: true,
        football: true,
    };

    changeSetting = async (key, val) => {
        if(key === 'live'){
            this.setState({live: val}, this.updateStorage);
        }else if(key === 'xsmb'){
            this.setState({xsmb: val}, this.updateStorage);
        }else if(key === 'xsmt'){
            this.setState({xsmt: val}, this.updateStorage);
        }else if(key === 'xsmn'){
            this.setState({xsmn: val}, this.updateStorage);
        }else if(key === 'mega'){
            this.setState({mega: val}, this.updateStorage);
        }else if(key === 'max'){
            this.setState({max: val}, this.updateStorage);
        }else if(key === 'chat'){
            this.setState({chat: val}, this.updateStorage);
        }else if(key === 'football'){
            this.setState({football: val}, this.updateStorage);
        }else{
            console.warn('Unknown option: '+ key);
        }
    };

    updateStorage = async () => {
        //TODO save setting
        await AsyncStorage.setItem('notificationSettings', JSON.stringify(this.state));
    };

    async componentWillMount() {
        let notificationSettings = await AsyncStorage.getItem('notificationSettings', () => {});
        if(notificationSettings !== null && notificationSettings !== ""){
            notificationSettings = JSON.parse(notificationSettings);
        }else{
            notificationSettings = {
                live: true,
                xsmb: true,
                xsmt: true,
                xsmn: true,
                mega: true,
                max: true,
                chat: true,
                football: true
            };
        }
        this.setState(notificationSettings);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                    <View style={styles.item}>
                        <Text style={styles.label}>Nhận thông báo XSMB</Text>
                        <Switch onValueChange={(val) => this.changeSetting('xsmb', val)} value={this.state.xsmb}/>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>Nhận thông báo XSMT</Text>
                        <Switch onValueChange={(val) => this.changeSetting('xsmt', val)} value={this.state.xsmt}/>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>Nhận thông báo XSMN</Text>
                        <Switch onValueChange={(val) => this.changeSetting('xsmn', val)} value={this.state.xsmn}/>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>Nhận thông báo Mega 6/45</Text>
                        <Switch onValueChange={(val) => this.changeSetting('mega', val)} value={this.state.mega}/>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>Nhận thông báo Max 4D</Text>
                        <Switch onValueChange={(val) => this.changeSetting('max', val)} value={this.state.max}/>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>Trận đấu yêu thích</Text>
                        <Switch onValueChange={(val) => this.changeSetting('football', val)} value={this.state.football}/>
                    </View>
                    <View style={styles.logout}>
                        <TouchableOpacity style={styles.logoutTouch} onPress={() => this.props.logout(this.props.navigation)}>
                            <Text style={styles.logoutText}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomInfo}>
                        <View style={styles.chargeNoticeHead}>
                            <Text style={styles.chargeNoticeHeadText}>CSKH: </Text>
                            <Text style={styles.sab01e43a}>{CONFIG.hotline}</Text>
                        </View>
                        <View style={styles.chargeNoticeTime}>
                            <Text style={styles.chargeNoticeTimeText}>({CONFIG.support_time})</Text>
                        </View>
                    </View>
            </ScrollView>
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
        ...getAppPropMap(dispatch),
        logout: (navigator) => {
            dispatch(logoutClicked(navigator))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
