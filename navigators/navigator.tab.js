import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../modules/common/components/TabBarIcon';
import HomeScreen from '../modules/common/containers/HomeScreen';
import {Colors} from "../modules/common/common.constants";
import LotoScreen from "../modules/loto/containers/LotoScreen";
import FootballScreen from "../modules/football/containers/FootballScreen";
import AudioScreen from "../modules/audio/containers/AudioScreen";
import ReportScreen from "../modules/report/containers/ReportScreen";
import GameScreen from "../modules/game/containers/GameScreen";
import NotificationScreen from "../modules/common/containers/NotificationScreen";
import ProfileScreen from "../modules/profile/containers/ProfileScreen";
import BackButton from "../modules/common/components/BackButton";
import RankingScreen from "../modules/common/containers/RankingScreen";
import PremiumBenefitScreen from "../modules/profile/containers/PremiumBenefitScreen";
import LotoSubscribeScreen from "../modules/loto/containers/LotoSubscribeScreen";
import FootballSubscribeScreen from "../modules/football/containers/FootballSubscribeScreen";
import ChargeScreen from "../modules/common/containers/ChargeScreen";
import BuyVipScreen from "../modules/profile/containers/BuyVipScreen";
import BuySuperVipScreen from "../modules/profile/containers/BuySuperVipScreen";
import SettingScreen from "../modules/profile/containers/SettingScreen";
import HelpScreen from "../modules/common/containers/HelpScreen";
import FeedbackScreen from "../modules/common/containers/FeedbackScreen";
import LogoutScreen from "../modules/common/containers/LogoutScreen";
import FanpageScreen from "../modules/common/containers/FanpageScreen";
import ThongKeTanSuatScreen from "../modules/report/containers/ThongKeTanSuatScreen";
import ThongKeVeNhieuVeItScreen from "../modules/report/containers/ThongKeVeNhieuVeItScreen";
import ThongKeTongSoScreen from "../modules/report/containers/ThongKeTongSoScreen";
import ThongKeTongSoResultScreen from "../modules/report/containers/ThongKeTongSoResultScreen";
import SoiCauScreen from "../modules/report/containers/SoiCauScreen";
import ChapterScreen from "../modules/audio/containers/ChapterScreen"
import SoiCauListScreen from "../modules/report/containers/SoiCauListScreen";
import SoiCauDetailScreen from "../modules/report/containers/SoiCauDetailScreen";
import ThongKeLoGanScreen from "../modules/report/containers/ThongKeLoGanScreen";
import ThongKeLoRoiScreen from "../modules/report/containers/ThongKeLoRoiScreen";
import ThongKeGiaiDacBietScreen from "../modules/report/containers/ThongKeGiaiDacBietScreen";
import ThongKeGiaiDacBietResultScreen from "../modules/report/containers/ThongKeGiaiDacBietResultScreen";
import PublicProfileScreen from "../modules/profile/containers/PublicProfileScreen";
import FollowersScreen from "../modules/profile/containers/FollowersScreen";
import FollowingScreen from "../modules/profile/containers/FollowingScreen";
import ViewVideoScreen from "../modules/livestream/containers/ViewVideoScreen";
import LeagueScreen from "../modules/football/containers/LeagueScreen";
import FixtureScreen from "../modules/football/containers/FixtureScreen";
import ThongKeVeItVeNhieuResultScreen from "../modules/report/containers/ThongKeVeItVeNhieuResultScreen";
import PlayerScreen from "../modules/audio/containers/PlayerScreen"
// default options
const defaultNavigationOptions = {
    headerTintColor: Colors.tintTextColor,
    headerStyle: {
        backgroundColor: Colors.tintColor
    },
    headerLeft:
        <BackButton/>
};

const commonScreens = {
    Profile: ProfileScreen,
    Followers: FollowersScreen,
    Following: FollowingScreen,
    Notification: NotificationScreen,
    Ranking: RankingScreen,
    Charge: ChargeScreen,
    Upgrade: BuyVipScreen,
    UpgradeSuper: BuySuperVipScreen,
    Setting: SettingScreen,
    Guideline: HelpScreen,
    Feedback: FeedbackScreen,
    Logout: LogoutScreen,
    Fanpage: FanpageScreen,
    Hotline: RankingScreen,
    Changelog: RankingScreen,
    FootballSubscribe: FootballSubscribeScreen,
    LotoSubscribe: LotoSubscribeScreen,
    PremiumBenefit: PremiumBenefitScreen,
    SoiCau: SoiCauScreen,
    Chapter: ChapterScreen,
    SoiCauList: SoiCauListScreen,
    SoiCauDetail: SoiCauDetailScreen,
    ThongKeTanSuat: ThongKeTanSuatScreen,
    ThongKeVeNhieuVeIt: ThongKeVeNhieuVeItScreen,
    ThongKeNhieuItResult: ThongKeVeItVeNhieuResultScreen,
    ThongKeTongSo: ThongKeTongSoScreen,
    ThongKeTongSoResult: ThongKeTongSoResultScreen,
    ThongKeLoGan: ThongKeLoGanScreen,
    ThongKeLoRoi: ThongKeLoRoiScreen,
    ThongKeGiaiDacBiet: ThongKeGiaiDacBietScreen,
    ThongKeGiaiDacBietResult: ThongKeGiaiDacBietResultScreen,
    PublicProfile: PublicProfileScreen,
    videoDetail: ViewVideoScreen,
    League: LeagueScreen,
    Fixture: FixtureScreen,
    Player: PlayerScreen
};

// Trang chủ
const HomeStack = createStackNavigator({
    Home: HomeScreen,
    ...commonScreens
},{
    defaultNavigationOptions: defaultNavigationOptions
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Trang chủ',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-home${focused ? '' : ''}`
                    : 'md-home'
            }
        />
    ),
};

// Xổ số
const LotoStack = createStackNavigator({
    Loto: LotoScreen,
    ...commonScreens
},{
    defaultNavigationOptions: defaultNavigationOptions
});

LotoStack.navigationOptions = {
    tabBarLabel: 'Xổ số',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-globe${focused ? '' : ''}`
                    : 'md-globe'
            }
        />
    ),
};

// Đọc truyện
const AudioStack = createStackNavigator({
    Audio: AudioScreen,
    ...commonScreens
},{
    defaultNavigationOptions: defaultNavigationOptions
});

AudioStack.navigationOptions = {
    tabBarLabel: 'Đọc truyện',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-book${focused ? '' : ''}`
                    : 'md-book'
            }
        />
    ),
};

// Bóng đá
const FootballStack = createStackNavigator({
    Football: FootballScreen,
    ...commonScreens
},{
    defaultNavigationOptions: defaultNavigationOptions
});

FootballStack.navigationOptions = {
    tabBarLabel: 'Bóng đá',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-football${focused ? '' : ''}`
                    : 'md-football'
            }
        />
    ),
};

// Thống kê
const ReportStack = createStackNavigator({
    Report: ReportScreen,
    ...commonScreens
},{
    defaultNavigationOptions: defaultNavigationOptions
});

ReportStack.navigationOptions = {
    tabBarLabel: 'Thống kê',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-podium${focused ? '' : ''}`
                    : 'md-podium'
            }
        />
    ),
};


// Giải trí
const GameStack = createStackNavigator({
    Game: GameScreen,
    ...commonScreens
},{
    defaultNavigationOptions: defaultNavigationOptions
});

GameStack.navigationOptions = {
    tabBarLabel: 'Chém gió',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-chatboxes${focused ? '' : '-outline'}`
                    : 'md-chatboxes'
            }
        />
    ),
};

const BottomMenu = createBottomTabNavigator({
        HomeStack,
        LotoStack,
        AudioStack,
        FootballStack,
        ReportStack
    },
    {
        tabBarOptions: {
            activeTintColor: Colors.tintColor
        }
    });

export default BottomMenu;