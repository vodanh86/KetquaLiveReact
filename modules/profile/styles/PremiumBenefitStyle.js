import {
    StyleSheet,
    Platform
} from 'react-native';
import {Colors, window} from "../../common/common.constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inline: {
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`
    },
    centerView: {
        alignItems: 'center'
    },
    benefitScroll: {
        flex: 1
    },
    userID: {
        color: Colors.tintColor
    },
    userName: {
        fontSize: 14,
        fontWeight: `bold`
    },
    isSuperVip: {
        color: Colors.orange
    },
    isVip: {
        color: Colors.tintColor
    },
    isNotVip: {
        color: Colors.gray
    },
    userAvatar: {
        borderRadius: 25, height: 50, marginRight: 10, width: 50
    },
    userInfo: {
        alignItems: `center`,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 1,
        flexDirection: `row`,
        padding: 10
    },
    VipButtonActive: {
        backgroundColor: Colors.tintColor,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: `center`,
        borderRadius: 36,
        justifyContent: `center`,
        zIndex: 2
    },
    VipTextActive: {
        color: Colors.white,
        textAlign: `center`
    },
    VipButton: {
        backgroundColor: Colors.white,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: `center`,
        borderRadius: 36,
        justifyContent: `center`,
        zIndex: 1
    },
    VipText: {
        color: Colors.tintColor,
        textAlign: `center`
    },
    packageTab: {
        flexDirection: `row`,
        justifyContent: `center`,
        margin: 20,
        borderWidth: 1,
        borderColor: Colors.tintColor,
        borderRadius: 36
    },
    iconSuperVip: {height: 158, width: 231},
    iconVip: {height: 158, width: 150},
    conditionCount: {
        color: `rgba(229, 10, 0, 1)`,
        fontWeight: `bold`,
        marginLeft: 5
    },
    condition: {flexDirection: `row`, justifyContent: `center`, padding: 20, alignItems: `center`},
    IconCondition: {alignItems: `center`},
    cta: {
        marginVertical: 15
    },
    btnBuyVip: {
        alignItems: `center`,
        backgroundColor: Colors.tintColor,
        borderRadius: 3,
        height: 40,
        justifyContent: `center`,
        width: 100
    },
    txtBuyVip: {
        fontSize: 16,
        fontWeight: `bold`,
        color: Colors.white
    }
});