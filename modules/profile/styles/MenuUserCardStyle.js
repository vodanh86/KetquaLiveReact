import {
    StyleSheet
} from 'react-native';
import {Colors, window} from "../../common/common.constants";

export default StyleSheet.create({
    user_avatar: {
        borderRadius: 40,
        backgroundColor: Colors.white,
        borderWidth: 2,
        borderColor: Colors.white,
        height: 80,
        marginBottom: 10,
        width: 80
    },
    user_name: {
        fontSize: 15,
        color: Colors.white,
        fontWeight: `bold`,
        marginBottom: 5
    },
    user_id: {
        fontSize: 14,
        color: Colors.white,
        marginBottom: 5
    },
    user_coin_icon: {
        color: Colors.orange
    },
    user_coin_text: {
        color: Colors.orange,
        fontSize: 14,
        fontWeight: `bold`,
        marginLeft: 5
    },
    user_coin: {
        alignItems: `center`,
        flex: 0,
        height: 30,
        width: `100%`,
        flexDirection: `row`,
        justifyContent: `center`
    },
    user_cover: {
        alignItems: `center`,
        backgroundColor: Colors.smoke,
        height: 220,
        paddingTop: 30,
        width: `100%`
    },
    user_card: {
        alignItems: `center`,
        flex: 0,
        height: 220,
        flexDirection: `column`,
        width: `100%`,
        backgroundColor: '#fdfdfd',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EDEDED'
    },
    user_bio: {
        zIndex: 3,
        flex: 1,
        width: `100%`,
        alignItems: `center`,
        flexDirection: `column`,
    },
    cover_mask: {
        backgroundColor: `rgba(0, 0, 0, 0.5)`,
        bottom: 0,
        flex: 1,
        left: 0,
        position: `absolute`,
        right: 0,
        top: 0,
        width: `100%`,
        zIndex: 2
    },
});