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
    listLivestreamWrap: {
        flex: 1
    },
    noData: {
        textAlign: 'center',
        fontSize: 15,
        color: '#999999'
    },
    listLivestream: {
        flex: 1,
        flexDirection: 'column'
    },
    streamItem: {
        width: window.width,
        marginTop: 30
    },
    streamItemTouch: {
        width: window.width,
        height: window.width*0.5625,
    },
    streamItemAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        zIndex: 3
    },
    streamItemScreenshot: {
        width: window.width,
        height: window.width*0.5625,
        zIndex: 1
    },
    streamItemAuthorName: {
        fontSize: 14,
        color: Colors.gray
    },
    streamItemViewing: {
        position: `absolute`,
        bottom: 10,
        right: 10,
        zIndex: 9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 2,
        paddingHorizontal: 5,
        backgroundColor: Colors.black,
        borderRadius: 2
    },
    streamItemViewingNumber: {
        fontSize: 12,
        color: Colors.white
    },
    streamItemTitle: {
        fontSize: 14,
        fontWeight: `bold`
    },
    streamItemTopGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: 100,
        zIndex: 2
    },
    streamItemBottomGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: window.width,
        height: 50,
        zIndex: 2
    },
    camera_preview_wrap: {
        flex: 1
    },
    camera_preview: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    camera_reverse_button: {
        position: 'absolute',
        zIndex: 9,
        left: 10,
        top: 10,
        padding: 15,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    startLivestreamModal: {
        flex: 1,
        backgroundColor: Colors.gray
    },
    startLivestreamSubmitButton: {
        position: 'absolute',
        zIndex: 9,
        top: window.height * 0.8,
        left: window.width * 0.2,
        width: window.width * 0.6,
        backgroundColor: Colors.tintColor,
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    startLivestreamSubmitText: {
        color: Colors.white,
        fontSize: 16
    },
    startLivestreamCancelButton: {
        position: 'absolute',
        zIndex: 9,
        top: 10,
        right: 10,
        width: 70,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    streamInfo: {
        padding: 10,
        flexDirection: `row`
    },
    streamTitleAndAuthor: {
        flex: 1,
        paddingLeft: 10
    },
    wrapper: {
        height: window.width*0.42,
        backgroundColor: '#EEEEEE',
        marginBottom: 15
    },
    slideItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    slideImage: {
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        width: window.width,
        height: window.width*0.42
    },
    serviceLinks: {
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    serviceLinkTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 15
    },
    serviceLinkItem: {
        backgroundColor: Colors.tintColor,
        borderRadius: 100,
        width: (window.width/2) - 37,
        padding: 7

    },
    serviceTitleItem: {
        fontSize: 17,
        color: Colors.white,
        textAlign: 'center'
    },
    serviceCert: {
        fontSize: 15,
        color: Colors.gray,
        fontStyle: 'italic',
        textAlign: 'center',
        paddingVertical: 15
    },
    startLivestreamButton: {
        backgroundColor: Colors.tintColor,
        position: 'absolute',
        bottom: 40,
        right: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems:'center',
        justifyContent:'center',
    },
    startLivestreamText: {
        fontSize: 11,
        color: Colors.white,
        position: 'absolute',
        top: 40
    }
});