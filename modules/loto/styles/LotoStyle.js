import {
    StyleSheet
} from 'react-native';
import {Colors} from "../../common/common.constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentContainer: {
        paddingTop: 30,
    },
    mainTabItemTextActive: {
        color: `rgba(228, 16, 16, 1)`,
        fontWeight: `bold`
    },
    mainTabItemText: {
        fontWeight: `bold`
    },
    mainTabItemView: {
        padding: 15,
        alignItems: `center`,
        flex: 1
    },
    mainTabItem: {
        alignItems: `center`,
        flex: 1
    },
    mainTab: {
        backgroundColor: `rgba(234, 234, 234, 1)`,
        flexDirection: `row`,
        minHeight: 50
    },
    regionTextActive: {
        color: `rgba(215, 22, 22, 1)`
    },
    regionText: {
        textAlign: `center`
    },
    regionActive: {
        borderBottomColor: `rgba(226, 12, 12, 1)`,
        borderBottomWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: 150,
        alignItems: `center`
    },
    regionItem: {
        borderBottomColor: Colors.white,
        borderBottomWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: 150,
        alignItems: `center`
    },
    dateNavigator: {
        paddingVertical: 5,
        paddingHorizontal: 20
    },
    datePickerLabel: {
        alignItems: `center`,
        flex: 1,
        justifyContent: `center`
    },
    datePickerLabelText: {
        fontSize: 16
    },
    dateSwitch: {
        borderTopColor: `rgba(226, 226, 226, 1)`,
        borderTopWidth: 1,
        flexDirection: `row`,
        padding: 5
    },
    lotoLabelText: {
        color: `rgba(228, 5, 5, 1)`,
        fontWeight: `bold`
    },
    lotoLabel: {
        alignItems: `center`,
        justifyContent: `center`,
        padding: 10,
        width: 50
    },
    lotoNumberSpecText: {
        color: `rgba(255, 0, 51, 1)`,
        fontSize: 18,
        fontWeight: `bold`,
        textAlign: `center`
    },
    lotoNumberSpec: {
        borderLeftColor: `rgba(226, 226, 226, 1)`,
        borderLeftWidth: 1,
        flex: 1,
        alignItems: `center`,
        justifyContent: `center`,
        padding: 20
    },
    lotoNumber: {
        flex: 1,
        flexDirection: `row`,
        justifyContent: `center`
    },
    lotoNumberBottom: {
        flex: 1,
        flexDirection: `row`,
        justifyContent: `center`,
        borderTopWidth: 1,
        borderColor: `rgba(230, 230, 230, 1)`,
    },
    lotoRow: {
        borderColor: `rgba(230, 230, 230, 1)`,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        flexDirection: `row`
    },
    lotoNumberNormal: {
        fontSize: 16
    },
    lotoNumberHighlight: {
        color: `rgba(255, 0, 51, 1)`,
        fontSize: 16,
        fontWeight: `normal`,
        textAlign: `center`
    },
    lotoNumberCol: {
        alignItems: `center`,
        borderLeftColor: `rgba(226, 226, 226, 1)`,
        borderLeftWidth: 1,
        flex: 1,
        flexDirection: `row`,
        justifyContent: `center`,
        padding: 10
    },
    lotoNumberGroup: {
        flex: 1
    },
    lotoSummaryColText: {
        color: `rgba(253, 253, 253, 1)`
    },
    lotoSummaryCol: {
        alignItems: `flex-start`,
        flex: 1,
        padding: 10
    },
    lotoSummaryColBegin: {
        alignItems: `flex-start`,
        flex: 1,
        padding: 10,
        borderRightWidth: 1,
        borderColor: `#FFFFFF`
    },
    lotoSummary: {
        backgroundColor: `rgba(224, 13, 13, 1)`,
        flexDirection: `row`
    },
    lotoSummaryRowColLabelText: {
        color: `rgba(224, 14, 14, 1)`,
        fontSize: 14
    },
    lotoSummaryRowColLabel: {
        borderLeftColor: `rgba(228, 228, 228, 1)`,
        borderLeftWidth: 1,
        alignItems: `center`,
        padding: 10,
        width: 50
    },
    lotoSummaryRowColNumberText: {
        fontSize: 14,
        flexDirection: `row`,
        flexWrap: `wrap`
    },
    lotoSummaryItemNumber: {
        flexDirection: `row`
    },
    smallHighLight: {
        color: Colors.tintColor,
        fontSize: 14
    },
    textNormal: {
        fontSize: 14
    },
    lotoSummaryRowColNumber: {
        borderLeftColor: `rgba(228, 228, 228, 1)`,
        borderLeftWidth: 1,
        flex: 1,
        padding: 10,
        flexDirection: `row`,
        flexWrap: `wrap`
    },
    lotoSummaryRowCol: {
        alignItems: `stretch`,
        borderBottomColor: `rgba(230, 230, 230, 1)`,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: `row`
    },
    lotoSummaryRow: {
        flex: 1,
        flexDirection: `row`,
        alignItems: `stretch`
    },
    lotoSummaryList: {
        borderColor: `rgba(228, 228, 228, 1)`,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        flexDirection: `column`
    },
    lotoTable: {
        flex: 1
    },
    vietlottType: {
        alignItems: `center`,
        justifyContent: `center`,
        flexDirection: 'row'
    },
    vietlottTypeActive: {
        flex: 1,
        borderBottomColor: `rgba(226, 12, 12, 1)`,
        borderBottomWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: `center`,
        alignItems: `center`,
    },
    vietlottTypeItem: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: `center`,
        alignItems: `center`,
        borderBottomColor: Colors.white,
        borderBottomWidth: 2,
    },
    vietlottCurrentValue: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray,
        padding: 20,
        justifyContent: `center`,
        alignItems: `center`
    },
    textBoldHead: {
        fontSize: 14,
        fontWeight: `bold`,
        marginBottom: 5
    },
    vietlottValueNumber: {
        fontSize: 24,
        fontWeight: `bold`,
        color: Colors.tintColor
    },
    vietlottMegaList: {
        flex: 1,
    },
    listVietlottMega: {
        flex: 1
    },
    vietlottMegaItem: {
        padding: 20,
        justifyContent: `center`,
        alignItems: `center`,
        borderBottomWidth: 1,
        borderColor: Colors.lightGray
    },
    vietlottMegaText: {
        marginBottom: 3
    },
    vietlottMegaNumbers: {
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
        marginTop: 10
    },
    vietlottMegaNumberItem: {
        borderWidth: 2,
        borderColor: Colors.tintColor,
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 5,
        alignItems: `center`,
        justifyContent: `center`
    },
    vietlottMegaNumberItemLast: {
        borderLeftWidth: 2,
        borderLeftColor: Colors.tintColor,
        paddingLeft: 5,
        marginLeft: 5
    },
    vietlottMegaNumberItemText: {
        fontSize: 18,
        color: Colors.tintColor,
        fontWeight: `bold`
    },
    max4dHead: {
        paddingVertical: 10,
        justifyContent: `center`,
        alignItems: `center`,
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray,
    },
    max4dHeadText: {
        fontSize: 16
    },
    max4dTable: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray
    },
    max4dRow: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        flexDirection: `row`
    },
    max4dColLabel: {
        width: 50,
        padding: 6,
        alignItems: `center`,
        justifyContent: `center`
    },
    max4dColLabelText: {
        fontSize: 16,
        color: Colors.tintColor
    },
    max4dColNumbers: {
        flex: 1,
        padding: 6,
        flexDirection: `row`,
        justifyContent: `space-between`
    },
    max4dColNumberRow: {
        padding: 3,
        flexDirection: `row`,
        justifyContent: `space-between`
    },
    max4dColNumberSection: {
        flex: 1,
        flexDirection: `row`,
        justifyContent: `center`,
        alignItems: `center`
    },
    max4dColNumber: {
        width: 24,
        height: 24,
        margin: 3,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.tintColor,
        justifyContent: `center`,
        alignItems: `center`
    },
    max4dColNumberValue: {
        fontSize: 16,
        fontWeight: `bold`,
        color: Colors.tintColor
    },
    max4dColNumberVertical: {
        flex: 1,
        padding: 3,
        flexDirection: `column`
    }
});