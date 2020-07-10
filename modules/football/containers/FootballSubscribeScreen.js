import React, {Fragment} from 'react';
import {
    Platform,
    ScrollView,
    TouchableOpacity,
    Text,
    View, ActivityIndicator, RefreshControl, FlatList
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/FootballSubscribeStyle';
import IconItem from "../../common/components/IconItem";
import {Colors, CONFIG} from "../../common/common.constants";
import { Coin } from "../../common/components/Coin";
import {callAPI} from "../../common/api/callAPI";
import moment from "moment";
import IconLoading from "../../common/components/IconLoading";
import {format_user_data} from "../../profile/profile.helpers";
import PopupExtra from "../../common/components/PopupExtra";
import FootballSuggestResult from "../components/FootballSuggestResult";
import {number_format} from "../../common/common.helpers";

class FootballSubscribeScreen extends React.Component {
    static navigationOptions = {
        title: 'Nhận TIP Bóng Đá'
    };
    state = {
        fetching: false,
        loading: false,
        pack: 0,
        alertObj: null,
        result_title: 'TIP Bóng đá',
        result_content: null,
        free_tips: [],
        today: moment().format('DD/MM/YYYY'),
        buy_package_1: true,
        buy_package_2: false,
        buy_package_3: false,
        tab: 'reg',
        fetching_history: false,
        histories: []
    };

    async componentWillMount() {
        await this.updateRegTab();
    }

    updateRegTab = async () => {
        if(this.state.fetching === false){
            this.setState({fetching: true});
            let result = await callAPI('football/tip', {
                package: 1,
                platform_type: Platform.OS,
                platform_version: Platform.Version
            });
            if(result.error === 0){
                this.setState({
                    fetching: false,
                    free_tips: result.data,
                    buy_package_1: true,
                    buy_package_2: parseInt(result.data.buy_pack_2)===1,
                    buy_package_3: parseInt(result.data.buy_pack_3)===1,
                });
            }else{
                this.setState({fetching: false, free_tips: []});
            }
        }
    };

    updateHistoryTab = async () => {
        if(this.state.fetching_history === false){
            this.setState({fetching_history: true});
            let result = await callAPI('football/tip-history', {});
            if(result.error === 0){
                this.setState({
                    fetching_history: false,
                    histories: result.data
                });
            }else{
                this.setState({fetching_history: false, histories: []});
            }
        }
    };

    submitFreeTip = async () => {
        return await this.submit(1);
    };

    submitSuperVip = async () => {
        return await this.submit(2);
    };


    submitSureWin = async () => {
        return await this.submit(3);
    };

    submit = async (pack) => {
        if(this.state.loading && this.state.pack === pack){
            return false;
        }
        let price = 0;
        let has_buy = false;
        if(pack === 1){
            price = 0;
            has_buy = true;
        }else if(pack === 2){
            price = CONFIG.football_super_vip_price;
            has_buy = this.state.buy_package_2;
        }else if(pack === 3){
            price = CONFIG.football_sure_win_price;
            has_buy = this.state.buy_package_3;
        }else{
            price = 0;
        }
        if(this.props.visitor.coin < price && has_buy === false){
            this.props.open_custom_modal("Thông báo", "Không đủ ngân lượng, vui lòng nạp thêm!", "Nạp thêm", "Charge", this.props.navigation);
            return false;
        }else{
            this.setState({loading: true, pack: pack}, async () => {
                let result = await callAPI('football/tip', {
                    package: this.state.pack,
                    platform_type: Platform.OS,
                    platform_version: Platform.Version
                });
                if(result.error === 0){
                    this.props.updateUserInfo(format_user_data(result.data.user, true));
                    this.showResult(result.data, has_buy);
                }else{
                    this.alert(result.message, "error", 3);
                }
                this.setState({loading: false, package: 0});
            });
        }
    };

    showResult = (data, has_buy) => {
        let result = this._renderPackageView(data, has_buy);
        this.setState({
            result_title: result.title,
            result_content: result.content,
            buy_package_1: true,
            buy_package_2: parseInt(data.buy_pack_2)===1,
            buy_package_3: parseInt(data.buy_pack_3)===1,
        }, () => {
            this.resultPopup.open();
        });
    };

    onCloseResult = () => {
        this.resultPopup.close();
    };


    alert = (message, type, second) => {
        if(this.state.alertObj !== null){
            clearTimeout(this.state.alertObj);
        }
        switch (type) {
            case 'loading':
                this.props.alert_loading(message);
                break;
            case 'error':
                this.props.alert_error(message);
                break;
            case 'success':
                this.props.alert_success(message);
                break;
            default:
                this.props.alert_info(message);
                break;
        }
        this.state.alertObj = setTimeout(() => {
            this.props.hide_alert();
        }, 1000*second);
    };

    changeTabReg = () => {
        this.setState({tab: 'reg'}, async () => {
            await this.updateRegTab();
        });
    };

    changeTabLog = () => {
        this.setState({tab: 'log'}, async () => {
            await this.updateHistoryTab();
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.footballTip}>
                    <View style={styles.footballTipHead}>
                        <View style={styles.footballTipHeadTab}>
                            <TouchableOpacity style={styles.footballTipHeadTabTouch} onPress={this.changeTabReg}>
                                <Text style={this.state.tab==='reg'?styles.footballTipRegistActive:styles.footballTipRegist}>TIP Bóng đá</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.footballTipHeadTab}>
                            <TouchableOpacity style={styles.footballTipHeadTabTouch} onPress={this.changeTabLog}>
                                <Text style={this.state.tab==='log'?styles.footballTipRegistActive:styles.footballTipRegist}>Lịch sử</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {(this.state.fetching === true || this.state.fetching_history === true) && (<ActivityIndicator size="large" style={{paddingVertical: 30}} />)}

                    {this.state.tab === 'reg' && this.state.fetching === false && (<ScrollView style={styles.containerScroll}>
                        <View style={styles.footballTipRegistForm}>
                            <View style={styles.footballTipItem}>
                                <View>
                                    <Text style={styles.footballTipItemTextBold}>FREE TIP</Text>
                                    <Text style={styles.footballTipItemTextSmall}>Chính xác 55%</Text>
                                </View>
                                <View style={styles.footballTipItemButton}>
                                    <TouchableOpacity style={styles.footballTipItemButtonTouch} onPress={this.submitFreeTip}>
                                        {this.state.loading && this.state.pack === 1?<IconLoading/>:(this.state.buy_package_1===true?(<Text style={styles.footballTipItemButtonText}>Xem</Text>):(<Fragment>
                                            <Text style={styles.footballTipItemButtonText}>0</Text>
                                            <Coin/>
                                        </Fragment>))}
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.footballTipItem}>
                                <View>
                                    <Text style={styles.footballTipItemTextBold}>SUPER VIP</Text>
                                    <Text style={styles.footballTipItemTextSmall}>Chính xác tới 90%</Text>
                                </View>
                                <View style={styles.footballTipItemButton}>
                                    <TouchableOpacity style={styles.footballTipItemButtonTouch} onPress={this.submitSuperVip}>
                                        {this.state.loading && this.state.pack === 2?<IconLoading/>:(this.state.buy_package_2===true?(<Text style={styles.footballTipItemButtonText}>Xem</Text>):(<Fragment>
                                            <Text style={styles.footballTipItemButtonText}>{CONFIG.football_super_vip_price_formatted}</Text>
                                            <Coin/>
                                        </Fragment>))}
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.footballTipItem}>
                                <View>
                                    <Text style={styles.footballTipItemTextBold}>SURE WIN</Text>
                                    <Text style={styles.footballTipItemTextSmall}>Chính xác tới 95%</Text>
                                </View>
                                <View style={styles.footballTipItemButton}>
                                    <TouchableOpacity style={styles.footballTipItemButtonTouch} onPress={this.submitSureWin}>
                                        {this.state.loading && this.state.pack === 3?<IconLoading/>:(this.state.buy_package_3===true?(<Text style={styles.footballTipItemButtonText}>Xem</Text>):(<Fragment>
                                            <Text style={styles.footballTipItemButtonText}>{CONFIG.football_sure_win_price_formatted}</Text>
                                            <Coin/>
                                        </Fragment>))}
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.footballTipNoticeHead}>
                                <IconItem style={styles.footballTipNoticeHeadIcon} name={`help-circle${Platform.OS==='ios'?'-outline':''}`} color={Colors.tintColor}/>
                                <Text style={styles.footballTipNoticeHeadText}>Tip hướng dẫn</Text>
                            </View>
                            <View style={styles.footballTipNoticeHighlight}>
                                <Text style={styles.footballTipNoticeHighlightText}>
                                    KHÔNG TRÚNG HOÀN LẠI 100% NGÂN LƯỢNG
                                </Text>
                            </View>
                            <View style={styles.footballTipNoticeExtra}>
                                <Text style={styles.footballTipNoticeExtraText}>
                                    Thông tin tham khảo từ nguồn cực kì uy tín
                                </Text>
                            </View>
                        </View>
                    </ScrollView>)}
                    {this.state.tab === 'log' && this.state.fetching_history === false && (<FlatList
                        style={styles.listFootballTipLog}
                        data={this.state.histories}
                        keyExtractor={(item, index) => item.id}
                        initialNumToRender={10}
                        renderItem={this._renderLogItem}
                    />)}
                </View>

                <PopupExtra ref={popup => this.resultPopup = popup} title={this.state.result_title}>
                    <FootballSuggestResult onClose={this.onCloseResult} content={this.state.result_content} />
                </PopupExtra>
            </View>
        );
    }

    _renderLogItem = ({item}) => {
        if(parseInt(item.pack) === 2 || parseInt(item.pack) === 3){
            item.price_formatted = number_format(item.price,0,',','.');
            let result = this._renderPackageView(item, false);
            return (<View style={styles.logItem} key={item.id}>
                <Text style={styles.logItemTitle}>{result.title}</Text>
                <IconItem type={`mc`} name={`check-circle`} color={Colors.tintColor}  style={styles.logItemIcon} size={26} />
                {result.content}
            </View>);
        }
    };

    _renderPackageView = (data, hide_coin) => {
        let result_title = "";
        let result_content = null;
        if(parseInt(data.pack) === 1){
            result_title = "TIP FREE";
            result_content = data.tip.map((item, index) => {
                return (<View key={item.home}><View style={index===data.tip.length-1 && hide_coin === true?{}:styles.resultItem}>
                    <View style={styles.resultRow}><Text style={styles.textGray}>{item.time}</Text></View>
                    <View style={styles.resultRow}><Text>{item.home} - {item.away}</Text></View>
                    <View style={styles.resultRow}><Text>Dự đoán tỉ số: <Text style={styles.textHighlight}>{item.ft}</Text></Text></View>
                    <View style={styles.resultRow}><Text>{item.taixiu}: <Text style={styles.textHighlight}>{item.num}</Text></Text></View>
                </View>
                {index === data.tip.length-1 && hide_coin === false?<View style={styles.resultRow}><Text>Bạn đã tiêu: <Text style={styles.textHighlight}>{data.price_formatted}</Text></Text><Coin/></View>:null}
                </View>)
            });
        }else if(parseInt(data.pack) === 2){
            result_title = "TIP SUPER VIP";
            result_content = data.tip.map((item, index) => {
                return (<View key={item.home}><View style={index===data.tip.length-1 && hide_coin === true?{}:styles.resultItem}>
                    <View style={styles.resultRow}><Text style={styles.textGray}>{item.time}</Text></View>
                    <View style={styles.resultRow}><Text>{item.home} - {item.away}</Text></View>
                    <View style={styles.resultRow}><Text>Dự đoán tỉ số: <Text style={styles.textHighlight}>{item.ft}</Text></Text></View>
                    <View style={styles.resultRow}><Text>{item.taixiu}: <Text style={styles.textHighlight}>{item.num}</Text></Text></View>
                </View>
                {index === data.tip.length-1 && hide_coin === false?<View style={styles.resultRow}><Text>Bạn đã tiêu: <Text style={styles.textHighlight}>{data.price_formatted}</Text></Text><Coin/></View>:null}
                </View>)
            });
        }else{
            result_title = "TIP SURE WIN";
            result_content = data.tip.map((item, index) => {
                return (<View key={item.home}><View style={index===data.tip.length-1 && hide_coin === true?{}:styles.resultItem}>
                    <View style={styles.resultRow}><Text style={styles.textGray}>{item.time}</Text></View>
                    <View style={styles.resultRow}><Text>{item.home} - {item.away}</Text></View>
                    <View style={styles.resultRow}><Text>Dự đoán tỉ số: <Text style={styles.textHighlight}>{item.ft}</Text></Text></View>
                    <View style={styles.resultRow}><Text>{item.taixiu}: <Text style={styles.textHighlight}>{item.num}</Text></Text></View>
                </View>
                {index === data.tip.length-1 && hide_coin === false?<View style={styles.resultRow}><Text>Bạn đã tiêu: <Text style={styles.textHighlight}>{data.price_formatted}</Text></Text><Coin/></View>:null}
                </View>)
            });
        }

        return {
            title: result_title,
            content: result_content
        };
    };
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

export default connect(mapStateToProps, mapDispatchToProps)(FootballSubscribeScreen);
