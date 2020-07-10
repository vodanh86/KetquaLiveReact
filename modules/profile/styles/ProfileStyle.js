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
    edit_cover_icon: { color: Colors.white },
    edit_cover_button: {
        position: `absolute`,
        right: 0,
        top: 0,
        zIndex: 2,
        padding: 20
    },
    save_button_text: {
        color: `rgba(255, 255, 255, 1)`,
        padding: 7
    },
    save_button: {
        backgroundColor: Colors.tintColor,
        borderRadius: 3
    },
    cancel_button_text: {
        color: `rgba(255, 255, 255, 1)`,
        marginLeft: 5,
        padding: 7
    },
    cancel_button: {
        backgroundColor: `rgba(0, 0, 0, .8)`,
        borderRadius: 3,
        marginLeft: 5
    },
    stop_edit: {
        alignItems: `center`,
        flex: 1,
        flexDirection: `row`,
        justifyContent: `center`,
        position: `absolute`,
        right: 10,
        top: 10
    },
    user_avatar: {
        borderRadius: 50,
        height: 100,
        width: 100,
        borderWidth: 2,
        borderColor: Colors.white,
        zIndex: 2
    },
    user_avatar_wrap: {
        backgroundColor: Colors.lightGray,
        borderRadius: 50,
        height: 100,
        marginBottom: 10,
        ...Platform.select({
            ios: {
                marginTop: 50
            },
            android: {
                marginTop: 30
            }
        }),
        width: 100,
        position: `relative`,
        overflow: `hidden`
    },
    change_avatar_button: {
        width: 100,
        paddingVertical: 5,
        backgroundColor: `rgba(0,0,0,0.5)`,
        position: `absolute`,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: `center`,
        zIndex: 3
    },
    user_name: {
        color: Colors.white,
        fontSize: 15,
        fontWeight: `bold`,
        marginBottom: 5,
        zIndex: 2
    },
    user_id: {
        color: Colors.white,
        fontSize: 15,
        marginBottom: 15,
        zIndex: 2
    },
    view_profit: {
        alignItems: `center`,
        flex: 1,
        flexDirection: `row`,
        justifyContent: `center`,
        maxHeight: 30
    },
    view_profit_icon: {
        marginRight: 5,
        marginTop: 2
    },
    view_profit_text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.white
    },
    view_profit_button: {
        backgroundColor: Colors.orange,
        paddingVertical: 3,
        paddingHorizontal: 15,
        borderRadius: 20,
        zIndex: 3,
        marginBottom: 50
    },
    follow_button: {
        width: 150,
        height: 35,
        backgroundColor: Colors.green,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        zIndex: 3,
        marginBottom: 50
    },
    unfollow_button: {
        width: 150,
        height: 35,
        backgroundColor: Colors.orange,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        zIndex: 3,
        marginBottom: 50
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
    user_cover: {
        bottom: 0,
        flex: 1,
        left: 0,
        position: `absolute`,
        right: 0,
        top: 0,
        width: `100%`,
        zIndex: 1,
        resizeMode: 'cover'
    },
    user_bio: {
        zIndex: 3,
        flex: 1,
        width: `100%`,
        alignItems: `center`,
        flexDirection: `column`,
    },
    user_card: {
        backgroundColor: Colors.lightGray,
        borderRadius: 0,
        flex: 1,
        zIndex: 2,
        width: `100%`,
        ...Platform.select({
            ios: {
                paddingBottom: 50
            },
            android: {
                paddingBottom: 100
            }
        })
    },
    coin_count: {
        color: Colors.tintColor,
        fontSize: 16,
        fontWeight: 'normal'
    },
    coin: {
        alignItems: `center`,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: Colors.lightGray,
        flex: 1
    },
    follower_count: {
        color: Colors.tintColor,
        fontSize: 16,
        fontWeight: 'normal'
    },
    follower: { alignItems: `center`, flex: 1 },
    following_count: {
        color: Colors.tintColor,
        fontSize: 16,
        fontWeight: 'normal'
    },
    following: {
        alignItems: `center`,
        borderLeftColor: Colors.lightGray,
        borderLeftWidth: StyleSheet.hairlineWidth,
        flex: 1
    },
    meta: {
        alignItems: `center`,
        backgroundColor: Colors.white,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 1,
        borderTopColor: Colors.white,
        borderTopWidth: 1,
        flex: 1,
        flexDirection: `row`,
        justifyContent: `center`,
        height: 70,
        width: `100%`,
        maxHeight: 70
    },
    info_row_icon: {
        color: Colors.tintColor,
        marginLeft: 15
    },
    info_row_label: { marginLeft: 10 },
    info_label: {
        alignItems: `center`,
        flex: 1,
        flexDirection: `row`,
        maxHeight: 30
    },
    info_row_value: {
        marginLeft: 10,
        marginRight: 10,
        flex: 1
    },
    info_row_value_gray: { 
        marginLeft: 10,
        marginRight: 10,
        color: Colors.gray
    },
    info_row_edit_icon: {
        color: Colors.tintColor,
        marginLeft: 15,
        marginRight: 15
    },
    info_value: {
        alignItems: `center`,
        flex: 1,
        flexDirection: `row`,
        justifyContent: `space-between`,
        maxHeight: 30
    },
    info_row_wrap: {
        flex: 1    
    },
    info_row: {
        backgroundColor: Colors.white,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: StyleSheet.hairlineWidth,
        flex: 1,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
        maxHeight: 50,
        paddingVertical: 15
    },
    message_icon: {
        color: Colors.tintColor,
        marginLeft: 15
    },
    message_label: { marginLeft: 10 },
    message_view_all_icon: {
        color: Colors.tintColor,
        fontSize: 20,
        marginLeft: 15, 
        marginRight: 15
    },
    message_view_all: {
        alignItems: `center`,
        flex: 1,
        flexDirection: `row`,
        justifyContent: `flex-end`,
        maxHeight: 30
    },
    user_info: {
        backgroundColor: Colors.white,
        flex: 1
    }
});