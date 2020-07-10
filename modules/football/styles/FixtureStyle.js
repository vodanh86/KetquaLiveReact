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
    meta: {
        alignItems: `center`,
        paddingTop: 15
    },
    date: {
        color: Colors.lightBlack,
        marginBottom: 5
    },
    status: {
        color: Colors.lightBlack
    },
    textHighlight: {
        color: Colors.tintColor,
        fontWeight: `bold`
    },
    matchSummary: {
        flexDirection: `row`,
        padding: 15
    },
    team: {
        flex: 1,
        justifyContent: `center`,
        alignItems: `center`
    },
    teamLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 5
    },
    teamName: {
        fontSize: 16,
        fontWeight: `bold`,
        textAlign: `center`
    },
    score: {
        width: 100,
        justifyContent: `center`
    },
    fullScore: {
        color: Colors.tintColor,
        fontSize: 25,
        fontWeight: `bold`,
        textAlign: `center`
    },
    halfScore: {
        fontSize: 16,
        color: Colors.tintColor,
        textAlign: `center`
    },
    homeEvent: {
        flexDirection: `row`
    },
    awayEvent: {
        flexDirection: `row`
    },
    leftCol: {
        flex: 1,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `flex-end`,
        borderRightWidth: 1,
        borderRightColor: Colors.grayBorder,
        padding: 15
    },
    rightCol: {
        flex: 1,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `flex-start`,
        padding: 15,
        position: `relative`
    },
    player: {
        color: Colors.black,
        paddingHorizontal: 5
    },
    time: {
        color: Colors.lightBlack
    },
    rightDivider: {
        position: `absolute`,
        left: 0,
        width: 5,
        height: 2,
        backgroundColor: Colors.grayBorder,
        zIndex: 2
    },
    leftDivider: {
        position: `absolute`,
        right: 0,
        width: 5,
        height: 2,
        backgroundColor: Colors.grayBorder,
        zIndex: 2
    },
    eventList: {
        position: `relative`,
        marginVertical: 20
    },
    topDot: {
        position: `absolute`,
        top: 0,
        left: window.width/2 - 3,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.grayBorder
    },
    botDot: {
        position: `absolute`,
        bottom: 0,
        left: window.width/2 - 3,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.grayBorder
    },
    textSuccessSmall: {
        fontSize: 11,
        color: Colors.green
    },
    textDangerSmall: {
        fontSize: 11,
        color: Colors.red
    }
});