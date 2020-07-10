import {
    ACTION_EDIT_AVATAR_ERROR,
    ACTION_EDIT_AVATAR_SUBMIT,
    ACTION_EDIT_AVATAR_SUCCESS,
    ACTION_EDIT_COVER_ERROR,
    ACTION_EDIT_COVER_SUBMIT,
    ACTION_EDIT_COVER_SUCCESS,
    ACTION_FOLLOW,
    ACTION_FOLLOW_ERROR,
    ACTION_FOLLOW_SUCCESS,
    ACTION_LOGIN_FACEBOOK,
    ACTION_LOGIN_NORMAL,
    ACTION_LOGIN_SUCCESS,
    ACTION_LOGOUT,
    ACTION_SWITCH_BENEFIT_TAB,
    ACTION_UNFOLLOW, ACTION_UNFOLLOW_ERROR, ACTION_UNFOLLOW_SUCCESS,
    ACTION_UPDATE_USER_INFO,
    INIT_PROFILE_STATE
} from "./profile.constants";
import {remove_array_values} from "../common/common.helpers";

const profileReducer = (state = INIT_PROFILE_STATE, action) => {
    switch (action.type) {
        case ACTION_LOGIN_NORMAL:
            return {
                ...state,
                navigator: action.navigator
            };
        case ACTION_LOGIN_FACEBOOK:
            return {
                ...state,
                navigator: action.navigator
            };
        case ACTION_LOGOUT:
            return {
                ...state,
                navigator: action.navigator
            };
        case ACTION_LOGIN_SUCCESS:
            return {...state, visitor: action.user};
        case ACTION_SWITCH_BENEFIT_TAB:
            return {...state, tab: action.tab};
        case ACTION_EDIT_COVER_SUBMIT:
            return {...state, uri: action.uri};
        case ACTION_EDIT_COVER_SUCCESS:
            return {...state, visitor: {...state.visitor,cover:action.uri}, uri: null};
        case ACTION_EDIT_COVER_ERROR:
            return {...state, message: action.message};
        case ACTION_EDIT_AVATAR_SUBMIT:
            return {...state, uri: action.uri};
        case ACTION_EDIT_AVATAR_SUCCESS:
            return {...state, visitor: {...state.visitor,avatar:action.uri}, uri: null};
        case ACTION_EDIT_AVATAR_ERROR:
            return {...state, message: action.message, uri: null};
        case ACTION_UPDATE_USER_INFO:
            action.info.code = state.visitor.code;
            return {...state, visitor: action.info, uri: null};
        case ACTION_FOLLOW:
            return {...state, follow_action: true,};
        case ACTION_FOLLOW_SUCCESS:
            let new_info = state.visitor;
            if(!new_info.following.includes(action.id.toString())){
                new_info.following.push(action.id.toString());
            }
            return {...state, follow_action: false, visitor: new_info};
        case ACTION_FOLLOW_ERROR:
            return {...state, follow_action: false, message: action.message};
        case ACTION_UNFOLLOW:
            return {...state, follow_action: true,};
        case ACTION_UNFOLLOW_SUCCESS:
            let new_data = state.visitor;
            if(new_data.following.includes(action.id.toString())){
               new_data = {...new_data, following: remove_array_values(new_data.following, [action.id.toString()])};
            }
            return {...state, follow_action: false, visitor: new_data};
        case ACTION_UNFOLLOW_ERROR:
            return {...state, follow_action: false, message: action.message};


    }
    return state;
};

export default profileReducer;