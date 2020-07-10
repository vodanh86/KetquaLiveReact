import {
    ACTION_ALERT,
    ACTION_BACK_BUTTON_CLICK, ACTION_CLEAR_HISTORY, ACTION_GO_TO_ROUTE,
    ACTION_HIDE_ALERT, ACTION_HIDE_MODAL, ACTION_OPEN_MODAL, ENABLE_PAY
} from "./common.constants";

export const backButtonClicked = (navigation) => {
    return {
        type: ACTION_BACK_BUTTON_CLICK,
        navigation: navigation
    };
};

export const goToRoute = (navigation, route_name, params) => {
    return {
        type: ACTION_GO_TO_ROUTE,
        navigation: navigation,
        route_name: route_name,
        params: params
    };
};

export const clearHistories = () => {
    return {
        type: ACTION_CLEAR_HISTORY
    };
};


export const alert_loading = (message) => {
    return {
        type: ACTION_ALERT,
        message: message,
        theme: 'loading'
    };
};

export const alert_info = (message) => {
    return {
        type: ACTION_ALERT,
        message: message,
        theme: 'info'
    };
};

export const alert_success = (message) => {
    return {
        type: ACTION_ALERT,
        message: message,
        theme: 'success'
    };
};

export const alert_error = (message) => {
    return {
        type: ACTION_ALERT,
        message: message,
        theme: 'error'
    };
};

export const hide_alert = () => {
    return {
        type: ACTION_HIDE_ALERT
    };
};

export const enable_pay = () => {
    return {
        type: ENABLE_PAY
    };
};


export const hide_modal = () => {
    return {
        type: ACTION_HIDE_MODAL
    };
};

export const open_modal = (title, message, button, callback_screen, navigation) => {
    return {
        type: ACTION_OPEN_MODAL,
        title: title,
        button: button,
        message: message,
        screen: callback_screen,
        navigation: navigation
    };
};
