import {
    StyleSheet,
    Platform
} from 'react-native';
import {Colors, window} from "../../common/common.constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGray,
    },
    item: {
        flexDirection: `row`,
        justifyContent: `space-between`,
        alignItems: `center`,
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EDEDED',
        backgroundColor: Colors.white
    },
    label: {
        fontSize: 16
    },
    logout: {
        justifyContent: `center`,
        alignItems: `center`,
        padding: 15,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopColor: Colors.lightGray,
        borderBottomColor: Colors.lightGray,
        backgroundColor: Colors.white,
        marginTop: 20
    },
    logoutTouch: {
        
    },
    logoutText: {
        fontSize: 16,
        color: Colors.tintColor
    },
    chargeNoticeHead: {
        alignItems: `center`,
        flex: 1,
        flexDirection: `row`,
        justifyContent: `center`,
        marginBottom: 5,
        marginTop: 15
    },
    chargeNoticeTime: {
        alignItems: `center`,
        flex: 1,
        justifyContent: `center`,
        marginBottom: 15,
    },
    chargeNoticeTimeText: {
        color: Colors.gray
    },
    sab01e43a: {color: `rgba(246, 0, 0, 1)`, fontWeight: `bold`},
    bottomInfo: {
        alignItems: `center`,
        height: 100,
        padding: 10,
        justifyContent: `flex-end`
    }
});