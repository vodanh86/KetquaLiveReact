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
    benefit: {
        flex: 1,
        paddingTop: 15,
    },
    callToActionText: {
        color: `rgba(236, 6, 6, 1)`,
        fontWeight: `bold`,
        fontSize: 16,
        padding: 5
    },
    callToActionButtonText: {
        fontSize: 16,
        fontWeight: `bold`,
        color: `rgba(255, 255, 255, 1)`
    },
    callToActionTouch: {
        alignItems: `center`,
        backgroundColor: `rgba(238, 4, 4, 1)`,
        borderRadius: 3,
        height: 40,
        justifyContent: `center`,
        marginTop: 10,
        marginBottom: 20,
        width: 120
    },
    condition: {
        alignItems: `center`
    },
    conditionHead: {
        flexDirection: `row`,
        justifyContent: `center`,
        alignItems: `center`,
        backgroundColor: Colors.orange,
        padding: 10,
        marginBottom: 10,
        width: `100%`
    },
    conditionHeadText: {
        fontSize: 16,
        color: Colors.white
    },
    stronger: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: `bold`
    },
    conditionDetail: {
        flexDirection: `row`,
        justifyContent: `center`,
        alignItems: `center`,
        padding: 5
    },
    conditionText: {
        fontSize: 16
    },
    conditionNumber: {
        fontSize: 16,
        fontWeight: `bold`,
        color: Colors.tintColor
    },

});