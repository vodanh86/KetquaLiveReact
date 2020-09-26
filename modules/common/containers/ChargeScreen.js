import React from 'react';
import {
    ScrollView,
    Text,
    View,
    Image,
    TouchableWithoutFeedback, AsyncStorage,
    Linking
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../common.map";
import {connect} from 'react-redux';
import styles from '../styles/ChargeStyle';

import vinaphoneLogo from "../../../assets/images/branch/vinaphone.png";
import mobifoneLogo from "../../../assets/images/branch/mobifone.png";
import viettelLogo from "../../../assets/images/branch/viettel.png";
import IconItem from "../components/IconItem";
import {Colors, CONFIG} from "../common.constants";
import PopupExtra from "../components/PopupExtra";
import ModalExtra from "../components/ModalExtra";
import ChargePopup from "../components/ChargePopup";
import PriceSelectModal from "../components/PriceSelectModal";
import { Coin } from '../components/Coin';
import {callAPI} from "../api/callAPI";
import {format_user_data} from "../../profile/profile.helpers";
import Alert from "../components/Alert";

class ChargeScreen extends React.Component {
    static navigationOptions = {
        title: 'Nạp ngân lượng'
    };

    state = {
        cardType: '',
        message: '',
        info: ''
    };

    async componentDidMount() {
        let info = await callAPI('user/info');
        this.setState({info:info.data})
    }

    openChargePopup = (type) => {
        this.setState({cardType: type});
        this.chargePopup.open();
    };

    checkChargeStatus = async (code) => {
        this.chargePopup.close();
        this.setState({message: "Vui lòng không tắt cửa sổ này..."});
        this.alertPopup.open();
        let result = await callAPI('user/check-card-status', {
            code: code
        });
        if(result.error === 0){
            if(result.data.user_id > 0){
                await AsyncStorage.removeItem('charge_code');
                this.props.open_custom_modal("Thành công", result.message, "OK", "", this.props.navigation);
                this.alertPopup.close();
                this.props.updateUserInfo(format_user_data(result.data, true));
            }else{
                this.setState({message: result.message});
                setTimeout(async () => {
                    await this.checkChargeStatus(code);
                }, 5000);
            }
        }else{
            await AsyncStorage.removeItem('charge_code');
            this.alertPopup.close();
            this.props.open_custom_modal("Thát bại", result.message, "OK", "", this.props.navigation);
        }
    };

    submitCharge = async (serial, num, price) => {
        if(this.chargePopupInner.state.loading === false){
            this.chargePopupInner.setState({loading: true});
            let result = await callAPI('user/charge', {
                telcoId: this.state.cardType,
                card_number: num,
                card_serial: serial,
                card_value: price
            });
            if(result.error === 0){
                // save code to storage
                await AsyncStorage.setItem('charge_code', result.data.code);
                // check code
                this.checkChargeStatus(result.data.code);
            }else{
                this.props.open_custom_modal("Thát bại", "Nạp thẻ thất bại, kiểm tra lại thông tin!", "OK", "", this.props.navigation);
                this.chargePopupInner.setState({loading: false});
            }
        }else{
            alert("Đang xử lý, vui lòng đợi!");
        }
    };

    onChangePrice = (price) => {
        this.chargePopupInner.onChangePrice(price);
        this.priceModal.close();
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

    async UNSAFE_componentWillMount () {
        let charge_code = await AsyncStorage.getItem('charge_code');
        if(charge_code != null){
            await this.checkChargeStatus(charge_code);
        }
    }

    render() {
        if(this.props.pay === false){
            return (<View style={styles.container}><View style={styles.chargeHead}>
                <Text>Liên hệ trực tiếp với chúng tôi theo số Hotline để được hỗ trợ!</Text>
            </View></View>);
        }else{
            return (
                <View style={styles.container}>
                    <View style={styles.charge}>
                        <View style={styles.s6fc24140}>
                            <View style={styles.chargeHead}>
                                <Text style={styles.chargeRegist1}>Số dư tài khoản: </Text>
                                <Text style={styles.chargeRegist}>{this.props.visitor.coin_formatted}</Text>
                                <Coin/>
                            </View>
                            <View style={styles.s37f7a71d}>
                                <View style={styles.s73ebdced}>
                                     <Text style={styles.s6bb5e61b}>{this.state.info[0]}</Text>
                                    <Text style={{color: 'blue'}}
                                        onPress={() => Linking.openURL(this.state.info[1])}>
                                    ketqualive.com
                                    </Text>
                                </View>
                                {/*<View style={styles.s73ebdced}>
                                    <Text style={styles.s6bb5e61b}>Chọn loại thẻ</Text>
                                </View>
                                <View style={styles.supplier}>
                                        <TouchableWithoutFeedback style={styles.supplierItemTouch} onPress={() => this.openChargePopup('VINA')}>
                                            <View style={this.state.cardType==='VINA'?styles.supplierItemChecked:styles.supplierItem}>
                                                {this.state.cardType==='VINA' &&
                                                    <IconItem name={`checkmark-circle`} style={styles.supplierChecked} color={Colors.green}/>
                                                }
                                                <Image source={vinaphoneLogo} style={styles.supplierItemLogo} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback style={styles.supplierItemTouch} onPress={() => this.openChargePopup('VMS')}>
                                            <View style={this.state.cardType==='VMS'?styles.supplierItemChecked:styles.supplierItem}>
                                                {this.state.cardType==='VMS' &&
                                                <IconItem name={`checkmark-circle`} style={styles.supplierChecked} color={Colors.green}/>
                                                }
                                                <Image source={mobifoneLogo} style={styles.supplierItemLogo} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback style={styles.supplierItemTouch} onPress={() => this.openChargePopup('VTT')}>
                                            <View style={this.state.cardType==='VTT'?styles.supplierItemChecked:styles.supplierItem}>
                                                {this.state.cardType==='VTT' &&
                                                <IconItem name={`checkmark-circle`} style={styles.supplierChecked} color={Colors.green}/>
                                                }
                                                <Image source={viettelLogo} style={styles.supplierItemLogo} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.s6f732a55}>
                                    <Text style={styles.ctaText}>Mệnh giá nạp càng lớn, khuyến mãi càng nhiều</Text>
                                            </View>*/}
                            </View>
                            <View style={styles.priceHead}>
                                <Text style={styles.priceHeadText}>Bảng giá ngân lượng</Text>
                            </View>
                        </View>
                        <ScrollView
                            contentContainerStyle={styles.s0fd9fc2eContentContainerStyle}
                            style={styles.s0fd9fc2e}
                        >
                            <View style={styles.chargeRegistForm}>
                                <View style={styles.chargeItem}>
                                    <Text>20.000 VNĐ</Text>
                                    <View style={styles.chargeItemCoin}>
                                        <Text style={styles.s9e2e4988}>3.000</Text>
                                        <Coin/>
                                    </View>
                                </View>
                                <View style={styles.chargeItem}>
                                    <Text>50.000 VNĐ</Text>
                                    <View style={styles.chargeItemCoin}>
                                        <Text style={styles.s9e2e4988}>9.000</Text>
                                        <Coin/>
                                    </View>
                                </View>
                                <View style={styles.chargeItem}>
                                    <Text>100.000 VNĐ</Text>
                                    <View style={styles.chargeItemCoin}>
                                        <Text style={styles.s9e2e4988}>20.000</Text>
                                        <Coin/>
                                    </View>
                                </View>
                                <View style={styles.chargeItem}>
                                    <Text>200.000 VNĐ</Text>
                                    <View style={styles.chargeItemCoin}>
                                        <Text style={styles.s9e2e4988}>45.000</Text>
                                        <Coin/>
                                    </View>
                                </View>
                                <View style={styles.chargeItem}>
                                    <Text>300.000 VNĐ</Text>
                                    <View style={styles.chargeItemCoin}>
                                        <Text style={styles.s9e2e4988}>70.000</Text>
                                        <Coin/>
                                    </View>
                                </View>
                                <View style={styles.chargeItem}>
                                    <Text>500.000 VNĐ</Text>
                                    <View style={styles.chargeItemCoin}>
                                        <Text style={styles.s9e2e4988}>150.000</Text>
                                        <Coin/>
                                    </View>
                                </View>
                                <View style={styles.chargeItem}>
                                    <Text>1.000.000 VNĐ</Text>
                                    <View style={styles.chargeItemCoin}>
                                        <Text style={styles.s9e2e4988}>350.000</Text>
                                        <Coin/>
                                    </View>
                                </View>
                                <View style={styles.chargeNoticeHead}>
                                    <Text style={styles.chargeNoticeHeadText}>CSKH:</Text>
                                    <Text style={styles.sab01e43a}>{CONFIG.hotline}</Text>
                                </View>
                                <View style={styles.chargeNoticeTime}>
                                    <Text style={styles.chargeNoticeTimeText}>({CONFIG.support_time})</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <PopupExtra ref={modal => this.chargePopup = modal} title={"Nạp ngân lượng"}>
                        <ChargePopup ref={popup => this.chargePopupInner = popup} onSubmit={this.submitCharge} priceModal={this.priceModal}/>
                    </PopupExtra>
                    <PopupExtra ref={modal => this.alertPopup = modal} title={"Nạp ngân lượng"}>
                        <Alert message={this.state.message}/>
                    </PopupExtra>
                    <ModalExtra ref={modal => this.priceModal = modal} title={"Chọn mệnh giá"}>
                        <PriceSelectModal onChange={price => this.onChangePrice(price)}/>
                    </ModalExtra>
                </View>
            );
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ChargeScreen);