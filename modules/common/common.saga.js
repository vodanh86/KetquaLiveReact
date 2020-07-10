import { all } from 'redux-saga/effects';

import {watchCommon} from './common.middleware';
import {watchLivestream} from "../livestream/livestream.middleware";
import {watchProfile} from "../profile/profile.middleware";

export default function* rootSaga() {
    yield all([
        watchCommon(),
        watchLivestream(),
        watchProfile()
    ]);
}