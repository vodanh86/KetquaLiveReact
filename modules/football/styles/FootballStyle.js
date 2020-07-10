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
    noTextContent: {
        textAlign: `center`,
        color: Colors.gray,
        fontSize: 16,
        paddingVertical: 20
    },
    dateActiveText: {
        color: Colors.tintColor
    },
    dateItemText: {
        textAlign: `center`
    },
    dateActive: {
        borderBottomColor: Colors.tintColor,
        borderBottomWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: 80,
        alignItems: `center`,
        flexDirection: `column`
    },
    dateItem: {
        borderBottomColor: Colors.white,
        borderBottomWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: 80,
        alignItems: `center`,
        flexDirection: `column`
    },
    dateList: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayBorder,
    },
    listFixtures: {
        flex: 1
    },
    listFixtureContainer: {

    },
    leagueItem: {

    },
    leagueHead: {
        borderBottomWidth: 1,
        borderColor: Colors.grayBorder,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `flex-start`,
        backgroundColor: Colors.smoke
    },
    leagueIconWrap: {
        width: 60,
        paddingVertical: 10,
        alignItems: `center`,
        justifyContent: `center`,
    },
    leagueIcon: {
        width: 26,
        height: 26,
        borderRadius: 2
    },
    moreIcon: {
        width: 22,
        height: 22,
        marginLeft: 3
    },
    leagueName: {
        flexDirection: `row`,
        alignItems: `center`,
        paddingVertical: 14,
        borderLeftWidth: 1,
        borderColor: Colors.grayBorder
    },
    leagueNameText: {
        marginLeft: 15,
        fontSize: 14,
        fontWeight: `bold`
    },
    fixtureItem: {
        borderBottomWidth: 1,
        borderColor: Colors.grayBorder,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `flex-start`
    },
    fixtureStatus: {
        width: 60,
        padding: 10,
        alignItems: `center`,
        justifyContent: `center`
    },
    fixtureStatusText: {

    },
    fixtureTip: {
        width: 40,
        paddingVertical: 10,
        alignItems: `center`,
        justifyContent: `center`
    },
    winText: {
        fontSize: 13,
        color: Colors.tintColor
    },
    loseText: {
        fontSize: 13,
        color: Colors.gray
    },
    fixtureSummary: {
        flex: 1,
        paddingVertical: 10,
        flexDirection: `row`,
        alignItems: `stretch`,
        justifyContent: `center`,
        borderLeftWidth: 1,
        borderColor: Colors.grayBorder
    },
    fixtureHomeSection: {
        flex: 1,
        alignItems: `flex-end`,
        justifyContent: `flex-end`,
        paddingHorizontal: 10,
    },
    fixtureHomeName: {
        flex: 1,
        textAlign: `right`
    },
    fixtureAwaySection: {
        flex: 1,
        alignItems: `flex-start`,
        justifyContent: `flex-start`,
        paddingHorizontal: 10,
    },
    fixtureAwayName: {
        flex: 1,
        textAlign: `left`
    },
    fixtureMidSection: {
        width: 60
    },
    fixtureMidNotStarted: {
        fontSize: 14,
        color: Colors.gray,
        textAlign: `center`
    },
    fixtureMidStarted: {
        fontSize: 14,
        fontWeight: `bold`,
        color: Colors.tintColor,
        textAlign: `center`
    }
});