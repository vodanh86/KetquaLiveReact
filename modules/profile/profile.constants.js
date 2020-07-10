export const ACCOUNT_NORMAL = 'normal';
export const ACCOUNT_VIP = 'vip';
export const ACCOUNT_SUPERVIP = 'supervip';
export const INIT_PROFILE_STATE = {
    visitor: {
        id: 0,
        name: "",
        birthday: 0,
        birthday_formatted: "",
        phone: "",
        email: "",
        gender: "",
        avatar: "",
        code: "",
        coin: 0,
        coin_formatted: '0',
        coin_charge: 0,
        coin_charge_formatted: '0',
        cover: "",
        followers: [],
        follower_count: 0,
        following: [],
        following_count: 0,
        type: ACCOUNT_NORMAL,
        expired_vip_formatted: ""
    }
};
export const ACTION_LOGIN_NORMAL = 'ACTION_LOGIN_NORMAL';
export const ACTION_LOGIN_SUCCESS = 'ACTION_LOGIN_SUCCESS';
export const ACTION_LOGIN_FACEBOOK = 'ACTION_LOGIN_FACEBOOK';
export const ACTION_LOGOUT = 'ACTION_LOGOUT';
export const ACTION_SWITCH_BENEFIT_TAB = 'ACTION_SWITCH_BENEFIT_TAB';
export const ACTION_EDIT_COVER_SUBMIT = 'ACTION_EDIT_COVER_SUBMIT';
export const ACTION_EDIT_COVER_SUCCESS = 'ACTION_EDIT_COVER_SUCCESS';
export const ACTION_EDIT_COVER_ERROR = 'ACTION_EDIT_COVER_ERROR';
export const ACTION_EDIT_AVATAR_SUBMIT = 'ACTION_EDIT_AVATAR_SUBMIT';
export const ACTION_EDIT_AVATAR_SUCCESS = 'ACTION_EDIT_AVATAR_SUCCESS';
export const ACTION_EDIT_AVATAR_ERROR = 'ACTION_EDIT_AVATAR_ERROR';
export const ACTION_UPDATE_USER_INFO = 'ACTION_UPDATE_USER_INFO';

export const ACTION_UPDATE_VISITOR_INFO = 'ACTION_UPDATE_VISITOR_INFO';
export const ACTION_UPDATE_VISITOR_INFO_SUCCESS = 'ACTION_UPDATE_VISITOR_INFO_SUCCESS';
export const ACTION_UPDATE_VISITOR_INFO_ERROR = 'ACTION_UPDATE_VISITOR_INFO_ERROR';

export const ACTION_FOLLOW = 'ACTION_FOLLOW';
export const ACTION_FOLLOW_SUCCESS = 'ACTION_FOLLOW_SUCCESS';
export const ACTION_FOLLOW_ERROR = 'ACTION_FOLLOW_ERROR';

export const ACTION_UNFOLLOW = 'ACTION_UNFOLLOW';
export const ACTION_UNFOLLOW_SUCCESS = 'ACTION_UNFOLLOW_SUCCESS';
export const ACTION_UNFOLLOW_ERROR = 'ACTION_UNFOLLOW_ERROR';