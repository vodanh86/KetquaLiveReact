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
    dateNavigator: {
        paddingVertical: 5,
        paddingHorizontal: 20
    },
    datePickerLabel: {
        alignItems: `center`,
        flex: 1,
        justifyContent: `center`,
        paddingVertical: 10
    },
    datePickerLabelText: {
        fontSize: 16
    },
    dateSwitch: {
        borderBottomColor: `rgba(226, 226, 226, 1)`,
        borderBottomWidth: 1,
        flexDirection: `row`,
        padding: 5
    },
    ruleList: {
        flex: 1
    },
    ruleSection: {
        marginBottom: 10
    },
    ruleSectionHead: {
        backgroundColor: Colors.lightGray,
        padding: 10
    },
    ruleSectionHeadText: {
        color: Colors.black
    },
    ruleSectionList: {
        flexWrap: `wrap`,
        flexDirection: `row`,
        alignItems: `center`,
        padding: window.width * 0.01,
    },
    ruleSectionItemTouch: {
        width: window.width * 0.156,
        borderWidth: 1,
        borderColor: Colors.tintColor,
        borderRadius: 5,
        margin: window.width * 0.02,
        padding: 5,
        alignItems: `center`
    },
    ruleSectionItemText: {
        color: Colors.tintColor,
        fontSize: 16
    }
});