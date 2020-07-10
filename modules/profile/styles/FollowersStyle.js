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
    noData: {
        fontSize: 16,
        color: Colors.gray,
        textAlign: `center`,
        marginVertical: 20
    },
    listFollower: {
        flex: 1
    },
    item: {
        padding: 15,
        flexDirection: `row`,
        alignItems: `center`
    },
    avatar: {
        position: `relative`,
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        backgroundColor: Colors.lightGray
    },
    avatarImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        fontSize: 14
    }
});