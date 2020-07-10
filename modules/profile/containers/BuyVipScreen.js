import React, {Fragment} from 'react';
import {
    WebView,
    TouchableHighlight,
    ScrollView,
    Image,
    Text,
    View,
    Platform,
    TouchableOpacity
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/BuyVipStyle';
import IconItem from "../../common/components/IconItem";
import ModalExtra from "../../common/components/ModalExtra";
import { Coin } from "../../common/components/Coin";
import VipDaySelectModal from "../components/VipDaySelectModal";
import VipBenefit from "../components/VipBenefit";
import {CONFIG} from "../../common/common.constants";
import IconLoading from "../../common/components/IconLoading";
import {callAPI} from "../../common/api/callAPI";
import {ACCOUNT_SUPERVIP} from "../profile.constants";

class BuyVipScreen extends React.Component {
    static navigationOptions = {
        title: 'Mua VIP'
    };
    state = {
        loading: false,
        day: 1,
        price: CONFIG.vip_price,
        price_formatted: CONFIG.vip_price_formatted
    };
    onChangePackage = pack => {
        this.setState({day: pack.day, price: pack.price, price_formatted: pack.price_formatted});
        this.selectDayModal.close();
    };

    buyVip = async () => {
        if(this.props.visitor.type === ACCOUNT_SUPERVIP){
            this.props.alert_info("Bạn đã là SUPER VIP!");
            setTimeout(() => {
                this.props.hide_alert();
            }, 3000);
            return false;
        }
        if(this.state.loading){
            return false;
        }
        if(this.props.visitor.coin < this.state.price){
            this.props.alert_info("Không đủ ngân lượng, vui lòng nạp thêm!");
            setTimeout(() => {
                this.props.hide_alert();
            }, 3000);
            return false;
        }
        this.setState({loading: true});
        let result = await callAPI('user/buyvip',{num: this.state.day});
        if(result.error === 0){
            await this.props.updateVisitorInfo();
            this.props.alert_success("Mua VIP thành công!");
            setTimeout(() => {
                this.props.hide_alert();
            }, 3000);
        }else{
            alert(result.message);
        }
        this.setState({loading: false});
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.s9b447cf7}>
                        <Text>Số dư tài khoản: </Text>
                        <Text style={styles.s04adb4e1}>{this.props.visitor.coin_formatted}</Text>
                        <Coin/>
                        <Text>( </Text>
                        <TouchableOpacity onPress={() => this.props.goToRoute(this.props.navigation, 'Charge')}>
                            <Text style={styles.textHighlight}>Nạp thêm</Text>
                        </TouchableOpacity>
                        <Text> )</Text>
                    </View>
                    <View style={styles.s30197be5}>
                        <View style={styles.inline}>
                            <Text style={styles.s354a8274}>Gói VIP: {CONFIG.vip_price_formatted}</Text>
                            <Coin/>
                            <Text style={styles.s354a8274}>/ ngày</Text>
                        </View>
                        <Text style={styles.s6a2b2e17}>
                            (Mua càng nhiều, chiết khấu càng lớn)
                        </Text>
                    </View>
                    <View style={styles.se0c36096}>
                        <Text style={styles.textChoosePackage}>Chọn gói:</Text>
                        <View style={styles.s716cbac7}>
                            <View style={styles.s9a514056}>
                                <TouchableOpacity onPress={() => this.selectDayModal.open()} style={styles.scbfe2bec}>
                                    <Text style={styles.dayNumber}>{this.state.day} Ngày </Text>
                                    <IconItem name={`arrow-down`} />
                                </TouchableOpacity>
                                <View style={styles.inline}>
                                    <Text style={styles.amount}>{this.state.price_formatted}</Text>
                                    <Coin/>
                                </View>
                            </View>
                            <TouchableOpacity onPress={this.buyVip}>
                                <View style={styles.s6e5c9e94}>
                                    {this.state.loading?<IconLoading/>:<Text style={styles.sa0334a79}>Mua</Text>}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {this.props.visitor.type !== ACCOUNT_SUPERVIP &&
                <View style={styles.vipStatus}><Text
                    style={styles.vipStatusText}>{this.props.visitor.expired_vip_formatted}</Text></View>
                }
                <ScrollView style={styles.s34862b9b}>
                    <VipBenefit />
                </ScrollView>
                <View style={styles.s0d6e844a}>
                    {this.props.visitor.type === ACCOUNT_SUPERVIP?
                        (<Fragment><Text style={styles.s17a4c587}>Chúc mừng, bạn đã là SUPER VIP</Text>
                            <TouchableOpacity onPress={() => this.props.goToRoute(this.props.navigation,`PremiumBenefit`)}>
                                <View style={styles.s2477d0ec}>
                                    <Text style={styles.sc9c87448}>Xem đặc quyền</Text>
                                </View>
                            </TouchableOpacity>
                        </Fragment>)
                        :
                        (<Fragment><Text style={styles.s17a4c587}>Và nhiều quyền lợi hơn nữa khi trở thành</Text>
                        <TouchableOpacity onPress={() => this.props.goToRoute(this.props.navigation,`UpgradeSuper`)}>
                        <View style={styles.s2477d0ec}>
                        <Text style={styles.sc9c87448}>SUPER VIP</Text>
                        </View>
                        </TouchableOpacity></Fragment>)
                    }
                </View>
                <ModalExtra ref={modal => this.selectDayModal = modal} title={"Chọn số ngày"}>
                    <VipDaySelectModal onChange={pack => this.onChangePackage(pack)}/>
                </ModalExtra>
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyVipScreen);
