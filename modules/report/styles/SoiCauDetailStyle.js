import {
    StyleSheet
} from 'react-native';
import {Colors, window} from "../../common/common.constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentContainer: {
        paddingTop: 30,
    },
    topText: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayBorder
    },
    textRow: {
        paddingBottom: 7,
        flexDirection: `row`,
    },
    textNormal: {
        fontSize: 16
    },
    textHighlight: {
        fontSize: 16,
        color: Colors.tintColor
    },
    lotoTableItem: {
        marginTop: 15
    },
    lotoDate: {
        fontSize: 16,
        color: Colors.black,
        textAlign: `left`,
        marginLeft: 15
    },
    lotoTable: {
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: `rgba(230, 230, 230, 1)`
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
        fontSize: 16,
    },
    lotoNumberItalic: {
        color: `rgba(255, 0, 51, 1)`,
        fontSize: 18,
        fontWeight: `bold`,
        textAlign: `center`,
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
});