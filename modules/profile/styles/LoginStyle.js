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
        bottom: window.height * 0.2,
        width: window.width * 0.6,
        left: window.width * 0.2,
        backgroundColor: Colors.tintColor,
        alignItems: 'center',
        justifyContent: `center`,
        borderRadius: 25,
        paddingVertical: 10
    },
    loginBtn: {
        position: 'absolute',
        bottom: window.height * 0.15,
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
});