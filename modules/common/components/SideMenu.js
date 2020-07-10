import React from "react";
import {ScrollView, Platform, SafeAreaView, View } from "react-native";
import MenuUserCard from "../../profile/components/MenuUserCard";
import SideMenuItem from "./SideMenuItem";
import {connect} from 'react-redux';
import {getAppPropMap, getAppStateMap} from "../common.map";
import {CONFIG, window} from "../common.constants";

class SideMenu extends React.Component {
    render() {
        return <SafeAreaView>
            <MenuUserCard />
            <View style={{height: window.height - 270}}>
                <ScrollView>
                    <SideMenuItem href="Home" title="Trang chủ" icon={Platform.OS === "ios" ?"ios-home-outline":"md-home"}/>
                    <SideMenuItem href="Profile" title="Tài khoản" icon={Platform.OS === "ios" ?"ios-person-outline":"md-person"}/>
                    {/*<SideMenuItem href="Ranking" title="Bảng xếp hạng" icon={Platform.OS === "ios" ?"ios-trophy-outline":"md-trophy"}/>*/}
                    <SideMenuItem href="Charge" title="Nạp ngân lượng" icon={Platform.OS === "ios" ?"ios-card-outline":"md-card"}/>
                    <SideMenuItem href="Upgrade" title="Mua VIP" icon={Platform.OS === "ios" ?"ios-ribbon-outline":"md-ribbon"}/>
                    <SideMenuItem href="Setting" title="Cài đặt" icon={Platform.OS === "ios" ?"ios-settings-outline":"md-settings"}/>
                    <SideMenuItem href="Guideline" title="Hướng dẫn sử dụng" icon={Platform.OS === "ios" ?"ios-help-circle-outline":"md-help-circle"}/>
                    <SideMenuItem href="Feedback" title="Gửi phản hồi" icon={Platform.OS === "ios" ?"ios-paper-plane-outline":"md-paper-plane"}/>
                    <SideMenuItem href="Fanpage" title="Fanpage" icon={Platform.OS === "ios" ?"ios-thumbs-up-outline":"md-thumbs-up"}/>
                    <SideMenuItem href={`tel:${CONFIG.hotline}`} title={`Hotline: ${CONFIG.hotline}`} icon={Platform.OS === "ios" ?"ios-call-outline":"md-call"}/>
                    <SideMenuItem href="" title={`Version: ${CONFIG.version}`} icon={Platform.OS === "ios" ?"ios-quote-outline":"md-quote"}/>
                </ScrollView>
            </View>
        </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);