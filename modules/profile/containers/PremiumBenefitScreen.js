import React from 'react';
import {
    WebView,
    ImageBackground,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    Image,
    Text,
    View,
    Platform
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/PremiumBenefitStyle';
import {switchBenefitTabClicked} from "../profile.actions";
import { Coin } from "../../common/components/Coin";
import VipBenefit from '../components/VipBenefit';
import SuperVipBenefit from '../components/SuperVipBenefit';
import {CONFIG} from "../../common/common.constants";
import {ACCOUNT_SUPERVIP} from "../profile.constants";
import noavatar from '../../../assets/images/no_avatar.png';

class PremiumBenefitScreen extends React.Component {
    static navigationOptions = {
        title: 'Quyền lợi'
    };

    state = {
        tab: 'vip'
    };

    UNSAFE_componentWillMount() {
        if(this.props.visitor.type === ACCOUNT_SUPERVIP){
            this.setState({tab: 'supervip'});
        }
    }

    selectTab = (tab) => {
        this.setState({tab: tab});
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.userInfo}>
                    <Image source={this.props.visitor.avatar!==""?{uri: this.props.visitor.avatar}:noavatar} style={styles.userAvatar} />
                    <View>
                        <Text><Text style={styles.userName}>{this.props.visitor.name}</Text> (ID: <Text style={styles.userID}>{this.props.visitor.id}</Text>)</Text>
                        {this.props.visitor.type === ACCOUNT_SUPERVIP && (<Text style={styles.isSuperVip}>Bạn đang là Super VIP</Text>)}
                        {this.props.visitor.type !== ACCOUNT_SUPERVIP && (<Text style={styles.isVip}>{this.props.visitor.expired_vip_formatted}</Text>)}
                    </View>
                </View>
                <View style={styles.centerView}>
                    <View style={styles.packageTab}>
                        <TouchableOpacity activeOpacity={0.8} style={this.state.tab==='supervip'?styles.VipButtonActive:styles.VipButton} onPress={() => this.selectTab('supervip')}>
                            <Text style={this.state.tab==='supervip'?styles.VipTextActive:styles.VipText}>Super Vip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={this.state.tab==='vip'?styles.VipButtonActive:styles.VipButton} onPress={() => this.selectTab('vip')}>
                            <Text style={this.state.tab==='vip'?styles.VipTextActive:styles.VipText}>Vip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.benefitScroll}>
                    {this.showTabContent()}
                </ScrollView>
            </View>
        );
    }

    showTabContent = () => {
        if(this.state.tab === 'vip'){
            return (<View style={styles.IconCondition}>
                <View>
                    <Image source={require('../../../assets/images/vip.png')} style={styles.iconVip} />
                </View>
                <View style={styles.condition}>
                    <Text>Gói VIP: {CONFIG.vip_price_formatted}</Text>
                    <Coin/>
                    <Text>/ngày</Text>
                </View>
                <VipBenefit />

                {this.props.visitor.type !== ACCOUNT_SUPERVIP && (<View style={styles.cta}>
                    <TouchableHighlight style={styles.btnBuyVip} onPress={() => this.props.goToRoute(this.props.navigation, 'Upgrade')}>
                        <Text style={styles.txtBuyVip}>Mua VIP</Text>
                    </TouchableHighlight>
                </View>)}
                
            </View>);
        }else{
            return (<View style={styles.IconCondition}>
                <Image source={require('../../../assets/images/super_vip.png')} style={styles.iconSuperVip} />
                <View style={styles.condition}>
                    <Text>Nạp đủ tối thiểu:</Text>
                    <View style={styles.inline}>
                        <Text style={styles.conditionCount}>{CONFIG.supervip_price_formatted}</Text>
                        <Coin/>
                    </View>
                </View>
                <SuperVipBenefit />
                {this.props.visitor.type !== ACCOUNT_SUPERVIP && (<View style={styles.cta}>
                    <TouchableHighlight style={styles.btnBuyVip} onPress={() => this.props.goToRoute(this.props.navigation, 'Charge')}>
                        <Text style={styles.txtBuyVip}>Nạp thêm</Text>
                    </TouchableHighlight>
                </View>)}
            </View>);
        }
    };
}


const mapStateToProps = (state) => {
    return {
        ...getAppStateMap(state),
        selectedTab: state.profile.tab !== 'supervip'?'vip':'supervip'
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...getAppPropMap(dispatch),
        selectTab: (tab) => {
            dispatch(switchBenefitTabClicked(tab))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PremiumBenefitScreen);
