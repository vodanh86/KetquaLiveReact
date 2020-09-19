import {StyleSheet, Platform} from 'react-native';
import {Colors, window} from "../common.constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    chargeRegist: {color: `rgba(253, 0, 0, 1)`, fontWeight: `bold`},
    chargeHead: {
        alignItems: `center`,
        backgroundColor: `rgba(255, 255, 255, 1)`,
        flex: 0,
        flexDirection: `row`,
        justifyContent: `center`,
        minHeight: 50,
        width: `100%`
    },
    s73ebdced: {
        alignItems: `flex-start`, 
        marginBottom: 10,
        justifyContent: `center`,
    },
    supplierItemLogo: {
        height: (window.width / 6) - 15, width: (window.width / 3) - 30,
    },
    supplierItemTouch: {
        minHeight: (window.width / 6),
    },
    supplierItem: {
        padding: 5,
        borderColor: Colors.grayBorder,
        backgroundColor: `rgba(255, 255, 255, 1)`,
        borderWidth: 1,
        borderRadius: 3,
        position: `relative`,
        minHeight: (window.width/6)
    },
    supplierItemChecked: {
        padding: 5,
        borderColor: Colors.green,
        backgroundColor: `rgba(255, 255, 255, 1)`,
        borderWidth: 1,
        borderRadius: 3,
        position: `relative`,
        minHeight: (window.width/6)
    },
    supplierChecked: {
        position: `absolute`,
        zIndex: 2,
        ...Platform.select({
            ios: {
                top: -6,
                right: -6
            },
            android: {
                top: -8,
                right: -4
            }
        }),
    },
    s135fe5d9: {height: 50, width: 100},
    sb806c089: {backgroundColor: `rgba(255, 255, 255, 1)`, flex: 1},
    s1bc4978c: {height: 50, width: 100},
    s50bc7763: {backgroundColor: `rgba(255, 255, 255, 1)`, flex: 1},
    supplier: {
        alignItems: `stretch`,
        flex: 1,
        flexDirection: `row`,
        justifyContent: `space-between`,
        width: `100%`,
    },
    s6f732a55: {alignItems: `flex-start`, marginTop: 15, width: `100%`},
    ctaText: {color: Colors.gray},
    s37f7a71d: {
        alignItems: `flex-start`,
        backgroundColor: Colors.lightGray,
        flex: 1,
        justifyContent: `flex-start`,
        padding: 10,
        width: `100%`,
        minHeight: 20
    },
    s6fc24140: {width: `100%`, flex: 1,maxHeight: 170},
    s9f8b6074: {
        alignItems: `flex-start`,
        flexDirection: `row`,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: `#ffffff`,
        width: `100%`
    },
    priceHead: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    priceHeadText: {

    },
    s9e2e4988: {color: `rgba(241, 1, 1, 1)`},
    chargeItem: {
        alignItems: `center`,
        borderBottomColor: `rgba(222, 222, 222, 1)`,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: `row`,
        justifyContent: `space-between`,
        paddingBottom: 15,
        paddingTop: 15
    },
    chargeItemCoin: {
        flex: 1,
        flexDirection: `row`,
        justifyContent: `flex-end`,
        alignItems: `center`,
    },
    sa8d4bcd0: {color: `rgba(241, 1, 1, 1)`},
    sb790dde9: {color: `rgba(241, 1, 1, 1)`},
    s835a6a9e: {color: `rgba(241, 1, 1, 1)`},
    s4962bb48: {color: `rgba(241, 1, 1, 1)`},
    s709b7c6d: {color: `rgba(241, 1, 1, 1)`},
    sd1329431: {color: `rgba(241, 1, 1, 1)`},
    s256e8133: {color: `rgba(241, 1, 1, 1)`},
    chargeNoticeHeadText: {marginRight: 5},
    sab01e43a: {color: `rgba(246, 0, 0, 1)`, fontWeight: `bold`},
    chargeNoticeHead: {
        alignItems: `center`,
        flex: 1,
        flexDirection: `row`,
        justifyContent: `center`,
        marginBottom: 5,
        marginTop: 15
    },
    chargeNoticeTime: {
        alignItems: `center`,
        flex: 1,
        justifyContent: `center`,
        marginBottom: 15,
    },
    chargeNoticeTimeText: {
        color: Colors.gray
    },
    chargeRegistForm: {flex: 1, paddingHorizontal: 10, width: `100%`},
    s0fd9fc2eContentContainerStyle: {alignItems: `stretch`},
    s0fd9fc2e: {flex: 2, width: `100%`},
    charge: {alignItems: `center`, flex: 1}
});