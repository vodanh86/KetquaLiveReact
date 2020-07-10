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
    optionsTitleText: {
        fontSize: 16,
        marginLeft: 15,
        marginTop: 9,
        marginBottom: 12,
    },
    optionIconContainer: {
        marginRight: 15,
    },
    optionIconMore: {
        marginLeft: 15,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EDEDED',
    },
    optionTextContainer: {
        flex: 1
    },
    optionText: {
        fontSize: 15,
        marginTop: 5,
    },
    menuItemList: {
        flex: 1
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
    regionTextActive: {
        color: `rgba(215, 22, 22, 1)`
    },
    regionActive: {
        flex: 1,
        alignItems: `center`,
        borderBottomColor: `rgba(226, 12, 12, 1)`,
        borderBottomWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    regionItem: {
        flex: 1,
        alignItems: `center`,
        borderBottomColor: Colors.white,
        borderBottomWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 5
    },
    input: {
        fontSize: 16,
        backgroundColor: Colors.lightGray,
        borderRadius: 3,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        width: 80,
        height: 32,
        textAlign: `center`
    },
    submit: {
        backgroundColor: Colors.tintColor,
        height: 31,
        paddingHorizontal: 10,
        borderRadius: 3,
        borderWidth: 0,
        justifyContent: `center`,
        alignItems: `center`
    },
    submitText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: `bold`,
        textAlign: `center`
    },
    filterForm: {
        flexDirection: `row`,
        justifyContent: `center`,
        alignItems: `center`,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        padding: 15
    }
});