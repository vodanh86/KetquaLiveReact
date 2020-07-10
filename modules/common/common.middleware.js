import {ACTION_BACK_BUTTON_CLICK, ACTION_GO_TO_ROUTE} from './common.constants';

import { takeEvery, put, select } from 'redux-saga/effects';

import {clearHistories} from "./common.actions";

function* backButtonClicked(action) {
    action.navigation.goBack();
}

function* goToRouteButtonClicked(action) {
    action.navigation.navigate(action.route_name, action.params);
}

export function* watchCommon() {
    yield takeEvery(ACTION_BACK_BUTTON_CLICK, backButtonClicked);
    yield takeEvery(ACTION_GO_TO_ROUTE, goToRouteButtonClicked);
}