import {INIT_FOOTBALL_STATE, ACTION_DEMO} from './football.constants';

const footballReducer = (state = INIT_FOOTBALL_STATE, action) => {
    switch (action.type) {
        case ACTION_DEMO:
            return {
                ...state,
                title: 'Football reducer worked'
            };
            break;
    }
    return state;
};

export default footballReducer;