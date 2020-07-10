import {
    ACTION_CANCEL_LIVESTREAM,
    ACTION_GET_LIVESTREAM_LIST, ACTION_GET_LIVESTREAM_LIST_SUCCESS,
    ACTION_START_LIVESTREAM, ACTION_START_LIVESTREAM_SUBMIT
} from "./livestream.constants";

export const getLatestLivestream = () => {
    return {
        type: ACTION_GET_LIVESTREAM_LIST
    };
};

export const getLatestLivestreamSuccess = (items) => {
    return {
        type: ACTION_GET_LIVESTREAM_LIST_SUCCESS,
        items: items
    };
};

export const startLivestream = () => {
    return {
        type: ACTION_START_LIVESTREAM
    };
};

export const startLivestreamSubmit = () => {
    return {
        type: ACTION_START_LIVESTREAM_SUBMIT
    };
};

export const cancelLivestream = () => {
    return {
        type: ACTION_CANCEL_LIVESTREAM
    };
};