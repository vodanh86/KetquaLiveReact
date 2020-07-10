import React from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/BuySuperVipStyle';
import { Coin } from "../../common/components/Coin";
import SuperVipBenefit from "../components/SuperVipBenefit";
import {CONFIG} from "../../common/common.constants";

class BuySuperVipScreen extends React.Component {
    static navigationOptions = {
        title: 'Mua SUPER VIP'
    };
    state = {
        price: CONFIG.supervip_price,
        price_formatted: CONFIG.supervip_price_formatted
    };
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.benefit}>
                    <SuperVipBenefit />
                </ScrollView>
                <View style={styles.condition}>
                    <View style={styles.conditionHead}>
                        <Text style={styles.conditionHeadText}>Để trở thành </Text>
                        <Text style={styles.stronger}>SUPER VIP</Text>
                    </View>
                    <View style={styles.conditionDetail}>
                        <Text style={styles.conditionText}>Nạp đủ tối thiểu: </Text>
                        <View style={styles.inline}>
                            <Text style={styles.conditionNumber}>{this.state.price_formatted}</Text>
                            <Coin/>
                        </View>
                    </View>
                    <Text style={styles.callToActionText}>
                        Bạn đã sẵn sàng gia nhập CLB SUPER VIP?
                    </Text>
                    <TouchableOpacity onPress={() => this.props.goToRoute(this.props.navigation,`Charge`)}>
                        <View style={styles.callToActionTouch}>
                            <Text style={styles.callToActionButtonText}>Nạp</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(BuySuperVipScreen);
