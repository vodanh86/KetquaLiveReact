import {callAPI} from "../../common/api/callAPI";
import {format_user_data} from "../profile.helpers";

export const EditUserAPI = async (info) => {
    let result = await callAPI('user/edit',info);
    if(result.error === 0){
        return format_user_data(result.data, false);
    }else{
        return false;
    }
};