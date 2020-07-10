import {
    ACTION_EDIT_AVATAR_ERROR,
    ACTION_EDIT_AVATAR_SUBMIT,
    ACTION_EDIT_AVATAR_SUCCESS,
    ACTION_EDIT_COVER_ERROR,
    ACTION_EDIT_COVER_SUBMIT,
    ACTION_EDIT_COVER_SUCCESS, ACTION_FOLLOW, ACTION_FOLLOW_ERROR, ACTION_FOLLOW_SUCCESS,
    ACTION_LOGIN_FACEBOOK,
    ACTION_LOGIN_NORMAL,
    ACTION_LOGIN_SUCCESS,
    ACTION_LOGOUT,
    ACTION_SWITCH_BENEFIT_TAB, ACTION_UNFOLLOW, ACTION_UNFOLLOW_ERROR, ACTION_UNFOLLOW_SUCCESS,
    ACTION_UPDATE_USER_INFO,
    ACTION_UPDATE_VISITOR_INFO, ACTION_UPDATE_VISITOR_INFO_ERROR,
    ACTION_UPDATE_VISITOR_INFO_SUCCESS
} from "./profile.constants";

export const loginNormalClicked = (navigator) => {
    return {
        type: ACTION_LOGIN_NORMAL,
        navigator: navigator
    }
};

export const loginNormalSuccess = (user) => {
    return {
        type: ACTION_LOGIN_SUCCESS,
        user: user
    }
};

export const loginFacebookClicked = (navigator) => {
    return {
        type: ACTION_LOGIN_FACEBOOK,
        navigator: navigator
    }
};

export const logoutClicked = (navigator) => {
    return {
        type: ACTION_LOGOUT,
        navigator: navigator
    }
};

export const switchBenefitTabClicked = (tab) => {
    return {
        type: ACTION_SWITCH_BENEFIT_TAB,
        tab: tab
    }
};

export const editCoverSubmit = (uri) => {
    return {
        type: ACTION_EDIT_COVER_SUBMIT,
        uri: uri
    }
};

export const editCoverSuccess = (uri) => {
    return {
        type: ACTION_EDIT_COVER_SUCCESS,
        uri: uri
    }
};

export const editCoverError = (message) => {
    return {
        type: ACTION_EDIT_COVER_ERROR,
        message: message
    }
};

export const editAvatarSubmit = (uri) => {
    return {
        type: ACTION_EDIT_AVATAR_SUBMIT,
        uri: uri
    }
};

export const editAvatarSuccess = (uri) => {
    return {
        type: ACTION_EDIT_AVATAR_SUCCESS,
        uri: uri
    }
};

export const editAvatarError = (message) => {
    return {
        type: ACTION_EDIT_AVATAR_ERROR,
        message: message
    }
};

export const updateUserInfo = (info) => {
    return {
        type: ACTION_UPDATE_USER_INFO,
        info: info
    }
};

export const updateVisitorInfo = () => {
    return {
        type: ACTION_UPDATE_VISITOR_INFO
    }
};

export const doFollow = (id) => {
    return {
        type: ACTION_FOLLOW,
        id: id
    }
};

export const doFollowSuccess = (id) => {
    return {
        type: ACTION_FOLLOW_SUCCESS,
        id: id
    }
};

export const doFollowError = (message) => {
    return {
        type: ACTION_FOLLOW_ERROR,
        message: message
    }
};

export const unFollow = (id) => {
    return {
        type: ACTION_UNFOLLOW,
        id: id
    }
};

export const unFollowSuccess = (id) => {
    return {
        type: ACTION_UNFOLLOW_SUCCESS,
        id: id
    }
};

export const unFollowError = (message) => {
    return {
        type: ACTION_UNFOLLOW_ERROR,
        message: message
    }
};