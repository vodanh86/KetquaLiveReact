import {callAPI} from "../../common/api/callAPI";
import {format_user_data} from "../profile.helpers";

export const loginAPI = async (code) => {
    let result = await callAPI('user/login',{token: code},false);
    if(result.error === 0){
        return format_user_data(result.data, true);
    }else{
        return false;
    }
};

export const fbloginAPI = async (fbInfo) => {
    let result = await callAPI('user/fblogin',fbInfo,false);
    if(result.error === 0){
        return format_user_data(result.data, true);
    }else{
        return false;
    }
};