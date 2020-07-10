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
import styles from '../styles/LotoSubscribeStyle';
import IconItem from "../../common/components/IconItem";
import {Colors, CONFIG} from "../../common/common.constants";
import ModalExtra from "../../common/components/ModalExtra";
import RegionSelectModal from "../../common/components/RegionSelectModal";
import { Coin } from "../../common/components/Coin";
import {callAPI} from "../../common/api/callAPI";
import moment from "moment";
import {ACCOUNT_NORMAL} from "../../profile/profile.constants";
import IconLoading from "../../common/components/IconLoading";
import {format_user_data} from "../../profile/profile.helpers";
import PopupExtra from "../../common/components/PopupExtra";
import LotoSuggestResult from "../components/LotoSuggestResult";
import {number_format} from "../../common/common.helpers";

class LotoSubscribeScreen extends React.Component {
    static navigationOptions = {
        title: 'Nhận số VIP'
    };
    state = {
        fetching: false,
        loading: false,
        pack: 0,
        alertObj: null,
        regionID: 'tt',
        regionTitle: 'Truyền thống',
        result_title: 'Cặp số may mắn',
        result_content: null,
        lucky: [],
        today: moment().format('DD/MM/YYYY'),
        buy_package_1: false,
        buy_package_2: false,
        buy_package_3: false,
        tab: 'reg',
        fetching_history: false,
        histories: [],
        provinces: []
    };

    async componentWillMount() {
        await this.updateRegTab(true);
    }

    updateRegTab = async (include_province) => {
        if(this.state.fetching === false){
            this.setState({fetching: true});
            let result = await callAPI('loto/lucky', {region_code: this.state.regionID, include_province: include_province===true?1:0});
            if(result.error === 0){
                this.setState({
                    fetching: false,
                    lucky: result.data.lucky_number,
                    buy_package_1: parseInt(result.data.buy_pack_1)===1,
                    buy_package_2: parseInt(result.data.buy_pack_2)===1,
                    buy_package_3: parseInt(result.data.buy_pack_3)===1,
                });
                if(include_province===true){
                    this.setState({provinces: result.data.provinces});
                }
            }else{
                this.setState({fetching: false, lucky: []});
            }
        }
    };

    updateHistoryTab = async () => {
        if(this.state.fetching_history === false){
            this.setState({fetching_history: true});
            let result = await callAPI('loto/suggest-history', {});
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

    onChangeRegion = (e) => {
        this.setState({
            regionID: e.code,
            regionTitle: e.title
        }, async () => {
            let result = await callAPI('loto/check-buy-tip',{
                region_code: e.code
            });
            if(result.error === 0){
                this.setState({
                    buy_package_1: result.data.pack_1,
                    buy_package_2: result.data.pack_2,
                    buy_package_3: result.data.pack_3
                });
            }else{
                console.error("Can not update buy status");
            }
        });
        this.regionModal.close();
    };

    submitSongThuVIP = async () => {
        return await this.submit(1);
    };


    submitSongThuSieuVIP = async () => {
        return await this.submit(2);
    };

    submitDacBiet = async () => {
        return await this.submit(3);
    };

    submit = async (pack) => {
        if(this.state.loading && this.state.pack === pack){
            return false;
        }
        let price = 0;
        let has_buy = false;
        if(pack === 1){
            price = CONFIG.song_thu_vip_price;
            has_buy = this.state.buy_package_1;
        }else if(pack === 2){
            price = CONFIG.song_thu_sieu_vip_price;
            has_buy = this.state.buy_package_2;
        }else if(pack === 3){
            price = CONFIG.dau_duoi_dac_biet_price;
            has_buy = this.state.buy_package_3;
        }else{
            price = 0;
        }
        if(this.props.visitor.type === ACCOUNT_NORMAL && this.props.visitor.coin < price && has_buy === false){
            this.props.open_custom_modal("Thông báo", "Không đủ ngân lượng, vui lòng nạp thêm!", "Nạp thêm", "Charge", this.props.navigation);
            return false;
        }else{
            if(this.props.visitor.type !== ACCOUNT_NORMAL && pack === 1){
                has_buy = true;
            }
            this.setState({loading: true, pack: pack}, async () => {
                let result = await callAPI('loto/suggest', {
                    region_code: this.state.regionID,
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
            buy_package_1: parseInt(data.buy_pack_1)===1,
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
                    <View style={styles.lottoTip}>
                        <View style={styles.lottoTipHead}>
                            <View style={styles.lottoTipHeadTab}>
                                <TouchableOpacity style={styles.lottoTipHeadTabTouch} onPress={this.changeTabReg}>
                                    <Text style={this.state.tab==='reg'?styles.lottoTipRegistActive:styles.lottoTipRegist}>Tư vấn số</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.lottoTipHeadTab}>
                                <TouchableOpacity style={styles.lottoTipHeadTabTouch} onPress={this.changeTabLog}>
                                    <Text style={this.state.tab==='log'?styles.lottoTipRegistActive:styles.lottoTipRegist}>Lịch sử</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {(this.state.fetching === true || this.state.fetching_history === true) && (<ActivityIndicator size="large" style={{paddingVertical: 30}} />)}

                        {this.state.tab === 'reg' && this.state.fetching === false && (<ScrollView style={styles.containerScroll}>
                            {this.state.lucky.length > 0 && (<Fragment>
                                <Text style={styles.lottoTipLuckyNumber}>Cặp số may mắn hôm nay</Text>
                                <View style={styles.lottoTipLuckyList}>
                                    {this.state.lucky.map((item) => {
                                        return (<View style={styles.lottoTipLuckyItem} key={item}>
                                            <Text style={styles.lottoTipLuckyText}>{item}</Text>
                                        </View>);
                                    })}
                                </View>
                            </Fragment>)}
                            <View style={styles.lottoTipDivider} />
                            <View style={styles.lottoTipRegistForm}>
                                <View style={styles.lottoTipDate}>
                                    <Text style={styles.lottoTipDateText}>Ngày {this.state.today}</Text>
                                </View>
                                <TouchableOpacity style={styles.lottoTipRegion} onPress={() => this.regionModal.open()}>
                                    <Text style={styles.lottoTipRegionValue}>{this.state.regionTitle}</Text>
                                    <IconItem name={`arrow-down`} />
                                </TouchableOpacity>
                                <View style={styles.lottoTipItem}>
                                    <Text style={styles.lottoTipItemText}>Song thủ, bạch thủ VIP</Text>
                                    <View style={styles.lottoTipItemButton}>
                                        <TouchableOpacity style={styles.lottoTipItemButtonTouch} onPress={this.submitSongThuVIP}>
                                            {this.state.loading && this.state.pack === 1?<IconLoading/>:(this.props.visitor.type !== ACCOUNT_NORMAL || this.state.buy_package_1===true ?(<Text style={styles.lottoTipItemButtonText}>Xem</Text>):(<Fragment>
                                                <Text style={styles.lottoTipItemButtonText}>{CONFIG.song_thu_vip_price_formatted}</Text>
                                                <Coin/>
                                            </Fragment>))}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.lottoTipItem}>
                                    <Text style={styles.lottoTipItemText}>Song thủ, bạch thủ SIÊU VIP</Text>
                                    <View style={styles.lottoTipItemButton}>
                                        <TouchableOpacity style={styles.lottoTipItemButtonTouch} onPress={this.submitSongThuSieuVIP}>
                                            {this.state.loading && this.state.pack === 2?<IconLoading/>:(this.state.buy_package_2===true?(<Text style={styles.lottoTipItemButtonText}>Xem</Text>):(<Fragment>
                                                <Text style={styles.lottoTipItemButtonText}>{CONFIG.song_thu_sieu_vip_price_formatted}</Text>
                                                <Coin/>
                                            </Fragment>))}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.lottoTipItem}>
                                    <Text style={styles.lottoTipItemText}>Đầu đuôi giải Đặc Biệt</Text>
                                    <View style={styles.lottoTipItemButton}>
                                        <TouchableOpacity style={styles.lottoTipItemButtonTouch} onPress={this.submitDacBiet}>
                                            {this.state.loading && this.state.pack === 3?<IconLoading/>:(this.state.buy_package_3===true?(<Text style={styles.lottoTipItemButtonText}>Xem</Text>):(<Fragment>
                                                <Text style={styles.lottoTipItemButtonText}>{CONFIG.dau_duoi_dac_biet_price_formatted}</Text>
                                                <Coin/>
                                            </Fragment>))}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.lottoTipNoticeHead}>
                                    <IconItem style={styles.lottoTipNoticeHeadIcon} name={`help-circle${Platform.OS==='ios'?'-outline':''}`} color={Colors.tintColor}/>
                                    <Text style={styles.lottoTipNoticeHeadText}>Tip hướng dẫn</Text>
                                </View>
                                <View style={styles.lottoTipNoticeHighlight}>
                                    <Text style={styles.lottoTipNoticeHighlightText}>
                                        KHÔNG TRÚNG HOÀN LẠI 100% NGÂN LƯỢNG
                                    </Text>
                                </View>
                                <View style={styles.lottoTipNoticeExtra}>
                                    <Text style={styles.lottoTipNoticeExtraText}>
                                        Đối với user VIP, cam kết cộng thêm 01 ngày VIP nếu không trúng
                                        bất kỳ bộ số Song thủ, Bạch thủ VIP nào trong ngày
                                    </Text>
                                </View>
                            </View>
                        </ScrollView>)}
                        {this.state.tab === 'log' && this.state.fetching_history === false && (<FlatList
                            style={styles.listLotoTipLog}
                            data={this.state.histories}
                            keyExtractor={(item, index) => item.id}
                            initialNumToRender={10}
                            renderItem={this._renderLogItem}
                        />)}
                    </View>
                    <ModalExtra ref={modal => this.regionModal = modal} title={"Chọn vùng miền"}>
                        <RegionSelectModal onChange={(region) => this.onChangeRegion(region)} data={this.state.provinces}/>
                    </ModalExtra>

                <PopupExtra ref={popup => this.resultPopup = popup} title={this.state.result_title}>
                    <LotoSuggestResult onClose={this.onCloseResult} content={this.state.result_content} />
                </PopupExtra>
            </View>
        );
    }

    _renderLogItem = ({item}) => {
        item.price_formatted = number_format(item.price,0,',','.');
        let result = this._renderPackageView(item);
        return (<View style={styles.logItem} key={item.id}>
            <Text style={styles.logItemTitle}>{result.title}</Text>
            <IconItem type={`mc`} name={`check-circle`} color={Colors.tintColor}  style={styles.logItemIcon} size={26} />
            {result.content}
        </View>);
    };

    _renderPackageView = (data, hide_coin) => {
        let result_title = "";
        let result_content = null;
        if(parseInt(data.pack) === 1){
            result_title = "Song thủ, Bạch thủ VIP";
            result_content = (<View>
                <View style={styles.resultRow}><Text>{data.tip_date} | Xổ số {data.region_title}</Text></View>
                <View style={styles.resultRow}><Text>Song thủ VIP: <Text style={styles.textHighlight}>{data.num_1}, {data.num_2}</Text></Text></View>
                <View style={styles.resultRow}><Text>Bạch thủ VIP: <Text style={styles.textHighlight}>{data.num_3}</Text></Text></View>
                {hide_coin === true && parseInt(data.buy_pack_1)===1?null:<View style={styles.resultRow}><Text>Bạn đã tiêu: <Text style={styles.textHighlight}>{data.price_formatted}</Text></Text><Coin/></View>}
            </View>);
        }else if(parseInt(data.pack) === 2){
            result_title = "Song thủ, Bạch thủ Siêu VIP";
            result_content = (<View>
                <View style={styles.resultRow}><Text>{data.tip_date} | Xổ số {data.region_title}</Text></View>
                <View style={styles.resultRow}><Text>Song thủ Siêu VIP: <Text style={styles.textHighlight}>{data.num_1}, {data.num_2}</Text></Text></View>
                <View style={styles.resultRow}><Text>Bạch thủ Siêu VIP: <Text style={styles.textHighlight}>{data.num_3}</Text></Text></View>
                {hide_coin === true && parseInt(data.buy_pack_2)===1?null:<View style={styles.resultRow}><Text>Bạn đã tiêu: <Text style={styles.textHighlight}>{data.price_formatted}</Text></Text><Coin/></View>}
            </View>);
        }else{
            result_title = "Đầu đuôi giải Đặc Biệt";
            result_content = (<View>
                <View style={styles.resultRow}><Text>{data.tip_date} | Xổ số {data.region_title}</Text></View>
                <View style={styles.resultRow}><Text>Đầu: <Text style={styles.textHighlight}>{data.num_1}</Text></Text></View>
                <View style={styles.resultRow}><Text>Đuôi: <Text style={styles.textHighlight}>{data.num_2}</Text></Text></View>
                {hide_coin === true && parseInt(data.buy_pack_3)===1?null:<View style={styles.resultRow}><Text>Bạn đã tiêu: <Text style={styles.textHighlight}>{data.price_formatted}</Text></Text><Coin/></View>}
            </View>);
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

export default connect(mapStateToProps, mapDispatchToProps)(LotoSubscribeScreen);
