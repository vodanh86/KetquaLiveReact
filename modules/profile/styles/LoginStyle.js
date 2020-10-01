import {
    StyleSheet
} from 'react-native';
import {Colors, window} from "../../common/common.constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    login_form: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center'
    },
    app_icon: {
        width: 150,
        height: 150,
        marginTop: window.height * 0.1,
        marginBottom: 30
    },
    app_name: {
        fontSize: 25,
        color: Colors.tintColor,
        fontWeight: 'bold',
        marginBottom: 10
    },
    app_slogan: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: 'bold'
    },
    login_button: {
        position: 'absolute',
        bottom: window.height * 0.23,
        width: window.width * 0.6,
        left: window.width * 0.2,
        backgroundColor: Colors.tintColor,
        alignItems: 'center',
        justifyContent: `center`,
        borderRadius: 25,
        paddingVertical: 10
    },
    register_login_button: {
        position: 'absolute',
        bottom: window.height * 0.16,
        width: window.width * 0.6,
        left: window.width * 0.2,
        backgroundColor: Colors.tintColor,
        alignItems: 'center',
        justifyContent: `center`,
        borderRadius: 25,
        paddingVertical: 10       
    },
    register_button: {
        position: 'absolute',
        bottom: window.height * 0.16,
        width: window.width * 0.6,
        left: window.width * 0.2,
        backgroundColor: Colors.tintColor,
        alignItems: 'center',
        justifyContent: `center`,
        borderRadius: 25,
        paddingVertical: 10
    },
    back_button: {
        position: 'absolute',
        bottom: window.height * 0.1,
        width: window.width * 0.6,
        left: window.width * 0.2,
        backgroundColor: Colors.tintColor,
        alignItems: 'center',
        justifyContent: `center`,
        borderRadius: 25,
        paddingVertical: 10
    },
    fb_login_button: {
        position: 'absolute',
        bottom: window.height * 0.1,
        width: window.width * 0.6,
        left: window.width * 0.2,
        backgroundColor: '#4267b2',
        alignItems: 'center',
        justifyContent: `center`,
        borderRadius: 25,
        paddingVertical: 10
    },
    login_button_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white
    },
    hotline: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    hotline_label: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.black
    },
    hotline_text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.tintColor
    },
    container_inner: {
        flex: 1,
        position: 'absolute',
        bottom: window.height * 0.4,
        alignItems: 'center',
    },
    register_container_inner: {
        flex: 1,
        position: 'absolute',
        bottom: window.height * 0.22,
        alignItems: 'center',
    },
    right_row: {
        marginBottom: 10,
        minHeight: 40,
        alignItems: `flex-end`
    },
    row: {
        marginBottom: 10,
        minHeight: 40,
        width: window.width * 0.6,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        backgroundColor: Colors.lightGray,
        borderRadius: 3,
        padding: 10
    },
});