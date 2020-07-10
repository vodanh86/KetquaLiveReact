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
        borderBottomWidth: 1,
        borderColor: Colors.grayBorder,
        backgroundColor: Colors.white,
        flexDirection: `row`,
        minHeight: 50
    },
    listFixtures: {
        flex: 1
    },
    listFixtureContainer: {

    },
    leagueItem: {

    },
    roundHead: {
        borderBottomWidth: 1,
        borderColor: Colors.grayBorder,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `flex-start`,
        backgroundColor: Colors.lightGray
    },
    leagueIconWrap: {
        width: 60,
        paddingVertical: 10,
        alignItems: `center`,
        justifyContent: `center`,
    },
    leagueIcon: {
        width: 26,
        height: 26
    },
    roundTitle: {
        padding: 15,
        fontWeight: `bold`
    },
    leagueNameText: {
        marginLeft: 15,
        fontSize: 14,
        fontWeight: `bold`
    },
    dropdownInput: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayBorder,
        width: `100%`,
        maxHeight: 40,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        backgroundColor: Colors.lightGray
    },
    dropdownInputValue: {
        color: Colors.lightBlack
    },
    noRoundNotice: {
        textAlign: `center`,
        margin: 20,
        padding: 20,
        fontSize: 14,
        color: Colors.gray
    }
});