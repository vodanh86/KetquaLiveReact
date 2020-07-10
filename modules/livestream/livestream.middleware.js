import {ACTION_GET_LIVESTREAM_LIST} from './livestream.constants';
import {takeLatest, call, put} from 'redux-saga/effects';
import {getLatestLivestreamSuccess} from "./livestream.actions";
import {getLatestLivestreamAPI} from "./api/GetLatestLivestreamAPI";

function* getLivestreamList(action) {
    try {
        const items = yield call(getLatestLivestreamAPI);
        yield put(getLatestLivestreamSuccess(items));
    } catch (error) {
        console.error(error);
    }
}

export function* watchLivestream() {
    yield takeLatest(ACTION_GET_LIVESTREAM_LIST, getLivestreamList);
}