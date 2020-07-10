import {INIT_LOTO_STATE, ACTION_DEMO} from './loto.constants';

const lotoReducer = (state = INIT_LOTO_STATE, action) => {
    switch (action.type) {
        case ACTION_DEMO:
            return {
                ...state,
                title: 'Loto reducer worked'
            };
            break;
    }
    return state;
};

export default lotoReducer;