import React from 'react';
import {Linking} from 'react-native';
import {
    alert_error, alert_info, alert_loading, backButtonClicked, clearHistories, goToRoute,
    hide_alert,
    alert_success,
    hide_modal,
    open_modal
} from "./common.actions";

import {updateUserInfo, updateVisitorInfo} from '../profile/profile.actions';

export const getAppStateMap = (state) => {
    return {
        histories: state.common.histories,
        alert: state.common.alert,
        modal: state.common.modal,
        visitor: state.profile.visitor,
        pay: state.common.pay
    }
};

export const getAppPropMap = (dispatch) => {
    return {
        hide_modal: () => {
            dispatch(hide_modal())
        },
        open_modal: (title, message) => {
            dispatch(open_modal(title, message))
        },
        open_custom_modal: (title, message, button, screen, navigator) => {
            dispatch(open_modal(title, message, button, screen, navigator))
        },
        hide_alert: () => {
            dispatch(hide_alert())
        },
        alert_loading: (message) => {
            dispatch(alert_loading(message))
        },
        alert_info: (message) => {
            dispatch(alert_info(message))
        },
        alert_success: (message) => {
            dispatch(alert_success(message))
        },
        alert_error: (message) => {
            dispatch(alert_error(message))
        },
        clickBack: (navigation) => {
            dispatch(backButtonClicked(navigation));
        },
        goToRoute: (navigation, route_name, params) => {
            dispatch(goToRoute(navigation, route_name, params))
        },
        clearHistories: () => {
            dispatch(clearHistories())
        },
        callHotline: () => {
            Linking.openURL('tel:0987401948');
        },
        comingSoon: () => {
            alert('Không kết nối được máy chủ')
        },
        updateVisitorInfo: () => {
            dispatch(updateVisitorInfo());
        },
        updateUserInfo: (info) => {
            dispatch(updateUserInfo(info));
        }
    }
};