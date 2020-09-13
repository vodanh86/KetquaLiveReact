import {Dimensions} from 'react-native';

export const CONFIG = {
    name: 'KẾT QUẢ LIVE PRO',
    slogan: 'Xổ Số - Bóng Đá',
    hotline: '0931898999',
    version: '1.0.9',
    support_time: 'Thời gian: 9:00-18:00 từ Thứ 2 - Thứ 6',
    api_client_id: '6456123123123',
    api_client_key: 'ee37c9c24d95670a317326eca57b9926',
    api_domain: 'http://207.148.117.130',
    fanpage_url: 'http://192.168.10.4/facebook',
    vip_price: 4999,
    vip_price_formatted: '4.999',
    vip_price_7: 29999,
    vip_price_formatted_7: '29.999',
    vip_price_30: 119999,
    vip_price_formatted_30: '119.999',
    vip_price_90: 349999,
    vip_price_formatted_90: '349.999',
    supervip_price: 5000000,
    supervip_price_formatted: '5.000.000',
    song_thu_vip_price: 2999,
    song_thu_vip_price_formatted: '2.999',
    song_thu_sieu_vip_price: 9999,
    song_thu_sieu_vip_price_formatted: '9.999',
    dau_duoi_dac_biet_price: 8888,
    dau_duoi_dac_biet_price_formatted: '8.888',
    football_super_vip_price: 39999,
    football_super_vip_price_formatted: '39.999',
    football_sure_win_price: 59999,
    football_sure_win_price_formatted: '59.999',
};

// default app state
export const INIT_STATE = {
    alert: {
        is_visible: false,
        theme: 'info',
        message: 'Đang tải dữ liệu...'
    },
    modal: {
        is_visible: false,
        title: 'Thông báo',
        message: '',
        screen: '',
        button: 'OK',
        navigation: null
    },
    histories: [],
    previous: "",
    pay: false,
    refreshing: false
};

// action keys
export const ACTION_BACK_BUTTON_CLICK = 'ACTION_BACK_BUTTON_CLICK';
export const ACTION_GO_TO_ROUTE = 'ACTION_GO_TO_ROUTE';
export const ACTION_CLEAR_HISTORY = 'ACTION_CLEAR_HISTORY';
export const ACTION_ALERT = 'ACTION_ALERT';
export const ACTION_HIDE_ALERT = 'ACTION_HIDE_ALERT';
export const ENABLE_PAY = 'ENABLE_PAY';
export const ACTION_HIDE_MODAL = 'ACTION_HIDE_MODAL';
export const ACTION_OPEN_MODAL = 'ACTION_OPEN_MODAL';

// color schema
const tintColor = '#dc0a1c';
const tintTextColor = '#ffffff';
export const Colors = {
    tintColor,
    tintTextColor,
    transparent: 'transparent',
    red: '#FF0000',
    blue: '#0e82ff',
    white: '#FFFFFF',
    orange: '#FF9900',
    yellow: '#ffe398',
    lightYellow: '#fff2af',
    darkYellow: '#ffd66c',
    black: '#000000',
    lightBlack: '#666666',
    green: '#449f4a',
    gray: '#999',
    grayBorder: '#ccc',
    lightGray: '#e8e8e8',
    smoke: '#EEEEEE',
    iconDefault: '#999',
    tabIconDefault: '#999',
    tabIconSelected: tintColor,
    tabBar: '#fefefe',
    errorBackground: 'red',
    errorText: '#fff',
    warningBackground: '#EAEB5E',
    warningText: '#666804',
    noticeBackground: tintColor,
    noticeText: '#fff',
};

// dimension
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const window = {
    width,
    height,
    isSmallDevice: width < 375,
};

export const crop_size = {
    avatar: {width: "200", height: 200},
    cover: {width: 600, height: 400}
};

