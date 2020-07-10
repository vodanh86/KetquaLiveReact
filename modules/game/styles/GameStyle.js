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
    sendButton: {
        padding: 5
    },
    imageAttach: {
        borderTopWidth: 1,
        borderTopColor: Colors.grayBorder,
        padding: 5
    },
    imageItem: {
        position: `relative`,
        width: 50,
        height: 50
    },
    removeImageButton: {
        position: `absolute`,
        top: -10,
        right: -17,
        zIndex: 2
    },
    attachImageItem: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: Colors.grayBorder
    }
});