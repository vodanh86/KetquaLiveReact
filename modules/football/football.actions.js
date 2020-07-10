import {ACTION_GET_LEAGUE_LIST} from './football.constants';

export default getLeagueList = () => {
    return {
        type: ACTION_GET_LEAGUE_LIST,
        items: []
    };
}