import {
    StyleSheet
} from 'react-native';
import {Colors} from "../../common/common.constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    containerScroll: {
        flex: 1,
        width: `100%`
    },
    contentContainer: {
        paddingTop: 30,
    },
    footballTipRegistActive: { color: Colors.tintColor, fontWeight: `bold`, fontSize: 14 },
    footballTipRegist: { color: Colors.black, fontWeight: `bold`, fontSize: 14 },
    footballTipHeadTab: {

    },
    footballTipHeadTabTouch: {
        padding: 15
    },
    footballTipHead: {
        alignItems: `center`,
        backgroundColor: `rgba(234, 234, 234, 1)`,
        flex: 0,
        flexDirection: `row`,
        justifyContent: `space-evenly`,
        minHeight: 50,
        width: `100%`
    },
    footballTipItemButtonText: { color: `rgba(255, 255, 255, 1)`, fontSize: 14 },
    footballTipItemButton: {
        alignItems: `center`
    },
    footballTipItemButtonTouch: {
        flex: 1,
        alignItems: `center`,
        backgroundColor: `rgba(234, 1, 1, 1)`,
        borderRadius: 5,
        height: 30,
        justifyContent: `space-evenly`,
        flexDirection: `row`,
        width: 100,
        paddingHorizontal: 5
    },
    footballTipItem: {
        alignItems: `center`,
        borderBottomColor: `rgba(222, 222, 222, 1)`,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: `row`,
        justifyContent: `space-between`,
        paddingBottom: 10,
        paddingTop: 10
    },
    footballTipItemText: {
        fontSize: 14
    },
    footballTipItemTextBold: {
        fontSize: 16,
        fontWeight: `bold`
    },
    footballTipItemTextSmall: {
        fontSize: 13,
        color: Colors.gray
    },
    footballTipNoticeHeadText: { fontSize: 14 },
    footballTipNoticeHeadIcon: { color: `rgba(238, 5, 5, 1)`, marginRight: 5 },
    footballTipNoticeHead: {
        alignItems: `center`,
        flex: 1,
        flexDirection: `row`,
        justifyContent: `center`,
        marginBottom: 10,
        marginTop: 10
    },
    footballTipNoticeHighlightText: {
        color: `rgba(224, 2, 2, 1)`,
        fontSize: 13,
        fontWeight: `bold`,
        textAlign: `center`
    },
    footballTipNoticeHighlight: { alignItems: `center`, flex: 1, width: `100%` },
    footballTipNoticeExtraText: { textAlign: `center`,paddingLeft:20,paddingRight:20,fontSize: 14 },
    footballTipNoticeExtra: {
        alignItems: `center`,
        flex: 1,
        justifyContent: `flex-start`,
        marginBottom: 10,
        marginTop: 5
    },
    footballTipRegistForm: { padding: 10, width: `100%`, flex: 1 },
    footballTip: { alignItems: `center`, flex: 1 },
    resultItem: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayBorder
    },
    resultRow: {
        marginTop: 0,
        marginBottom: 10,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `flex-start`
    },
    textHighlight: {
        color: Colors.tintColor
    },
    textGray: {
        color: Colors.lightBlack
    },
    listFootballTipLog: {
        flex: 1,
        width: `100%`,
        padding: 15
    },
    logItem: {
        paddingBottom: 15,
        paddingLeft: 41,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayBorder,
        position: `relative`
    },
    logItemIcon: {
        position: `absolute`,
        top: 0,
        left: 0
    },
    logItemTitle: {
        color: Colors.tintColor,
        fontSize: 16,
        marginBottom: 5
    }
});