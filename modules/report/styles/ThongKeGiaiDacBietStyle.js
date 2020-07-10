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
    dropdownInput: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        width: `100%`,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        backgroundColor: Colors.lightGray
    },
    dropdownInputValue: {
        color: Colors.lightBlack
    },
    filterForm: {

    },
    filterFormInner: {
        padding: 15
    },
    row: {
        flexDirection: `row`,
        justifyContent: `center`,
        alignItems: `center`,
        marginBottom: 15
    },
    label: {
        width: 120,
        paddingRight: 10
    },
    submitButtonWrap: {
        flexDirection: `row`,
        justifyContent: `center`,
        alignItems: `center`,
        marginBottom: 15
    },
    submitTouch: {
        width: 150
    },
    submitButton: {
        backgroundColor: Colors.tintColor,
        borderRadius: 5,
        justifyContent: `center`,
        alignItems: `center`,
        padding: 10
    },
    submitText: {
        color: Colors.white
    },
    resultHead: {
        backgroundColor: Colors.lightGray,
        flexDirection: `row`
    },
    resultBody: {
        backgroundColor: Colors.white,
        flexDirection: `row`,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray
    },
    resultBodyList: {
        flex: 1
    },
    resultHeadCol: {
        flex: 1,
        justifyContent: `center`,
        alignItems: `center`,
        paddingVertical: 10,
        paddingHorizontal: 3,
        borderRightWidth: 1,
        borderStyle: 'solid',
        borderRightColor: Colors.lightGray,
    },
    resultRowCol: {
        flex: 1,
        justifyContent: `center`,
        alignItems: `center`,
        paddingVertical: 10,
        paddingHorizontal: 3,
        borderRightWidth: 1,
        borderStyle: 'solid',
        borderRightColor: Colors.lightGray,
        flexDirection: `row`
    },
    resultHeadText: {
        fontSize: 14,
        fontWeight: `bold`,
        textAlign: `center`
    },
    resultColText: {
        fontSize: 13,
        textAlign: `center`
    },
    resultColTextHighlight: {
        fontSize: 14,
        fontWeight: `bold`,
        color: Colors.tintColor,
        textAlign: `center`
    },
    dateSelectTouch: {
        flexDirection: `row`,
        alignItems: `center`
    },
    switchTab: {
        width: window.width,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        flexDirection: `row`
    },
    switchTabItem: {
        flex: 1
    },
    tabTextActive: {
        color: `rgba(215, 22, 22, 1)`
    },
    tabActive: {
        flex: 1,
        alignItems: `center`,
        borderBottomColor: `rgba(226, 12, 12, 1)`,
        borderBottomWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    tabItem: {
        flex: 1,
        alignItems: `center`,
        borderBottomColor: Colors.white,
        borderBottomWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 20
    },
});