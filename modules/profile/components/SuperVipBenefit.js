import React, {Component} from 'react';
import {ImageBackground, Text, View, StyleSheet} from "react-native";
import {Colors, window} from "../../common/common.constants";

class SuperVipBenefit extends Component {
    render() {
        return (<View style={styles.benefitTable}>
            <ImageBackground source={require('../../../assets/images/bg_head.png')} style={styles.benefitHeadBg}>
                <Text style={styles.benefitHead}>ĐẶC QUYỀN KHI LÀ SUPERVIP</Text>
            </ImageBackground>
            <View style={styles.benefitList}>
                <View style={styles.benefitItem}>
                    <View style={styles.benefitNumber}><Text style={styles.benefitNumberText}>1</Text></View>
                    <Text style={styles.benefitText}>Tặng thêm 15% khi nạp ngân lượng</Text>
                </View>
                <View style={styles.benefitItem}>
                    <View style={styles.benefitNumber}>
                        <Text style={styles.benefitNumberText}>2</Text></View>
                    <Text style={styles.benefitText}>Đổi tên không giới hạn</Text>
                </View>
                <View style={styles.benefitItem}>
                    <View style={styles.benefitNumber}><Text style={styles.benefitNumberText}>3</Text></View>
                    <Text style={styles.benefitText}>Chuyển ngân lượng miễn phí</Text>
                </View>
                <View style={styles.benefitItem}>
                    <View style={styles.benefitNumber}><Text style={styles.benefitNumberText}>4</Text></View>
                    <Text style={styles.benefitText}>Miễn phí Song Thủ, Bạch Thủ 3 miền</Text>
                </View>
                <View style={styles.benefitItem}>
                    <View style={styles.benefitNumber}><Text style={styles.benefitNumberText}>5</Text></View>
                    <Text style={styles.benefitText}>Vương miện quý tộc</Text>
                </View>
                <View style={styles.benefitItem}>
                    <View style={styles.benefitNumber}><Text style={styles.benefitNumberText}>6</Text></View>
                    <Text style={styles.benefitText}>Hồ sơ được cộp mác SUPERVIP</Text>
                </View>
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    benefitTable: {
        flex: 1,
        width: `100%`
    },
    benefitHeadBg: {
        width: window.width,
        height: 80,
        alignItems: `center`,
        justifyContent: `center`,
        marginBottom: 15
    },
    benefitHead: {
        fontSize: 14,
        fontWeight: `bold`,
        textTransform: `uppercase`,
        color: '#a38341',
        textAlign: `center`
    },
    benefitList: {
        marginVertical: 15,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: Colors.lightGray,
        borderStyle: `solid`,
        flexDirection: `row`,
        flexWrap: `wrap`
    },
    benefitItem: {
        width: `50%`,
        borderColor: Colors.lightGray,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        alignItems: `center`,
        padding: 20
    },
    benefitNumber: {
        alignItems: `center`,
        justifyContent: `center`,
        margin: 15,
        borderWidth: 2,
        borderColor: '#a38341',
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    benefitNumberText: {
        color: '#a38341',
        fontSize: 18,
        fontWeight: `bold`
    },
    benefitText: {
        textAlign: `center`
    }
});

export default SuperVipBenefit;