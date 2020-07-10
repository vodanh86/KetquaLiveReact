import {combineReducers} from 'redux';
import footballReducer from '../football/football.reducers';
import lotoReducer from '../loto/loto.reducers';
import profileReducer from '../profile/profile.reducers';
import {
    INIT_STATE, ACTION_BACK_BUTTON_CLICK, ACTION_CLEAR_HISTORY,
    ACTION_GO_TO_ROUTE, ACTION_ALERT, ACTION_HIDE_ALERT, ENABLE_PAY, ACTION_HIDE_MODAL, ACTION_OPEN_MODAL
} from "./common.constants";
import livestreamReducer from "../livestream/livestream.reducers";

const commonReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ACTION_OPEN_MODAL:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    title: action.title,
                    message: action.message,
                    screen: action.screen,
                    button: action.button,
                    navigation: action.navigation,
                    is_visible: true
                }
            };
            break;
        case ACTION_HIDE_MODAL:
            return {
                ...state,
                modal: {
                    is_visible: false
                }
            };
            break;
        case ACTION_ALERT:
            return {
                ...state,
                alert: {
                    ...state.alert,
                    theme: action.theme,
                    message: action.message,
                    is_visible: true
                }
            };
            break;
        case ACTION_HIDE_ALERT:
            return {
                ...state,
                alert: {
                    ...state.alert,
                    is_visible: false
                }
            };
            break;
        case ENABLE_PAY:
            return {
                ...state,
                pay: true
            };
            break;
        /*case ACTION_BACK_BUTTON_CLICK:
            let previous = state.histories.length > 0 ? state.histories[state.histories.length - 1] : "";
            state.histories.pop();
            let new_history = state.histories;
            return {
                ...state,
                histories: new_history,
                previous: previous
            };
            break;
        case ACTION_GO_TO_ROUTE:
            previous = "";
            new_history = [...state.histories];
            if(action.navigation.state.routeName !== undefined && action.navigation.state.routeName !== "App"){
                previous = action.navigation.state.routeName;
                new_history = [...state.histories, action.navigation.state.routeName];
            }

            return {
                ...state,
                histories: new_history,
                previous: previous
            };
            break;
        case ACTION_CLEAR_HISTORY:
            return {
                ...state,
                histories: [],
                previous: ""
            };
            break;*/
    }
    return state;
};

const appReducer = combineReducers({
    common: commonReducer,
    livestream: livestreamReducer,
    profile: profileReducer,
    football: footballReducer,
    loto: lotoReducer
});

export default appReducer;