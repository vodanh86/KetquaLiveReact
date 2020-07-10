import {callAPI} from "../../common/api/callAPI";
import {format_follower_data, format_user_data} from "../profile.helpers";

export const GetFollowersAPI = async (id, min_id, limit) => {
    let result = await callAPI('user/follower',{user_id: id, min_id: min_id, limit: limit});
    if(result.error === 0){
        let users = [];
        if(result.data.length > 0){
            for(let i=0;i<result.data.length;i++){
                users.push(format_follower_data(result.data[i]));
            }
        }
        return users;
    }else{
        return false;
    }
};