import {StyleSheet} from 'react-native';
import {Colors} from "../common.constants";
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
        alignItems: `center`
    },
    noMessage: {
        fontSize: 18,
        color: Colors.gray
    }
});