import {callJsonAPI} from "../../common/api/callAPI";
import {format_user_data} from "../profile.helpers";

export const GetUserAPI = async (token, id) => {
    let result = await callJsonAPI('user/get',{token: token, id: id});
    if(result.error === 0 &&
        (parseInt(result.data.id) === parseInt(id) || parseInt(result.data.user_id) === parseInt(id))
    ){
        return format_user_data(result.data, false);
    }else{
        return false;
    }
};