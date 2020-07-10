import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import reducers from './common.reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './common.saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    {},
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;