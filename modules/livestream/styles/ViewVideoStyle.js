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

    },
    viewVideoModal: {
        flex: 1
    },
    videoContainer: {
        width: window.width,
        height: window.width*0.5625,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.black,
    }
});