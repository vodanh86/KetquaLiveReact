import {
    ACTION_EDIT_AVATAR_SUBMIT,
    ACTION_EDIT_COVER_SUBMIT,
    ACTION_FOLLOW,
    ACTION_LOGIN_FACEBOOK,
    ACTION_LOGIN_NORMAL,
    ACTION_LOGIN_SUCCESS,
    ACTION_LOGOUT,
    ACTION_UNFOLLOW,
    ACTION_UPDATE_VISITOR_INFO
} from './profile.constants';
import {takeEvery, takeLatest, call, put} from 'redux-saga/effects';
import {AsyncStorage, AlertIOS} from 'react-native';
import {
    doFollowError,
    doFollowSuccess,
    editAvatarError, editAvatarSuccess, editCoverError, editCoverSuccess,
    loginNormalSuccess, unFollowError, unFollowSuccess, updateUserInfo, updateVisitorInfo
} from "./profile.actions";
import {loginAPI} from "./api/LoginAPI";
import {getUserCodeAPI} from "./api/GetNewUserCodeAPI";
import {callAPI} from "../common/api/callAPI";
import {format_user_data, get_current_token, user_avatar_url, user_cover_url} from "./profile.helpers";
import {alert_loading, enable_pay, hide_alert} from "../common/common.actions";

function* doLogout(action) {
    try {
        yield AsyncStorage.clear();
        action.navigator.navigate('Auth');
    } catch (error) {
        console.error(error);
    }
}

function* uploadCover(action){
    let token = yield get_current_token();
    if(token){
        yield put(alert_loading("Đang tải ảnh lên..."));
        let photo = yield callAPI('user/uploadImage', {
            image: {
                type: 'photo',
                uri: action.uri,
                name: 'cover-'+ token
            },
            field: 'cover'
        }, true);
        if(photo.error === 0){
            yield put(editCoverSuccess(user_cover_url(photo.data.image)));
        }else{
            yield put(editCoverError(photo.message));
        }
        yield put(hide_alert());
    }else{
        alert("Vui lòng đăng nhập");
    }
}

function* uploadAvatar(action){
    let token = yield get_current_token();
    if(token){
        yield put(alert_loading("Đang tải ảnh lên..."));
        let photo = yield callAPI('user/uploadImage', {
            image: {
                type: 'photo',
                uri: action.uri,
                name: 'avatar-'+ token
            },
            field: 'avatar'
        }, true);
        if(photo.error === 0){
            yield put(editAvatarSuccess(user_avatar_url(photo.data.image)));
        }else{
            yield put(editAvatarError(photo.message));
        }
        yield put(hide_alert());
    }else{
        alert("Vui lòng đăng nhập");
    }
}

function* doUpdateVisitorInfo(action){
    let result = yield callAPI('user/get-by-token',{app: 1});
    if(result.error === 0){
        yield put(updateUserInfo(format_user_data(result.data, true)));
    }else{
        console.error(result.message);
    }
}

function* loginSuccess(action){
    console.log("loginSuccess", action);
    if(action.user.active_pay != undefined && action.user.active_pay === 1){
        yield put(enable_pay());
    }
}

export function* watchProfile() {
    yield takeLatest(ACTION_LOGOUT, doLogout);
    yield takeEvery(ACTION_LOGIN_SUCCESS, loginSuccess);
    yield takeEvery(ACTION_EDIT_COVER_SUBMIT, uploadCover);
    yield takeEvery(ACTION_EDIT_AVATAR_SUBMIT, uploadAvatar);
    yield takeLatest(ACTION_UPDATE_VISITOR_INFO, doUpdateVisitorInfo);
}