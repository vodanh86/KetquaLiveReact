import {StyleSheet, Platform} from 'react-native';
import {Colors, window} from "../common.constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    alert_loading: {
        position: `absolute`,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: Colors.blue
    },
    alert_error: {
        position: `absolute`,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: Colors.orange
    },
    alert_success: {
        position: `absolute`,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: Colors.green
    },
    alert_normal: {
        position: `absolute`,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: Colors.blue
    },
    alert_container: {
        ...Platform.select({
            ios: {
                padding: 15
            },
            android: {
                padding: 20
            }
        }),
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`
    },
    alert_icon: {
        marginRight: 5
    },
    white_text: {
        color: Colors.white
    },
    black_text: {
        color: Colors.black
    },
    row: {
        marginBottom: 15,
        minHeight: 40
    },
});