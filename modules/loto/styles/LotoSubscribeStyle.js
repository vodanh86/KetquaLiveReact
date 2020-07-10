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
    lottoTipRegistActive: { color: Colors.tintColor, fontWeight: `bold`, fontSize: 14 },
    lottoTipRegist: { color: Colors.black, fontWeight: `bold`, fontSize: 14 },
    lottoTipHeadTab: {

    },
    lottoTipHeadTabTouch: {
        padding: 15
    },
    lottoTipHead: {
        alignItems: `center`,
        backgroundColor: `rgba(234, 234, 234, 1)`,
        flex: 0,
        flexDirection: `row`,
        justifyContent: `space-evenly`,
        width: `100%`
    },
    lottoTipLuckyNumber: { margin: 15, fontSize: 14, textAlign: `center` },
    lottoTipLuckyText: { color: `rgba(236, 4, 4, 1)`, fontSize: 18, fontWeight: `bold` },
    lottoTipLuckyItem: {
        alignItems: `center`,
        borderColor: `rgba(248, 1, 1, 1)`,
        borderRadius: 50,
        borderWidth: 1,
        height: 50,
        justifyContent: `center`,
        margin: 5,
        width: 50
    },
    lottoTipLuckyList: { flexDirection: `row`, alignItems: `center`, flex: 1, justifyContent: `center` },
    lottoTipDivider: {
        backgroundColor: `rgba(234, 234, 234, 1)`,
        height: 1,
        marginBottom: 10,
        marginTop: 10,
        width: `100%`
    },
    lottoTipDateText: { fontSize: 14, textAlign: `center` },
    lottoTipDate: { alignItems: `center`, marginBottom: 10 },
    lottoTipRegion: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        width: `100%`,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        backgroundColor: Colors.lightGray
    },
    lottoTipRegionValue: {
        color: Colors.lightBlack
    },
    lottoTipItemButtonText: { color: `rgba(255, 255, 255, 1)`, fontSize: 14 },
    lottoTipItemButton: {
        alignItems: `center`
    },
    lottoTipItemButtonTouch: {
        flex: 1,
        alignItems: `center`,
        backgroundColor: `rgba(234, 1, 1, 1)`,
        borderRadius: 5,
        height: 30,
        justifyContent: `space-evenly`,
        flexDirection: `row`,
        width: 80,
        paddingHorizontal: 5
    },
    lottoTipItem: {
        alignItems: `center`,
        borderBottomColor: `rgba(222, 222, 222, 1)`,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: `row`,
        justifyContent: `space-between`,
        paddingBottom: 10,
        paddingTop: 10
    },
    lottoTipItemText: {
        fontSize: 14
    },
    lottoTipNoticeHeadText: { fontSize: 14 },
    lottoTipNoticeHeadIcon: { color: `rgba(238, 5, 5, 1)`, marginRight: 5 },
    lottoTipNoticeHead: {
        alignItems: `center`,
        flex: 1,
        flexDirection: `row`,
        justifyContent: `center`,
        marginBottom: 10,
        marginTop: 10
    },
    lottoTipNoticeHighlightText: {
        color: `rgba(224, 2, 2, 1)`,
        fontSize: 13,
        fontWeight: `bold`,
        textAlign: `center`
    },
    lottoTipNoticeHighlight: { alignItems: `center`, flex: 1, width: `100%` },
    lottoTipNoticeExtraText: { textAlign: `center`,paddingLeft:20,paddingRight:20,fontSize: 14 },
    lottoTipNoticeExtra: {
        alignItems: `center`,
        flex: 1,
        justifyContent: `flex-start`,
        marginBottom: 10,
        marginTop: 5
    },
    lottoTipRegistForm: { padding: 10, width: `100%`, flex: 1 },
    lottoTip: { alignItems: `center`, flex: 1 },
    resultRow: {
        marginBottom: 10,
        flexDirection: `row`,
        alignItems: `center`
    },
    textHighlight: {
        color: Colors.tintColor
    },
    listLotoTipLog: {
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