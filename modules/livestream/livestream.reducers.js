import {
    INIT_LIVESTREAM_STATE, ACTION_CANCEL_LIVESTREAM, ACTION_GET_LIVESTREAM_LIST,
    ACTION_GET_LIVESTREAM_LIST_SUCCESS, ACTION_START_LIVESTREAM, ACTION_START_LIVESTREAM_SUBMIT
} from './livestream.constants';

const livestreamReducer = (state = INIT_LIVESTREAM_STATE, action) => {
    switch (action.type) {
        case ACTION_GET_LIVESTREAM_LIST:
            return {
                ...state,
                isFetching: true
            };
            break;
        case ACTION_GET_LIVESTREAM_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.items
            };
            break;
        case ACTION_START_LIVESTREAM:
            return {
                ...state,
                showModal: true
            };
            break;
        case ACTION_CANCEL_LIVESTREAM:
            return {
                ...state,
                showModal: false
            };
            break;
        case ACTION_START_LIVESTREAM_SUBMIT:
            return {
                ...state,
                showModal: true,
                title: action.title
            };
            break;
    }
    return state;
};

export default livestreamReducer;